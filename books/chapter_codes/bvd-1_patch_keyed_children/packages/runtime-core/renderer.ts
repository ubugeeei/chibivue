import { ReactiveEffect } from "../reactivity";
import {
  Component,
  ComponentInternalInstance,
  createComponentInstance,
  setupComponent,
} from "./component";
import { updateProps } from "./componentProps";
import {
  VNode,
  Text,
  normalizeVNode,
  createVNode,
  isSameVNodeType,
} from "./vnode";

export type RootRenderFunction<HostElement = RendererElement> = (
  vnode: Component,
  container: HostElement
) => void;

export interface RendererOptions<
  HostNode = RendererNode,
  HostElement = RendererElement
> {
  patchProp(el: HostElement, key: string, value: any): void;

  createElement(type: string): HostElement;

  createText(text: string): HostNode;

  setText(node: HostNode, text: string): void;

  setElementText(node: HostNode, text: string): void;

  insert(child: HostNode, parent: HostNode, anchor?: HostNode | null): void;

  remove(child: HostNode): void;

  parentNode(node: HostNode): HostNode | null;
}

export interface RendererNode {
  [key: string]: any;
}

export interface RendererElement extends RendererNode {}

export function createRenderer(options: RendererOptions) {
  const {
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    setText: hostSetText,
    insert: hostInsert,
    remove: hostRemove,
    parentNode: hostParentNode,
  } = options;

  const patch = (n1: VNode | null, n2: VNode, container: RendererElement) => {
    const { type } = n2;
    if (type === Text) {
      processText(n1, n2, container);
    } else if (typeof type === "string") {
      processElement(n1, n2, container);
    } else if (typeof type === "object") {
      processComponent(n1, n2, container);
    } else {
      // do nothing
    }
  };

  const processElement = (
    n1: VNode | null,
    n2: VNode,
    container: RendererElement
  ) => {
    if (n1 === null) {
      mountElement(n2, container);
    } else {
      patchElement(n1, n2);
    }
  };

  const mountElement = (vnode: VNode, container: RendererElement) => {
    let el: RendererElement;
    const { type, props } = vnode;
    el = vnode.el = hostCreateElement(type as string);

    mountChildren(vnode.children as VNode[], el);

    if (props) {
      for (const key in props) {
        hostPatchProp(el, key, props[key]);
      }
    }

    hostInsert(el, container);
  };

  const mountChildren = (children: VNode[], container: RendererElement) => {
    for (let i = 0; i < children.length; i++) {
      const child = (children[i] = normalizeVNode(children[i]));
      patch(null, child, container);
    }
  };

  const patchElement = (n1: VNode, n2: VNode) => {
    const el = (n2.el = n1.el!);

    const props = n2.props;

    patchChildren(n1, n2, el);

    for (const key in props) {
      if (props[key] !== n1.props?.[key] ?? {}) {
        hostPatchProp(el, key, props[key]);
      }
    }
  };

  const patchChildren = (n1: VNode, n2: VNode, container: RendererElement) => {
    const c1 = n1.children as VNode[];
    const c2 = n2.children as VNode[];

    for (let i = 0; i < c2.length; i++) {
      const child = (c2[i] = normalizeVNode(c2[i]));
      patch(c1[i], child, container);
    }
  };

  const patchKeyedChildren = (
    c1: VNode[],
    c2: VNode[],
    container: RendererElement
  ) => {
    let i = 0;
    const l2 = c2.length;
    const e1 = c1.length - 1;
    const e2 = l2 - 1;

    const keyToNewIndexMap: Map<string | number | symbol, number> = new Map();
    for (i = 0; i <= e2; i++) {
      const nextChild = (c2[i] = normalizeVNode(c2[i]));
      if (nextChild.key != null) {
        keyToNewIndexMap.set(nextChild.key, i);
      }
    }

    let j;
    let patched = 0;
    const toBePatched = e2 + 1;
    let moved = false;
    let maxNewIndexSoFar = 0;

    const newIndexToOldIndexMap = new Array(toBePatched);
    for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;

    for (i = 0; i <= e1; i++) {
      const prevChild = c1[i];
      if (patched >= toBePatched) {
        // all new children have been patched so this can only be a removal
        unmount(prevChild);
        continue;
      }
      let newIndex;
      if (prevChild.key != null) {
        newIndex = keyToNewIndexMap.get(prevChild.key);
      } else {
        // key-less node, try to locate a key-less node of the same type
        for (j = 0; j <= e2; j++) {
          if (
            newIndexToOldIndexMap[j] === 0 &&
            isSameVNodeType(prevChild, c2[j] as VNode)
          ) {
            newIndex = j;
            break;
          }
        }
      }
      if (newIndex === undefined) {
        unmount(prevChild);
      } else {
        newIndexToOldIndexMap[newIndex] = i + 1;
        if (newIndex >= maxNewIndexSoFar) {
          maxNewIndexSoFar = newIndex;
        } else {
          moved = true;
        }
        patch(prevChild, c2[newIndex] as VNode, container);
        patched++;
      }
    }

    const increasingNewIndexSequence = moved
      ? getSequence(newIndexToOldIndexMap)
      : [];
    j = increasingNewIndexSequence.length - 1;
    for (i = toBePatched - 1; i >= 0; i--) {
      const nextIndex = i;
      const nextChild = c2[nextIndex] as VNode;
      const anchor =
        nextIndex + 1 < l2 ? (c2[nextIndex + 1] as VNode).el : parentAnchor;
      if (newIndexToOldIndexMap[i] === 0) {
        // mount new
        patch(null, nextChild, container, anchor);
      } else if (moved) {
        // move if:
        // There is no stable subsequence (e.g. a reverse)
        // OR current node is not among the stable sequence
        if (j < 0 || i !== increasingNewIndexSequence[j]) {
          move(nextChild, container, anchor);
        } else {
          j--;
        }
      }
    }
  };

  const move = (vnode: VNode, container: RendererElement) => {
    const { el, type } = vnode;
    if (typeof type === "object") {
      move(vnode.component!.subTree, container);
      return;
    }
    hostInsert(el!, container);
  };

  const unmount = (vnode: VNode) => {
    const { type, children } = vnode;
    if (typeof type === "object") {
    }
    // if (shapeFlag & ShapeFlags.COMPONENT) {
    //   unmountComponent(vnode.component!);
    // } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    //   unmountChildren(children as VNode[]);
    // }
    remove(vnode);
  };

  const remove = (vnode: VNode) => {
    const { el } = vnode;
    hostRemove(el!);
  };

  const unmountComponent = (instance: ComponentInternalInstance) => {
    const { subTree } = instance;
    unmount(subTree);
  };

  const unmountChildren = (children: VNode[]) => {
    for (let i = 0; i < children.length; i++) {
      unmount(children[i]);
    }
  };

  const processText = (
    n1: VNode | null,
    n2: VNode,
    container: RendererElement
  ) => {
    if (n1 == null) {
      hostInsert((n2.el = hostCreateText(n2.children as string)), container);
    } else {
      const el = (n2.el = n1.el!);
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children as string);
      }
    }
  };

  const processComponent = (
    n1: VNode | null,
    n2: VNode,
    container: RendererElement
  ) => {
    if (n1 == null) {
      mountComponent(n2, container);
    } else {
      updateComponent(n1, n2);
    }
  };

  const mountComponent = (initialVNode: VNode, container: RendererElement) => {
    // prettier-ignore
    const instance: ComponentInternalInstance = (initialVNode.component = createComponentInstance(initialVNode));
    setupComponent(instance);
    setupRenderEffect(instance, initialVNode, container);
  };

  const setupRenderEffect = (
    instance: ComponentInternalInstance,
    initialVNode: VNode,
    container: RendererElement
  ) => {
    const componentUpdateFn = () => {
      const { render, setupState } = instance;
      if (!instance.isMounted) {
        const subTree = (instance.subTree = normalizeVNode(render(setupState)));
        patch(null, subTree, container);
        initialVNode.el = subTree.el;
        instance.isMounted = true;
      } else {
        let { next, vnode } = instance;

        if (next) {
          next.el = vnode.el;
          next.component = instance;
          instance.vnode = next;
          instance.next = null;
          updateProps(instance, next.props);
        } else {
          next = vnode;
        }

        const prevTree = instance.subTree;
        const nextTree = normalizeVNode(render(setupState));
        instance.subTree = nextTree;

        patch(prevTree, nextTree, hostParentNode(prevTree.el!)!);
        next.el = nextTree.el;
      }
    };

    const effect = (instance.effect = new ReactiveEffect(componentUpdateFn));
    const update = (instance.update = () => effect.run());
    update();
  };

  const updateComponent = (n1: VNode, n2: VNode) => {
    const instance = (n2.component = n1.component)!;
    instance.next = n2;
    instance.update();
  };

  const render: RootRenderFunction = (rootComponent, container) => {
    const vnode = createVNode(rootComponent, {}, []);
    patch(null, vnode, container);
  };

  return { render };
}

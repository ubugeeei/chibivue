import { ReactiveEffect } from "../reactivity";
import { Component } from "./component";
import { VNode, VNodeProps } from "./vnode";

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

  setElementText(node: HostNode, text: string): void;

  insert(child: HostNode, parent: HostNode, anchor?: HostNode | null): void;
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
    insert: hostInsert,
  } = options;

  const patch = (
    n1: VNode | string | null,
    n2: VNode | string,
    container: RendererElement
  ) => {
    if (typeof n2 === "object") {
      // TODO:
      processElement(n1, n2, container);
    } else {
      // TODO:
      processText(n1, n2, container);
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

    mountChildren(vnode.children, el); // TODO:

    if (props) {
      for (const key in props) {
        hostPatchProp(el, key, props[key]);
      }
    }

    hostInsert(el, container);
  };

  const mountChildren = (
    children: (VNode | string)[],
    container: RendererElement
  ) => {
    for (let i = 0; i < children.length; i++) {
      patch(null, children[i], container);
    }
  };

  const patchElement = (n1: VNode, n2: VNode) => {
    const el = (n2.el = n1.el!);

    const props = n2.props;

    patchChildren(n1, n2, el);

    for (const key in props) {
      if (props[key] !== n1.props[key]) {
        hostPatchProp(el, key, props[key]);
      }
    }
  };

  const patchChildren = (n1: VNode, n2: VNode, container: RendererElement) => {
    const c1 = n1 && n1.children;
    const c2 = n2.children;

    for (let i = 0; i < c2.length; i++) {
      patch(c1[i], c2[i], container);
    }
  };

  const processText = (
    n1: string | null,
    n2: string,
    container: RendererElement
  ) => {
    container.textContent = n2;
  };

  const render: RootRenderFunction = (rootComponent, container) => {
    const componentRender = rootComponent.setup!();

    let n1: VNode | null = null;
    let n2: VNode = null!;

    const updateComponent = () => {
      const n2 = componentRender();
      patch(n1, n2, container);
      n1 = n2;
    };

    const effect = new ReactiveEffect(updateComponent);
    effect.run();
  };

  return { render };
}

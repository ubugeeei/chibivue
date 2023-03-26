import { type ComponentInternalInstance } from "./component";
import { setCurrentRenderingInstance } from "./componentRenderContext";
import { normalizeVNode, type VNode } from "./vnode";

export function renderComponentRoot(
  instance: ComponentInternalInstance
): VNode {
  const { proxy, render, data, ctx } = instance;
  const result = normalizeVNode(render!.call(proxy, proxy!, data, ctx));
  setCurrentRenderingInstance(instance);
  return result;
}

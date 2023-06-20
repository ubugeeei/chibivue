import { Ref } from "../reactivity";
import { VNode } from "./vnode";

export function setRef(rawRef: Ref, vnode: VNode) {
  rawRef.value = vnode.el;
}

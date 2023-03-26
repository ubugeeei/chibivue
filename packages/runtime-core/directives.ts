import { ComponentPublicInstance } from "./componentPublicInstance";
import { VNode } from "./vnode";

export interface DirectiveBinding<V = any> {
  instance: ComponentPublicInstance | null;
  value: V;
  oldValue: V | null;
  arg?: string;
  dir: ObjectDirective<any>;
}

export type DirectiveHook<T = any> = (
  el: T,
  binding: DirectiveBinding,
  vnode: VNode,
  prevVNode: VNode | null
) => void;

export interface ObjectDirective<T = any> {
  created?: DirectiveHook<T>;
  beforeMount?: DirectiveHook<T>;
  mounted?: DirectiveHook<T>;
  beforeUpdate?: DirectiveHook<T>;
  updated?: DirectiveHook<T>;
  beforeUnmount?: DirectiveHook<T>;
  unmounted?: DirectiveHook<T>;
  deep?: boolean;
}

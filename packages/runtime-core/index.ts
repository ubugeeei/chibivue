// Core API ------------------------------------------------------------------

export {
  // core
  reactive,
  ref,
  // utilities
  unref,
  proxyRefs,
  isRef,
  // effect
  ReactiveEffect,
  // effect scope
  EffectScope,
  effect,
} from "../reactivity";
export type { Ref, ReactiveFlags, ComputedRef } from "../reactivity";

export { computed } from "./apiComputed";
export { onMounted } from "./apiLifecycle";
export { provide, inject, type InjectionKey } from "./apiInject";

export { h } from "./h";

export { resolveComponent } from "./helpers/resolveAssets";
export { renderList } from "./helpers/renderList";

export {
  type VNode,
  type VNodeProps as VNodeData,
  createVNode,
  createTextVNode,
  createCommentVNode,
  createElementVNode,
  mergeProps,
  Fragment,
} from "./vnode";

export { type RendererOptions, createRenderer } from "./renderer";
export type {
  DirectiveBinding,
  DirectiveHook,
  ObjectDirective,
} from "./directives";

export { withDirectives } from "./directives";

export type { CreateAppFunction, App } from "./apiCreateApp";
export { defineComponent } from "./apiDefineComponent";

export {
  type ComponentInternalInstance,
  registerRuntimeCompiler,
  getCurrentInstance,
} from "./component";
export { type ComponentOptions, type RenderFunction } from "./componentOptions";
export { type ComponentPublicInstance } from "./componentPublicInstance";

export {
  capitalize,
  toHandlerKey,
  toDisplayString,
  normalizeClass,
  normalizeStyle,
  normalizeProps,
} from "../shared";

export { toHandlers } from "./helpers/toHandlers";

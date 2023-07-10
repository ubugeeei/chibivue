import {
  ComputedGetter,
  WritableComputedOptions,
  computed,
  reactive,
} from "../reactivity";
import { isArray, isFunction, isObject, isString } from "../shared";
import {
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
} from "./apiLifecycle";
import { WatchCallback, WatchOptions, watch } from "./apiWatch";
import { ComponentInternalInstance, Data, SetupContext } from "./component";
import { PropType } from "./componentProps";
import {
  ComponentPublicInstance,
  CreateComponentPublicInstance,
} from "./componentPublicInstance";
import { VNode } from "./vnode";

export type ComponentOptions<
  P = {},
  B = {},
  D = {},
  C extends ComputedOptions = ComputedOptions,
  M extends MethodOptions = MethodOptions
> = {
  props?: P;
  data?: (this: ComponentPublicInstance<ResolveProps<P>, B>) => D;
  computed?: C;
  methods?: M;
  watch?: ComponentWatchOptions;
  setup?: (props: ResolveProps<P>, ctx: SetupContext) => (() => VNode) | B;
  render?: (
    ctx: CreateComponentPublicInstance<ResolveProps<P>, B, D, C, M>
  ) => VNode;
  template?: string;

  beforeCreate?(): void;
  created?(): void;
  beforeMount?(): void;
  mounted?(): void;
  beforeUpdate?(): void;
  updated?(): void;
  beforeUnmount?(): void;
  unmounted?(): void;
} & ThisType<CreateComponentPublicInstance<ResolveProps<P>, B, D, C, M>>;

export type ResolveProps<T> = { [K in keyof T]: InferPropType<T[K]> };
type InferPropType<T> = T extends { type: PropType<infer U> } ? U : never;

export type ComputedOptions = Record<
  string,
  ComputedGetter<any> | WritableComputedOptions<any>
>;

export type ExtractComputedReturns<T extends any> = {
  [key in keyof T]: T[key] extends { get: (...args: any[]) => infer TReturn }
    ? TReturn
    : T[key] extends (...args: any[]) => infer TReturn
    ? TReturn
    : never;
};

export interface MethodOptions {
  [key: string]: Function;
}

export type ObjectWatchOptionItem = {
  handler: WatchCallback | string;
} & WatchOptions;

type WatchOptionItem = string | WatchCallback | ObjectWatchOptionItem;

type ComponentWatchOptionItem = WatchOptionItem | WatchOptionItem[];

type ComponentWatchOptions = Record<string, ComponentWatchOptionItem>;

export function applyOptions(instance: ComponentInternalInstance) {
  const { type: options } = instance;
  const publicThis = instance.proxy! as any;
  const ctx = instance.ctx;

  const {
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    beforeUnmount,
    unmounted,
  } = options;

  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        ctx[key] = methodHandler.bind(publicThis);
      }
    }
  }

  if (dataOptions) {
    const data = dataOptions.call(publicThis);
    instance.data = reactive(data);
  }

  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = (computedOptions as ComputedOptions)[key];

      const get = isFunction(opt)
        ? opt.bind(publicThis, publicThis)
        : isFunction(opt.get)
        ? opt.get.bind(publicThis, publicThis)
        : () => {};

      const set =
        !isFunction(opt) && isFunction(opt.set)
          ? opt.set.bind(publicThis)
          : () => {};

      const c = computed({ get, set });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => (c.value = v),
      });
    }
  }

  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }

  created?.();

  function registerLifecycleHook(
    register: Function,
    hook?: Function | Function[]
  ) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }

  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
}

export function createWatcher(
  raw: ComponentWatchOptionItem,
  ctx: Data,
  publicThis: ComponentPublicInstance,
  key: string
) {
  const getter = () => (publicThis as any)[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler as WatchCallback);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject(raw)) {
    if (isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler)
        ? raw.handler.bind(publicThis)
        : (ctx[raw.handler] as WatchCallback);
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      }
    }
  }
}

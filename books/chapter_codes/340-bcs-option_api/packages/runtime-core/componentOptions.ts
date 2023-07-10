import {
  ComputedGetter,
  WritableComputedOptions,
  computed,
  reactive,
} from "../reactivity";
import { isFunction } from "../shared";
import { ComponentInternalInstance, SetupContext } from "./component";
import { PropType } from "./componentProps";
import {
  ComponentPublicInstance,
  CreateComponentPublicInstance,
} from "./componentPublicInstance";
import { VNode } from "./vnode";

export type ComponentOptions<
  P = {},
  B = {},
  D = any,
  C extends ComputedOptions = ComputedOptions,
  M extends MethodOptions = MethodOptions
> = {
  props?: P;
  data?: (this: ComponentPublicInstance<ResolveProps<P>, B>) => D;
  computed?: C;
  methods?: M;
  setup?: (props: ResolveProps<P>, ctx: SetupContext) => (() => VNode) | B;
  render?: (ctx: ComponentPublicInstance<ResolveProps<P>, B, D>) => VNode;
  template?: string;
} & ThisType<CreateComponentPublicInstance<ResolveProps<P>, B, D, C, M>>;

export type ResolveProps<T> = { [K in keyof T]: InferPropType<T[K]> };
type InferPropType<T> = T extends { type: PropType<infer U> } ? U : never;

export type ComputedOptions = Record<
  string,
  ComputedGetter<any> | WritableComputedOptions<any>
>;

export interface MethodOptions {
  [key: string]: Function;
}

export type ExtractComputedReturns<T extends any> = {
  [key in keyof T]: T[key] extends { get: (...args: any[]) => infer TReturn }
    ? TReturn
    : T[key] extends (...args: any[]) => infer TReturn
    ? TReturn
    : never;
};

export function applyOptions(instance: ComponentInternalInstance) {
  const { type: options } = instance;
  const publicThis = instance.proxy! as any;
  const ctx = instance.ctx;

  const { data: dataOptions, computed: computedOptions, methods } = options;

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
}

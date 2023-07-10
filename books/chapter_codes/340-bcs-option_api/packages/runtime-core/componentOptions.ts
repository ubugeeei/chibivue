import {
  ComputedGetter,
  WritableComputedOptions,
  computed,
  reactive,
} from "../reactivity";
import { isFunction } from "../shared";
import { ComponentInternalInstance, SetupContext } from "./component";
import { PropType } from "./componentProps";
import { ComponentPublicInstance } from "./componentPublicInstance";
import { VNode } from "./vnode";

export type ComponentOptions<
  P = {},
  B = {},
  D = any,
  C extends ComputedOptions = ComputedOptions
> = {
  props?: P;
  data?: (this: ComponentPublicInstance<ResolveProps<P>, B>) => D;
  computed?: C;
  setup?: (props: ResolveProps<P>, ctx: SetupContext) => (() => VNode) | B;
  render?: (ctx: ComponentPublicInstance<ResolveProps<P>, B, D>) => VNode;
  template?: string;
} & ThisType<P & B & D & C>;

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

export function applyOptions(instance: ComponentInternalInstance) {
  const { type: options } = instance;
  const publicThis = instance.proxy! as any;
  const ctx = instance.ctx;

  const { data: dataOptions, computed: computedOptions } = options;

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

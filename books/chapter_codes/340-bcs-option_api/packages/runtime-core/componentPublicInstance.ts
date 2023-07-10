import { hasOwn } from "../shared";
import { ComponentInternalInstance, Data } from "./component";
import {
  ComputedOptions,
  ExtractComputedReturns,
  MethodOptions,
} from "./componentOptions";

export type ComponentPublicInstanceConstructor<
  T extends ComponentPublicInstance<
    Props,
    RawBindings,
    D,
    C
  > = ComponentPublicInstance<any>,
  Props = any,
  RawBindings = any,
  D = any,
  C extends ComputedOptions = any
> = {
  new (...args: any[]): T;
};

export type ComponentPublicInstance<
  P = {},
  B = {},
  D = {},
  C extends ComputedOptions = {},
  M extends MethodOptions = MethodOptions
> = {
  $: ComponentInternalInstance;
} & P &
  B &
  D &
  M &
  ExtractComputedReturns<C>;

export type CreateComponentPublicInstance<
  P = {},
  B = {},
  D = {},
  C extends ComputedOptions = ComputedOptions,
  M extends MethodOptions = MethodOptions
> = ComponentPublicInstance<P, B, D, C, M>;

export interface ComponentRenderContext {
  [key: string]: any;
  _: ComponentInternalInstance;
}

const hasSetupBinding = (state: Data, key: string) => hasOwn(state, key);

export const PublicInstanceProxyHandlers: ProxyHandler<any> = {
  get({ _: instance }: ComponentRenderContext, key: string) {
    const { setupState, props, data, ctx } = instance;

    let normalizedProps;
    if (hasSetupBinding(setupState, key)) {
      return setupState[key];
    } else if (
      (normalizedProps = instance.propsOptions) &&
      hasOwn(normalizedProps, key)
    ) {
      return props![key];
    } else if (hasOwn(data, key)) {
      return instance.data[key];
    } else if (hasOwn(ctx, key)) {
      return ctx[key];
    }
  },
  set(
    { _: instance }: ComponentRenderContext,
    key: string,
    value: any
  ): boolean {
    const { setupState, data } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (hasOwn(data, key)) {
      instance.data[key] = value;
      return true;
    }
    return true;
  },
};

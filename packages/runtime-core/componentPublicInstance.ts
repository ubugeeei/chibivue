import { hasOwn } from "../shared";
import { Data, type ComponentInternalInstance } from "./component";
import { type ComponentOptions } from "./componentOptions";

export type ComponentPublicInstanceConstructor<
  T extends ComponentPublicInstance<
    Props,
    RawBindings
  > = ComponentPublicInstance<any>,
  Props = any,
  RawBindings = any
> = {
  new (...args: any[]): T;
};

export type ComponentPublicInstance<P = {}, B = {}> = {
  $: ComponentInternalInstance;
  $data: Record<string, unknown>;
  $prop: Data; // TODO: type as generic
  $options: ComponentOptions;
  $el: Element;
  $mount: (el?: Element | string) => ComponentPublicInstance;
} & P &
  B;

export interface ComponentRenderContext {
  [key: string]: any;
  _: ComponentInternalInstance;
}

const hasSetupBinding = (state: Data, key: string) => hasOwn(state, key);

export const PublicInstanceProxyHandlers: ProxyHandler<any> = {
  get({ _: instance }: ComponentRenderContext, key: string) {
    const { ctx, setupState, data, props } = instance;

    let normalizedProps;
    if (hasSetupBinding(setupState, key)) {
      return setupState[key];
    } else if (hasOwn(data, key)) {
      return data[key];
    } else if (
      (normalizedProps = instance.propsOptions) &&
      hasOwn(normalizedProps, key)
    ) {
      return props![key];
    } else if (hasOwn(ctx, key)) {
      return ctx[key];
    }
  },
  set(
    { _: instance }: ComponentRenderContext,
    key: string,
    value: any
  ): boolean {
    const { ctx, data, setupState } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (hasOwn(data, key)) {
      data[key] = value;
    } else if (hasOwn(ctx, key)) {
      ctx[key] = value;
    }
    return true;
  },
};

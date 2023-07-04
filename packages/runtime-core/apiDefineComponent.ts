import { isFunction } from "../shared";
import { ComponentOptions } from "./componentOptions";
import { ComponentPublicInstanceConstructor } from "./componentPublicInstance";

type DefineComponent<
  PropsOrPropOptions = {},
  RawBindings = {}
> = ComponentPublicInstanceConstructor<PropsOrPropOptions, RawBindings>;

export function defineComponent<PropsOptions, RawBindings>(
  options: ComponentOptions<PropsOptions, RawBindings>
): DefineComponent<PropsOptions, RawBindings>;

export function defineComponent<PropsOptions, RawBindings>(
  setup: ComponentOptions<PropsOptions, RawBindings>["setup"]
): DefineComponent<PropsOptions, RawBindings>;

export function defineComponent(options: unknown) {
  return isFunction(options) ? { setup: options } : options;
}

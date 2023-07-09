import { ComponentOptions } from "./componentOptions";
import { ComponentPublicInstanceConstructor } from "./componentPublicInstance";

type DefineComponent<
  PropsOrPropOptions = {},
  RawBindings = {},
  D = {}
> = ComponentPublicInstanceConstructor<PropsOrPropOptions, RawBindings, D>;

export function defineComponent<PropsOptions = {}, RawBindings = {}, D = {}>(
  options: ComponentOptions<PropsOptions, RawBindings, D>
): DefineComponent<PropsOptions, RawBindings, D> {
  return options as any;
}

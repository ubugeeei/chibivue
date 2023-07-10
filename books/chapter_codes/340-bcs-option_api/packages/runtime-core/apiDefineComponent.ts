import {
  ComponentOptions,
  ComputedOptions,
  ResolveProps,
} from "./componentOptions";
import {
  ComponentPublicInstanceConstructor,
  CreateComponentPublicInstance,
} from "./componentPublicInstance";

type DefineComponent<
  PropOptions = {},
  RawBindings = {},
  D = {},
  C extends ComputedOptions = {},
  Props = ResolveProps<PropOptions>
> = ComponentPublicInstanceConstructor<
  CreateComponentPublicInstance<Props, RawBindings, D, C>,
  Props,
  RawBindings,
  D,
  C
>;

export function defineComponent<
  PropsOptions = {},
  RawBindings = {},
  D = {},
  C extends ComputedOptions = ComputedOptions
>(
  options: ComponentOptions<PropsOptions, RawBindings, D, C>
): DefineComponent<PropsOptions, RawBindings, D, C> {
  return options as any;
}

import {
  ComponentOptions,
  ComputedOptions,
  MethodOptions,
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
  M extends MethodOptions = MethodOptions,
  Props = ResolveProps<PropOptions>
> = ComponentPublicInstanceConstructor<
  CreateComponentPublicInstance<Props, RawBindings, D, C, M>,
  Props,
  RawBindings,
  D,
  C
>;

export function defineComponent<
  PropsOptions = {},
  RawBindings = {},
  D = {},
  C extends ComputedOptions = ComputedOptions,
  M extends MethodOptions = MethodOptions
>(
  options: ComponentOptions<PropsOptions, RawBindings, D, C, M>
): DefineComponent<PropsOptions, RawBindings, D, C, M> {
  return options as any;
}

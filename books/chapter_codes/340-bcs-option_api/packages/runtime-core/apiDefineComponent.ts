import {
  ComponentInjectOptions,
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
  M extends MethodOptions = {},
  I extends ComponentInjectOptions = {},
  Props = ResolveProps<PropOptions>
> = ComponentPublicInstanceConstructor<
  CreateComponentPublicInstance<Props, RawBindings, D, C, M, I>,
  Props,
  RawBindings,
  D,
  C
>;

export function defineComponent<
  PropsOptions = {},
  RawBindings = {},
  D = {},
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  I extends ComponentInjectOptions = {}
>(
  options: ComponentOptions<PropsOptions, RawBindings, D, C, M, I>
): DefineComponent<PropsOptions, RawBindings, D, C, M, I> {
  return options as any;
}

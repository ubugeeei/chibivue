import { reactive } from "../reactivity";
import { ComponentInternalInstance, SetupContext } from "./component";
import { PropType } from "./componentProps";
import { ComponentPublicInstance } from "./componentPublicInstance";
import { VNode } from "./vnode";

export type ComponentOptions<P = {}, B = {}, D = any> = {
  props?: P;
  data?: (this: ComponentPublicInstance<InferPropTypes<P>, B>) => D;
  setup?: (props: InferPropTypes<P>, ctx: SetupContext) => (() => VNode) | B;
  render?: (ctx: ComponentPublicInstance<InferPropTypes<P>, B, D>) => VNode;
  template?: string;
};

type InferPropTypes<T> = { [K in keyof T]: InferPropType<T[K]> };
type InferPropType<T> = T extends { type: PropType<infer U> } ? U : never;

export function applyOptions(instance: ComponentInternalInstance) {
  const { type: options } = instance;
  const publicThis = instance.proxy! as any;
  const ctx = instance.ctx;

  const { data: dataOptions } = options;

  if (dataOptions) {
    const data = dataOptions.call(publicThis);
    instance.data = reactive(data)
  }
}

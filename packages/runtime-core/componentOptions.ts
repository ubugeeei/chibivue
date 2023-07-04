import { computed, reactive } from "../reactivity";
import {
  InternalRenderFunction,
  type ComponentInternalInstance,
  ConcreteComponent,
} from "./component";
import { ObjectEmitsOptions } from "./componentEmits";
import { PropType } from "./componentProps";
import { VNodeChild, type VNode } from "./vnode";

export type RenderFunction = () => VNodeChild;

export type ComponentOptions<P = {}, B = {}> = {
  name?: string;
  data?: () => Record<string, unknown>;
  props?: P;
  emits?: ObjectEmitsOptions;
  methods?: { [key: string]: Function };
  computed?: { [key: string]: Function };
  setup?: (
    props: InferPropTypes<P>,
    ctx: { emit: (event: string, ...args: any[]) => void }
  ) => (() => VNode) | B;
  render?: Function;
  template?: string;
  components?: Record<string, ConcreteComponent>;
};

type InferPropTypes<T> = { [K in keyof T]: InferPropType<T[K]> };
type InferPropType<T> = T extends { type: PropType<infer U> } ? U : never;

export function applyOptions(instance: ComponentInternalInstance) {
  const options = instance.type;
  const publicThis = instance.proxy! as any;
  const ctx = instance.ctx;

  const {
    data: dataOptions,
    methods,
    computed: computedOptions,
    render,
  } = options;

  if (dataOptions) {
    const data = dataOptions.call(publicThis);
    instance.data = reactive(data);
  }

  if (computedOptions) {
    for (const key in computedOptions) {
      const getter = computedOptions[key].bind(publicThis);
      const c = computed(getter);
      Object.defineProperty(ctx, key, {
        get: () => c.value,
      });
    }
  }

  if (methods) {
    Object.keys(methods).forEach((key) => {
      ctx[key] = methods[key].bind(publicThis);
    });
  }

  if (render) {
    instance.render = render as InternalRenderFunction;
  }
}

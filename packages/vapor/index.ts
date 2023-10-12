import { VNode, createRenderer } from "chibivue/runtime-core";
import { RootRenderFunction } from "chibivue/runtime-core/renderer";
import { nodeOps } from "chibivue/runtime-dom/nodeOps";
import { patchProp } from "chibivue/runtime-dom/patchProp";

export type VaporComponent = () => VaporNode;
export type VaporNode = Element & { __is_vapor: true };

export const template = (tmp: string): VaporNode => {
  const container = document.createElement("div");
  container.innerHTML = tmp;
  const el = container.firstElementChild as VaporNode;
  el.__is_vapor = true;
  return el;
};

export const setText = (target: Element, format: any, ...values: any[]) => {
  if (!target) return;

  if (!values.length) {
    target.textContent = format;
    return;
  }

  if (!format && values.length) {
    target.textContent = values.join("");
    return;
  }

  let text = format;
  for (let i = 0; i < values.length; i++) {
    text = text.replace("{}", values[i]);
  }

  target.textContent = text;
};

export const on = (element: Element, event: string, callback: () => void) => {
  element.addEventListener(event, callback);
};

export const createComponent = (component: VNode, parent: VaporNode) => {
  const renderer = createRenderer({ ...nodeOps, patchProp });
  const render = ((...args) => {
    renderer.render(...args);
  }) as RootRenderFunction<Element>;

  render(component, parent);
};

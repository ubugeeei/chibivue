import { RendererOptions } from "../runtime-core";

type DOMRendererOptions = RendererOptions<Node, Element>;

const onRE = /^on[^a-z]/;
export const isOn = (key: string) => onRE.test(key);

export const patchProp: DOMRendererOptions["patchProp"] = (el, key, value) => {
  if (key === "style") {
    // patchStyle(el, value); // これから実装します
  } else if (isOn(key)) {
    // patchEvent(el, key, value); // これから実装します
  } else {
    // patchAttr(el, key, value); // これから実装します
  }
};

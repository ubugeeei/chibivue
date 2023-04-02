import { isOn } from "../shared";
import { patchEvent } from "./modules/events";
import { type RendererOptions } from "../runtime-core";
import { patchAttr } from "./modules/attrs";
import { patchStyle } from "./modules/style";

type DOMRendererOptions = RendererOptions<Node, Element>;

export const patchProp: DOMRendererOptions["patchProp"] = (
  el,
  key,
  prevValue,
  nextValue
) => {
  if (key === "class") {
    // TODO: patch class
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    patchEvent(el, key, nextValue);
  } else {
    patchAttr(el, key, nextValue);
  }
};

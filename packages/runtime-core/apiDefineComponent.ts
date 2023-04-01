import { isFunction } from "../shared";

export function defineComponent(options: unknown) {
  return isFunction(options) ? { setup: options } : options;
}

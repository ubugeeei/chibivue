import { camelize, toHandlerKey } from "../shared";
import { ComponentInternalInstance } from "./component";

export type ObjectEmitsOptions = Record<
  string,
  ((...args: any[]) => any) | null
>;

export type EmitsOptions = ObjectEmitsOptions | string[];

export function emit(
  instance: ComponentInternalInstance,
  event: string,
  ...rawArgs: any[]
) {
  const props = instance.vnode.props || {};
  let args = rawArgs;

  let handler =
    props[toHandlerKey(event)] || props[toHandlerKey(camelize(event))];

  if (handler) handler(...args);
}

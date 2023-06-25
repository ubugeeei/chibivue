import { isObject, toRawType } from "../shared";
import { mutableHandlers } from "./baseHandler";

export const enum ReactiveFlags {
  RAW = "__v_raw",
}

export interface Target {
  [ReactiveFlags.RAW]?: any;
}

export const reactiveMap = new WeakMap<Target, any>();

const enum TargetType {
  INVALID = 0,
  COMMON = 1,
}

function targetTypeMap(rawType: string) {
  switch (rawType) {
    case "Object":
    case "Array":
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return TargetType.COMMON;
    default:
      return TargetType.INVALID;
  }
}

function getTargetType(value: Target) {
  return !Object.isExtensible(value)
    ? TargetType.INVALID
    : targetTypeMap(toRawType(value));
}

export function reactive<T extends object>(target: T) {
  const existingProxy = reactiveMap.get(target);

  if (existingProxy) {
    return existingProxy;
  }

  const targetType = getTargetType(target);
  if (targetType === TargetType.INVALID) {
    return target;
  }

  const proxy = new Proxy(target, mutableHandlers);
  reactiveMap.set(target, proxy);
  return proxy;
}

export const toReactive = <T extends unknown>(value: T): T =>
  isObject(value) ? reactive(value) : value;

export function toRaw<T>(observed: T): T {
  const raw = observed && (observed as Target)[ReactiveFlags.RAW];
  return raw ? toRaw(raw) : observed;
}

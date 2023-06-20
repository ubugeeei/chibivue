import { isObject, toRawType } from "../shared";
import { mutableHandlers } from "./baseHandler";

export const enum ReactiveFlags {}

export interface Target {}

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

/**
 *
 * ----------- tests
 *
 */
if (import.meta.vitest) {
  const { it, expect, vi } = import.meta.vitest;

  it("test reactive: should track and trigger", async () => {
    const { ReactiveEffect } = await import("./effect");
    const mockEffect = vi.fn(() => {});
    const effect = new ReactiveEffect(mockEffect);

    effect.run(); // call count 1

    expect(mockEffect).toHaveBeenCalledTimes(1);

    const state = reactive({ foo: "abc" });

    const _ = state.foo; // should be tracked
    state.foo = "def"; // should be triggered (call count 2)

    expect(mockEffect).toHaveBeenCalledTimes(2);
  });
}

import { ComputedRef, ReactiveEffect, Ref, isRef } from "../reactivity";
import { hasChanged, isArray, isFunction } from "../shared";

export type WatchEffect = (onCleanup: OnCleanup) => void;

export type WatchSource<T = any> = (() => T) | Ref<T> | ComputedRef<T>;

export type WatchCallback<V = any, OV = any> = (value: V, oldValue: OV) => void;

type OnCleanup = (cleanupFn: () => void) => void;

export function watch<T>(
  source: WatchSource<T> | WatchSource[],
  cb: WatchCallback
) {
  let getter: () => any;
  let isMultiSource = false;
  if (isFunction(source)) {
    getter = () => source();
  } else if (isRef<T>(source)) {
    getter = () => source.value;
  } else if (isArray(source)) {
    isMultiSource = true;
    getter = () => source.map((s) => (isRef(s) ? s.value : s));
  } else {
    getter = () => source;
  }

  let oldValue = getter();
  const job = () => {
    const newValue = getter();
    if (
      isMultiSource
        ? (newValue as any[]).some((v, i) => hasChanged(v, oldValue[i]))
        : hasChanged(newValue, oldValue)
    ) {
      cb(newValue, oldValue);
      oldValue = newValue;
    }
  };

  const effect = new ReactiveEffect(getter, job);

  effect.run();
}

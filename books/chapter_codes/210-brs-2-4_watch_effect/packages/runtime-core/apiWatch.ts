import { ComputedRef, ReactiveEffect, Ref, isRef } from "../reactivity";
import { hasChanged, isArray, isFunction } from "../shared";

export type WatchEffect = (onCleanup: OnCleanup) => void;

export type WatchSource<T = any> = (() => T) | Ref<T> | ComputedRef<T>;

export type WatchCallback<V = any, OV = any> = (value: V, oldValue: OV) => void;

type OnCleanup = (cleanupFn: () => void) => void;

export interface WatchOptions<Immediate = boolean> {
  immediate?: Immediate;
}

export function watch<T>(
  source: WatchSource<T> | WatchSource[],
  cb: WatchCallback,
  option?: WatchOptions
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

  let oldValue: T | T[];
  const job = () => {
    const newValue = effect.run();
    if (
      isMultiSource
        ? (newValue as any[]).some((v, i) =>
            hasChanged(v, (oldValue as T[])?.[i])
          )
        : hasChanged(newValue, oldValue)
    ) {
      cb(newValue, oldValue);
      oldValue = newValue;
    }
  };

  const effect = new ReactiveEffect(getter, job);

  // initial run
  if (option && option.immediate) {
    job();
  } else {
    oldValue = effect.run();
  }
}

import { ComputedRef, ReactiveEffect, Ref, isRef } from "../reactivity";
import { hasChanged, isArray, isFunction } from "../shared";

export type WatchEffect = () => void;

export type WatchSource<T = any> = (() => T) | Ref<T> | ComputedRef<T>;

export type WatchCallback<V = any, OV = any> = (value: V, oldValue: OV) => void;

const INITIAL_WATCHER_VALUE = {};

export interface WatchOptions<Immediate = boolean> {
  immediate?: Immediate;
}

export function watch<T>(
  source: WatchSource<T> | WatchSource[],
  cb: WatchCallback,
  option?: WatchOptions
) {
  doWatch(source, cb, option);
}

export function watchEffect(source: WatchEffect) {
  doWatch(source, null);
}

function doWatch(
  source: WatchSource | WatchSource[] | WatchEffect,
  cb: WatchCallback | null,
  option?: WatchOptions
) {
  let getter: () => any;
  let isMultiSource = false;
  if (isFunction(source)) {
    getter = () => source();
  } else if (isRef(source)) {
    getter = () => source.value;
  } else if (isArray(source)) {
    isMultiSource = true;
    getter = () => source.map((s) => (isRef(s) ? s.value : s));
  } else {
    getter = () => source;
  }

  let oldValue: any = isMultiSource
    ? new Array((source as []).length).fill(INITIAL_WATCHER_VALUE)
    : INITIAL_WATCHER_VALUE;

  const job = () => {
    if (cb) {
      const newValue = effect.run();
      if (
        isMultiSource
          ? (newValue as any[]).some((v, i) =>
              hasChanged(v, (oldValue as any[])?.[i])
            )
          : hasChanged(newValue, oldValue)
      ) {
        cb(newValue, oldValue);
        oldValue = newValue;
      }
    } else {
      // watchEffect
      effect.run();
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

import { ReactiveEffect, Ref, isRef } from "../reactivity";
import { hasChanged, isFunction } from "../shared";

export type WatchEffect = (onCleanup: OnCleanup) => void;

export type WatchSource<T = any> = (() => T) | Ref<T>;

type OnCleanup = (cleanupFn: () => void) => void;

export function watch<T>(
  source: WatchSource<T>,
  cb: (newValue: T, oldValue: T) => void
) {
  let getter: () => T;
  if (isFunction(source)) {
    getter = () => source();
  } else if (isRef<T>(source)) {
    getter = () => source.value;
  } else {
    getter = () => source;
  }

  let oldValue = getter();
  const job = () => {
    const newValue = getter();
    if (hasChanged(newValue, oldValue)) {
      cb(newValue, oldValue);
      oldValue = newValue;
    }
  };

  const effect = new ReactiveEffect(getter, job);
  effect.run();
}

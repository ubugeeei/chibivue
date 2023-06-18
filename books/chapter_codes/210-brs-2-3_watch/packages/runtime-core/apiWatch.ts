import { ReactiveEffect } from "../reactivity";

export type WatchEffect = (onCleanup: OnCleanup) => void;

export type WatchSource<T = any> = () => T;

type OnCleanup = (cleanupFn: () => void) => void;

export function watch<T>(
  source: WatchSource<T>,
  cb: (newValue: T, oldValue: T) => void
) {
  let oldValue: T;
  const getter = () => (oldValue = source());
  const job = () => cb(getter(), oldValue);

  const effect = new ReactiveEffect(getter, job);
  effect.run();
}

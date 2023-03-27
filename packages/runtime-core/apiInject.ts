import { currentInstance } from "./component";

export interface InjectionKey<T> extends Symbol {}

export function provide<T>(key: InjectionKey<T> | string | number, value: T) {
  if (!currentInstance) {
  } else {
    let provides = currentInstance.provides;
    provides[key as string] = value;
  }
}

export function inject<T>(key: InjectionKey<T> | string): T | undefined {
  const instance = currentInstance;
  if (instance) {
    const provides = instance.appContext?.provides;
    if (provides && (key as string | symbol) in provides) {
      return provides[key as string];
    }
  }
}

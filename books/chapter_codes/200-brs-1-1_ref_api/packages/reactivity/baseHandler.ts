import { track, trigger } from "./effect";

export const mutableHandlers: ProxyHandler<object> = {
  get(target: object, key: string | symbol, receiver: object) {
    track(target, key);
    return Reflect.get(target, key, receiver);
  },

  set(target: object, key: string | symbol, value: unknown, receiver: object) {
    Reflect.set(target, key, value, receiver);
    trigger(target, key);
    return true;
  },
};

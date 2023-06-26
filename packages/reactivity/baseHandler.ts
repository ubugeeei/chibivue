import { isObject } from "../shared";
import { track, trigger } from "./effect";
import { ReactiveFlags, Target, reactive, readonly } from "./reactive";

const get = createGetter();
const readonlyGet = createGetter(true);

function createGetter(isReadonly = false, shallow = false) {
  return function get(target: Target, key: string | symbol, receiver: object) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly;
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly;
    } else if (key === ReactiveFlags.IS_SHALLOW) {
      return shallow;
    } else {
      track(target, key);
      const res = Reflect.get(target, key, receiver);
      if (isObject(res)) {
        return isReadonly ? readonly(res) : reactive(res);
      }
      return res;
    }
  };
}

export const mutableHandlers: ProxyHandler<object> = {
  get,
  set(target: object, key: string | symbol, value: unknown, receiver: object) {
    Reflect.set(target, key, value, receiver);
    trigger(target, key);
    return true;
  },
};

export const readonlyHandlers: ProxyHandler<object> = {
  get: readonlyGet,
  set(_target, _key) {
    return true;
  },
  deleteProperty(_target, _key) {
    return true;
  },
};

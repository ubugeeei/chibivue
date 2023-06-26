import { isArray } from "../shared";
import { IfAny } from "../shared/typeUtils";
import { Dep, createDep } from "./dep";
import { getDepFromReactive, trackEffects, triggerEffects } from "./effect";
import { toReactive } from "./reactive";

declare const RefSymbol: unique symbol;
export interface Ref<T = any> {
  value: T;
  [RefSymbol]: true;
}

type RefBase<T> = {
  dep?: Dep;
  value: T;
};

export function trackRefValue(ref: RefBase<any>) {
  trackEffects(ref.dep || (ref.dep = createDep()));
}

export function triggerRefValue(ref: RefBase<any>) {
  if (ref.dep) triggerEffects(ref.dep);
}

export function isRef<T>(r: Ref<T> | unknown): r is Ref<T>;
export function isRef(r: any): r is Ref {
  return !!(r && r.__v_isRef === true);
}

export function ref<T = any>(): Ref<T | undefined>;
export function ref<T = any>(value: T): Ref<T>;
export function ref(value?: unknown) {
  return createRef(value, false);
}

declare const ShallowRefMarker: unique symbol;
export type ShallowRef<T = any> = Ref<T> & { [ShallowRefMarker]?: true };

export function shallowRef<T extends object>(
  value: T
): T extends Ref ? T : ShallowRef<T>;
export function shallowRef<T>(value: T): ShallowRef<T>;
export function shallowRef<T = any>(): ShallowRef<T | undefined>;
export function shallowRef(value?: unknown) {
  return createRef(value, true);
}

function createRef(rawValue: unknown, shallow: boolean) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}

class RefImpl<T> {
  private _value: T;
  public dep?: Dep = undefined;
  public readonly __v_isRef = true;

  constructor(value: T, public readonly __v_isShallow: boolean) {
    this._value = __v_isShallow ? value : toReactive(value);
  }

  get value() {
    trackRefValue(this);
    return this._value;
  }

  set value(newVal) {
    this._value = toReactive(newVal);
    triggerRefValue(this);
  }
}

export function triggerRef(ref: Ref) {
  triggerRefValue(ref);
}

/*
 *
 * custom ref
 *
 */
export type CustomRefFactory<T> = (
  track: () => void,
  trigger: () => void
) => {
  get: () => T;
  set: (value: T) => void;
};

class CustomRefImpl<T> {
  public dep?: Dep = undefined;
  private readonly _get: ReturnType<CustomRefFactory<T>>["get"];
  private readonly _set: ReturnType<CustomRefFactory<T>>["set"];
  public readonly __v_isRef = true;

  constructor(factory: CustomRefFactory<T>) {
    const { get, set } = factory(
      () => trackRefValue(this),
      () => triggerRefValue(this)
    );
    this._get = get;
    this._set = set;
  }

  get value() {
    return this._get();
  }

  set value(newVal) {
    this._set(newVal);
  }
}

export function customRef<T>(factory: CustomRefFactory<T>): Ref<T> {
  return new CustomRefImpl(factory) as any;
}

export type ToRef<T> = IfAny<T, Ref<T>, [T] extends [Ref] ? T : Ref<T>>;
export function toRef<T extends object, K extends keyof T>(
  object: T,
  key: K
): ToRef<T[K]>;
export function toRef<T extends object, K extends keyof T>(
  object: T,
  key: K,
  defaultValue: T[K]
): ToRef<Exclude<T[K], undefined>>;
export function toRef(
  source: Record<string, any>,
  key?: string,
  defaultValue?: unknown
): Ref {
  return propertyToRef(source, key!, defaultValue);
}

export type ToRefs<T = any> = {
  [K in keyof T]: ToRef<T[K]>;
};
export function toRefs<T extends object>(object: T): ToRefs<T> {
  const ret: any = isArray(object) ? new Array(object.length) : {};
  for (const key in object) {
    ret[key] = propertyToRef(object, key);
  }
  return ret;
}

function propertyToRef(
  source: Record<string, any>,
  key: string,
  defaultValue?: unknown
) {
  return new ObjectRefImpl(source, key, defaultValue) as any;
}

class ObjectRefImpl<T extends object, K extends keyof T> {
  public readonly __v_isRef = true;

  constructor(
    private readonly _object: T,
    private readonly _key: K,
    private readonly _defaultValue?: T[K]
  ) {}

  get value() {
    const val = this._object[this._key];
    return val === undefined ? (this._defaultValue as T[K]) : val;
  }

  set value(newVal) {
    this._object[this._key] = newVal;
  }

  get dep(): Dep | undefined {
    return getDepFromReactive(this._object, this._key);
  }
}

export function unref<T>(ref: T | Ref<T>): T {
  return isRef(ref) ? (ref.value as any) : ref;
}

const shallowUnwrapHandlers: ProxyHandler<any> = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  },
};

export function proxyRefs<T extends object>(
  objectWithRefs: T
): ShallowUnwrapRef<T> {
  return new Proxy(objectWithRefs, shallowUnwrapHandlers);
}

export type ShallowUnwrapRef<T> = {
  [K in keyof T]: T[K] extends Ref<infer V>
    ? V // if `V` is `unknown` that means it does not extend `Ref` and is undefined
    : T[K] extends Ref<infer V> | undefined
    ? unknown extends V
      ? undefined
      : V | undefined
    : T[K];
};

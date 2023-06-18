import { isFunction } from "../shared";
import { Dep } from "./dep";
import { ReactiveEffect } from "./effect";
import { Ref, trackRefValue, triggerRefValue } from "./ref";

export interface ComputedRef<T = any> extends WritableComputedRef<T> {
  readonly value: T;
}

interface WritableComputedRef<T> extends Ref<T> {
  readonly effect: ReactiveEffect<T>;
}

export type ComputedGetter<T> = (...args: any[]) => T;
export type ComputedSetter<T> = (v: T) => void;
export interface WritableComputedOptions<T> {
  get: ComputedGetter<T>;
  set: ComputedSetter<T>;
}

export class ComputedRefImpl<T> {
  public dep?: Dep = undefined;
  private _value!: T;
  public readonly effect: ReactiveEffect<T>;
  public readonly __v_isRef = true;

  public _dirty = true;

  constructor(
    getter: ComputedGetter<T>,
    private readonly _setter: ComputedSetter<T>
  ) {
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
  }

  get value() {
    trackRefValue(this);
    if (this._dirty) {
      this._dirty = false;
      this._value = this.effect.run()!;
    }
    return this._value;
  }

  set value(newValue: T) {
    this._setter(newValue);
  }
}

export function computed<T>(getterOrOptions: ComputedGetter<T>): ComputedRef<T>;
export function computed<T>(
  getterOrOptions: WritableComputedOptions<T>
): Ref<T>;
export function computed<T>(
  getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T>
) {
  let getter: ComputedGetter<T>;
  let setter: ComputedSetter<T>;

  const onlyGetter = isFunction(getterOrOptions);

  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {};
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  return new ComputedRefImpl(getter, setter) as any;
}

/**
 *
 * ----------- tests
 *
 */
if (import.meta.vitest) {
  const { it, expect, vi } = import.meta.vitest;

  it("test computed: should track and trigger", async () => {
    const { ReactiveEffect, ref } = await import(".");
    const mockEffect = vi.fn(() => {});
    const effect = new ReactiveEffect(mockEffect);
    effect.run();

    const count = ref(1);

    const computedGetter = vi.fn(() => count.value * 2);
    const countDouble = computed(computedGetter);

    expect(countDouble.value).toBe(2); // call count 1
    expect(computedGetter).toHaveBeenCalledTimes(1);

    count.value = 2; // call count 2
    expect(computedGetter).toHaveBeenCalledTimes(2);
    expect(countDouble.value).toBe(4); // call count 3

    count.value = 4; // call count 4
    expect(computedGetter).toHaveBeenCalledTimes(4);
    expect(countDouble.value).toBe(8); // call count 5
    expect(computedGetter).toHaveBeenCalledTimes(5);
  });
}

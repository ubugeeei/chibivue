[Prev](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/200_brs_ref_api.md) | [Next](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/215_brs___wip___reactive_flags.md)

---
title: "computed / watch api"
---

# computed のおさらい (と実装)

前のチャプターで ref 系の api を実装しました。続いては computed です。  
https://vuejs.org/api/reactivity-core.html#computed

computed には読み取り専用と書き込み可能の 2 つのシグネチャがあります。

```ts
// read-only
function computed<T>(
  getter: () => T,
  // see "Computed Debugging" link below
  debuggerOptions?: DebuggerOptions
): Readonly<Ref<Readonly<T>>>;

// writable
function computed<T>(
  options: {
    get: () => T;
    set: (value: T) => void;
  },
  debuggerOptions?: DebuggerOptions
): Ref<T>;
```

本家の実装は短いながらに少しだけ複雑なので、まずはシンプルな構成を考えてみましょう。

最も簡単な方法として思いつくのは、value を get する際に毎度コールバックを発火するという手法でしょう。

```ts
export class ComputedRefImpl<T> {
  constructor(private getter: ComputedGetter<T>) {}

  get value() {
    return this.getter();
  }

  set value() {}
}
```

しかしこれでは computed というか、ただ関数を呼んでいるだけです (そりゃそう。特に何も嬉しくないですね、残念。)

実際には依存関係を追跡し、その値が変更されたときに再計算したいわけです。

これをどのように実現しているかというと、\_dirty フラグの書き換えをスケジューラのジョブとして実行するような仕組みになっています。
\_dirty フラグというのはいわば「再計算する必要があるか?」という状態を持つフラグで、依存によって trigger された場合にこのフラグを書き換えます。

イメージ的には以下のようなものです。

```ts
export class ComputedRefImpl<T> {
  public dep?: Dep = undefined;
  private _value!: T;
  public readonly effect: ReactiveEffect<T>;
  public _dirty = true;

  constructor(getter: ComputedGetter<T>) {
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
      }
    });
  }

  get value() {
    trackRefValue(this);
    if (this._dirty) {
      this._dirty = false;
      this._value = this.effect.run();
    }
    return this._value;
  }
}
```

computed は実は遅延評価のような性質を持っており、再計算が必要な場合は値が読み取られる際に初めて再計算されます。
そしてこのフラグを true に書き換え関数は不特定多数の依存に trigger されるため、ReactiveEffect の scheduler として登録します。

基本的な流れはこのような感じです。実装するにあったって、加えて注意する点がいくつかあるので以下にまとめておきます。

- \_dirty フラグを true に書き換えた段階で自信が持つ依存関係は trigger してしまう
  ```ts
  if (!this._dirty) {
    this._dirty = true;
    triggerRefValue(this);
  }
  ```
- computed も分類的には`ref`なので、`__v_isRef`を true にマークしておく
- setter を実装したかったら最後に実装する。まずは算出できるようになることを目指す

さて、これで準備は整ったので実際に実装してみましょう！  
以下のようなコードが期待通りに動けば OK です！ (それぞれ、依存している computed だけが発火することを確認してください！)

```ts
import { computed, createApp, h, reactive, ref } from "chibivue";

const app = createApp({
  setup() {
    const count = reactive({ value: 0 });
    const count2 = reactive({ value: 0 });
    const double = computed(() => {
      console.log("computed");
      return count.value * 2;
    });
    const doubleDouble = computed(() => {
      console.log("computed (doubleDouble)");
      return double.value * 2;
    });

    const countRef = ref(0);
    const doubleCountRef = computed(() => {
      console.log("computed (doubleCountRef)");
      return countRef.value * 2;
    });

    return () =>
      h("div", {}, [
        h("p", {}, [`count: ${count.value}`]),
        h("p", {}, [`count2: ${count2.value}`]),
        h("p", {}, [`double: ${double.value}`]),
        h("p", {}, [`doubleDouble: ${doubleDouble.value}`]),
        h("p", {}, [`doubleCountRef: ${doubleCountRef.value}`]),
        h("button", { onClick: () => count.value++ }, ["update count"]),
        h("button", { onClick: () => count2.value++ }, ["update count2"]),
        h("button", { onClick: () => countRef.value++ }, ["update countRef"]),
      ]);
  },
});

app.mount("#app");
```

- computed
- watch
  - options
- watchEffect


[Prev](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/200_brs_ref_api.md) | [Next](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/215_brs___wip___reactive_flags.md)
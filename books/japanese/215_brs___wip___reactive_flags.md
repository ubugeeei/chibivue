[Prev](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/212_brs_reactive_proxy_target_type.md) | [Next](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/220_brs_other_apis.md)

---
title: "ReactiveFlags による reactive オブジェクトの制御"
---

# ReactiveFlags とは

結論から言うと、ReactiveFlags とは以下のようなものです。

https://github.com/vuejs/core/blob/7cdd13bd1eaf72c0ea07ae667b868e8ce72c50a2/packages/reactivity/src/reactive.ts#L16-L22

このようなフラグを用いて reactive オブジェクトの挙動を制御します。挙動に関しては概ね命名から想像できるかと思います。

様々な API からこのフラグに書き込みを行い、Proxy はそのフラグを見て挙動を制御します。API の例としては以下のようなものが挙げられます。

- reactive
- readonly
- markRaw
- shallowReactive
- shallowReadonly

など

また、Vue.js には Proxy を判定する API がいくつか用意されていますが、これらもこのフラグを参照しています。

- isProxy
- isReactive
- isReadonly

など

それでは、これらのフラグと制御を実装してみましょう。具体的には、Target という interface がこれらのフラグをもつことになります。

```ts
export interface Target {
  [ReactiveFlags.SKIP]?: boolean;
  [ReactiveFlags.IS_REACTIVE]?: boolean;
  [ReactiveFlags.IS_READONLY]?: boolean;
  [ReactiveFlags.IS_SHALLOW]?: boolean;
  [ReactiveFlags.RAW]?: any;
}
```

この、target というのは Proxy を実装する対象となるオブジェクトのことです。
例えば、

```ts
const state = reactive({ count: 0 });
```

のような reactive オブジェクトを実装する時、`{ count: 0 }` という元のオブジェクトが target になります。

---

今現時点での実装だと、reactive は以下のような実装になっていて、単に Proxy を生成しているだけです。

```ts
export function reactive<T extends object>(target: T): T {
  const proxy = new Proxy(target, mutableHandlers);
  return proxy as T;
}
```

この生成プロセスをもう一段階抽象化してみて、

```ts
// reactive オブジェクトの Proxy を生成する実装の抽象化
function createReactiveObject(
  target: Target,
  isReadonly: boolean,
  baseHandlers: ProxyHandler<any>
) {
  return new Proxy(target, baseHandlers);
}
```

いろんなハンドラを実装して、いろんな API を実装してみましょう！

```ts
export function reactive(target: object) {
  return createReactiveObject(target, false, mutableHandlers);
}
```

```ts
export function shallowReactive<T extends object>(
  target: T
): ShallowReactive<T> {
  return createReactiveObject(target, false, shallowReactiveHandlers);
}
```

```ts
export function readonly<T extends object>(
  target: T
): DeepReadonly<UnwrapNestedRefs<T>> {
  return createReactiveObject(target, true, readonlyHandlers);
}
```

```ts
export function shallowReadonly<T extends object>(target: T): Readonly<T> {
  return createReactiveObject(target, true, shallowReadonlyHandlers);
}
```


[Prev](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/212_brs_reactive_proxy_target_type.md) | [Next](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/220_brs_other_apis.md)
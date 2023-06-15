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

どうやって依存関係を追跡するかについてですが、まずは reactive オブジェクトと component の update 関数でリアクティブを構成した時のことを思い出してください。  
あの時は、reactive オブジェクト(依存)に変更(set)があった際に update 関数を trigger するような実装になっていたかと思います。  
基本的に考え方はこれと同じで、reactive オブジェクト(依存)に変更(set)があった際に getter 関数を再実行するような仕組みにしてあげればいいわけです。


```ts

```

- computed
- watch
  - options
- watchEffect


[Prev](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/200_brs_ref_api.md) | [Next](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/215_brs___wip___reactive_flags.md)
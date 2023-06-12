[Prev](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/205_brs_reactive_flags.md) | [Next](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/220_brs_other_apis.md)

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

<!-- まずは読み取り専用の方から考えてみましょう。 -->

computed は

- computed
- watch
  - options
- watchEffect


[Prev](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/205_brs_reactive_flags.md) | [Next](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/220_brs_other_apis.md)
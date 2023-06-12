[Prev](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/200_brs_ref_api.md) | [Next](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/210_brs_computed_watch.md)

---
title: "ReactiveFlags による reactive オブジェクトの制御"
---

# ReactiveFlags とは

結論から言うと、ReactiveFlags とは以下のようなものです。

https://github.com/vuejs/core/blob/7cdd13bd1eaf72c0ea07ae667b868e8ce72c50a2/packages/reactivity/src/reactive.ts#L16-L22

このようなフラグを用いて reactive オブジェクトの挙動を制御します。挙動に関しては概ね命名から想像できます。

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


[Prev](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/200_brs_ref_api.md) | [Next](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/210_brs_computed_watch.md)
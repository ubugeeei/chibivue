[Prev](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/310_bcs_provide_inject.md) | [Next](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/320_bcs_component_slot.md)

---
title: "コンポーネントの Proxy と setupContext"
---

# コンポーネントの Proxy

コンポーネントが持つ重要な概念として Proxy というものがあります。  
これは、簡単にいうと、コンポーネントのインスタンスが持つデータ(public なプロパティ)にアクセスするための Proxy で、
この Proxy に setup の結果(ステートや関数)、data、props、などのアクセスはまとめてしまいます。

以下のようなコードを考えてみましょう。(chibivue で実装していない範囲のものも含みます。普段の Vue だと思ってください)

```vue
<script>
export default defineComponent({
  props: { parentCount: { type: Number, default: 0 } },
  data() {
    return { dataState: { count: 0 } };
  },
  methods: {
    incrementData() {
      this.dataState.count++;
    },
  },
  setup() {
    const state = reactive({ count: 0 });
    const increment = () => {
      state.count++;
    };

    return { state, increment };
  },
});
</script>

<template>
  <div>
    <p>count (parent): {{ parentCount }}</p>

    <br />

    <p>count (data): {{ dataState.count }}</p>
    <button @click="incrementData">increment (data)</button>

    <br />

    <p>count: {{ state.count }}</p>
    <button @click="increment">increment</button>
  </div>
</template>
```

このコードは正常に動作するわけですが、さて template へはどうやってバインドしているのでしょうか ?

もう一つ例を挙げます。

```vue
<script setup>
const ChildRef = ref();

// コンポーネントが持つメソッドやデータにアクセスできる
// ChildRef.value?.incrementData
// ChildRef.value?.increment
</script>

<template>
  <!-- Childは先ほどのコンポーネント -->
  <Child :ref="ChildRef" />
</template>
```

こちらも、ref を介してコンポーネントの情報にアクセスすることができます。

これをどうやって実現しているかというと、ComponentInternalInstance に proxy というプロパティをもち、ここにはデータアクセスのための Proxy を持っています。

つまり、template (render 関数)や ref は instance.proxy を参照しているということです。

```ts
interface ComponentInternalInstance {
  proxy: ComponentPublicInstance | null;
}
```

この proxy の実装はもちろん Proxy で実装されていて、概ね、以下のようなイメージです。

```ts
instance.proxy = instance.proxy = new Proxy(
  instance,
  PublicInstanceProxyHandlers
);

export const PublicInstanceProxyHandlers: ProxyHandler<any> = {
  get(instance: ComponentRenderContext, key: string) {
    const { setupState, data, props } = instance;

    // keyを元にsetupState -> data -> propsの順にチェックして存在していれば値を返す
  },
};
```

実際にこの Proxy を実装してみましょう！

実装できたら render 関数や ref にはこの proxy を渡すように書き換えてみましょう。

ここまでのソースコード:  
https://github.com/Ubugeeei/chibivue/tree/main/books/chapter_codes/320-bcs-component_proxy

※ ついでに defineComponent の実装とそれに関連する型付も実装しています (そうすると proxy のデータの型を推論できるようになります。)

![infer_component_types](https://raw.githubusercontent.com/Ubugeeei/chibivue/main/books/images/infer_component_types.png)

# setupContext


[Prev](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/310_bcs_provide_inject.md) | [Next](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/320_bcs_component_slot.md)
[Prev](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/320_bcs_component_proxy_setup_context.md) | [Next](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/340_bcs_options_api.md)

---
title: "スロット"
---

# デフォルトスロットの実装

Vue にはスロットと呼ばれる機能があります。そしてこのスロットには、default slot, named slot, scoped slot の 3 種類があります。  
https://vuejs.org/guide/components/slots.html#slots

今回はこれのうち、デフォルトスロットを実装していきます。
目指す開発者インターフェースは以下のようなものです。

https://vuejs.org/guide/extras/render-function.html#passing-slots

```ts
const MyComponent = defineComponent({
  setup(_, { slots }) {
    return () => h("div", {}, [slots.default()]);
  },
});

const app = createApp({
  setup() {
    return h(MyComponent, {}, () => "hello");
  },
});
```

仕組みは単純で、スロットの定義側では、setupContext として slots を受け取れるようにしておき、使用する側で h 関数でコンポーネントをレンダリングする際に、children としてレンダー関数を渡たすだけです。
おそらく、皆さんが最も馴染み深い使い方は、SFC で template に slot 要素を置いたりする使い方だとは思うのですが、そちらは別途 template のコンパイラを実装する必要があるので、今回は省略します。(Basic Template Compiler 部門で扱います。)

例の如く、インスタンスに slots を保持しておけるプロパティを追加し、createSetupContext で SetupContext として混ぜます。  
h 関数も第 3 引数として配列だけではなく、レンダー関数を受け取れるような形にして、レンダー関数が来た場合にはコンポーネントのインスタンスを生成するタイミングでインスタンスの default slot として設定してあげます。  
とりあえずここまで実装してみましょう！

(children の normalize 実装に伴って ShapeFlags を少々変更しています。)

ここまでのソースコード:  
https://github.com/Ubugeeei/chibivue/tree/main/books/chapter_codes/330-bcs-component_slot

# 名前付きスロットの実装


[Prev](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/320_bcs_component_proxy_setup_context.md) | [Next](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/340_bcs_options_api.md)
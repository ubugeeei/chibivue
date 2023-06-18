[Prev](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/210_brs_computed_watch.md) | [Next](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/215_brs___wip___reactive_flags.md)

Todo: toTypeString を利用した制限の実装と、それをもとに TemplateRefs の実装をする

<!--
# Template Refs

ref は ref 属性を利用することで template への参照を取ることができます。

https://vuejs.org/guide/essentials/template-refs.html

```ts
import { createApp, h, ref } from "chibivue";

const app = createApp({
  setup() {
    const inputRef = ref<HTMLInputElement | null>(null);
    const focus = () => {
      inputRef.value?.focus();
    };

    return () =>
      h("div", {}, [
        h("input", { ref: inputRef }, []),
        h("button", { onClick: focus }, ["focus"]),
      ]);
  },
});

app.mount("#app");
```

ここまでやってきたみなさんならば、実装方法はもう見えてるかと思います。
そう、VNode に ref を持たせて render 時に値をぶち込んでやればいいわけです。

```ts
export interface VNode<HostNode = any> {
  // .
  // .
  key: string | number | symbol | null;
  ref?: Ref; // これ
  // .
  // .
}
``` -->


[Prev](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/210_brs_computed_watch.md) | [Next](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/215_brs___wip___reactive_flags.md)
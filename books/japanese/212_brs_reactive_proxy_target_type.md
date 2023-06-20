[Prev](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/210_brs_computed_watch.md) | [Next](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/215_brs___wip___reactive_flags.md)

---
title: "リアクティブにするオブジェクトとしないオブジェクト"
---

# 問題点

さて、ここでは現状のリアクティブシステムのある問題について解決していきます。  
まずは以下のコードを動かしてみてください。

```ts
import { createApp, h, ref } from "chibivue";

const app = createApp({
  setup() {
    const inputRef = ref<HTMLInputElement | null>(null);
    const getRef = () => {
      inputRef.value = document.getElementById(
        "my-input"
      ) as HTMLInputElement | null;
      console.log(inputRef.value);
    };

    return () =>
      h("div", {}, [
        h("input", { id: "my-input" }, []),
        h("button", { onClick: getRef }, ["getRef"]),
      ]);
  },
});

app.mount("#app");
```

コンソールを見てみると、以下のようになっていることが観測できるかと思います。

![reactive_html_element](https://raw.githubusercontent.com/Ubugeeei/chibivue/main/books/images/reactive_html_element.png)

ここで、focus をする処理を加えてみましょう。

```ts
import { createApp, h, ref } from "chibivue";

const app = createApp({
  setup() {
    const inputRef = ref<HTMLInputElement | null>(null);
    const getRef = () => {
      inputRef.value = document.getElementById(
        "my-input"
      ) as HTMLInputElement | null;
      console.log(inputRef.value);
    };
    const focus = () => {
      inputRef.value?.focus();
    };

    return () =>
      h("div", {}, [
        h("input", { id: "my-input" }, []),
        h("button", { onClick: getRef }, ["getRef"]),
        h("button", { onClick: focus }, ["focus"]),
      ]);
  },
});

app.mount("#app");
```

なんと、エラーになってしまいます。

![focus_in_reactive_html_element](https://raw.githubusercontent.com/Ubugeeei/chibivue/main/books/images/focus_in_reactive_html_element.png)

これの原因としては、document.getElementById によって取得した要素自体を元に Proxy を生成してしまっているためです。

Proxy を生成してしまうと値は当然元のオブジェクトではなく Proxy になってしまいますから、HTML 要素としての機能が失われてしまっているのです。

# reactive Proxy を生成する前にオブジェクトを判定する。

判定方法はとてもシンプルです。`Object.prototype.toString`を利用します。
先ほどのコードで、Object.prototype.toString を使うと HTMLInputElement はどのように判定されるかみてみましょう。

```ts
import { createApp, h, ref } from "chibivue";

const app = createApp({
  setup() {
    const inputRef = ref<HTMLInputElement | null>(null);
    const getRef = () => {
      inputRef.value = document.getElementById(
        "my-input"
      ) as HTMLInputElement | null;
      console.log(inputRef.value?.toString());
    };
    const focus = () => {
      inputRef.value?.focus();
    };

    return () =>
      h("div", {}, [
        h("input", { id: "my-input" }, []),
        h("button", { onClick: getRef }, ["getRef"]),
        h("button", { onClick: focus }, ["focus"]),
      ]);
  },
});

app.mount("#app");
```

![element_to_string](https://raw.githubusercontent.com/Ubugeeei/chibivue/main/books/images/element_to_string.png)

このようにしてどういうオブジェクトなのかというのを知ることができます。ややハードコードですが、この判定関数を一般化します。

```ts
// shared/general.ts
export const objectToString = Object.prototype.toString;
export const toTypeString = (value: unknown): string =>
  objectToString.call(value);

export const toRawType = (value: unknown): string => {
  return toTypeString(value).slice(8, -1);
};
```

slice しているのは、`[Object hoge]`の hoge に当たる文字列を取得するためです。

そして、reactive toRawType によってオブジェクトの種類を判別し、分岐していきましょう。  
HTMLInput の場合は Proxy の生成をスキップするようにします。

reactive.ts の方で、rawType を取得し、reactive のターゲットとなるオブジェクトのタイプを判定します。

```ts
const enum TargetType {
  INVALID = 0,
  COMMON = 1,
}

function targetTypeMap(rawType: string) {
  switch (rawType) {
    case "Object":
    case "Array":
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return TargetType.COMMON;
    default:
      return TargetType.INVALID;
  }
}

function getTargetType<T extends object>(value: T) {
  return !Object.isExtensible(value)
    ? TargetType.INVALID
    : targetTypeMap(toRawType(value));
}
```

```ts
export function reactive<T extends object>(target: T): T {
  const targetType = getTargetType(target);
  if (targetType === TargetType.INVALID) {
    return target;
  }

  const proxy = new Proxy(target, mutableHandlers);
  return proxy as T;
}
```

これで先ほどのフォーカスのコードが動くようになったはずです！

![focus_in_element](https://raw.githubusercontent.com/Ubugeeei/chibivue/main/books/images/focus_in_element.png)

## TemplateRefs を実装してみる

せっかく Ref に HTML 要素を入れられるようになったので、TemplateRef を実装してみましょう。

ref は ref 属性を利用することで template への参照を取ることができます。

https://vuejs.org/guide/essentials/template-refs.html

目標は以下のようなコードが動くようになることです。

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
  ref: Ref | null; // これ
  // .
  // .
}
```

本家の実装でいうと、setRef という関数です。探して、読んで、実装をしてみましょう！  
本家の方では配列で ref を持ったり、$ref でアクセスできるようにしたりと色々複雑になっていますが、とりあえず上記のコードが動く程度のものを目指してみましょう。


[Prev](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/210_brs_computed_watch.md) | [Next](https://github.com/Ubugeeei/chibivue/blob/main/books/japanese/215_brs___wip___reactive_flags.md)
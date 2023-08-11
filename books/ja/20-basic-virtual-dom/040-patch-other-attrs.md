---
title: "対応できていない Props のパッチ"
---

このチャプターでは、現時点で対応できていない Props のパッチを実装していきましょう。  
以下にはいくつか例として対応対象を挙げますが、各自で足りてない所を本家の実装を読みながら実装してみましょう！  
そうすればより実用的なものにグレードアップするはずです！

特に新しいことは出てきません。今までやってきたことで十分実装できるはずです。

注目したいのは、runtime-dom/modules の実装です。

# 新旧の比較

現状だと n2 の props を元にしか更新ができていません。  
n1 と n2 を元に更新しましょう。

```ts
const oldProps = n1.props || {};
const newProps = n2.props || {};
```

n1 に存在していて n2n に存在しない props は削除です。  
また、両者に存在していても値が変わっていなければ patch する必要はないのでスキップします。

# class / style (注意)

class と style には複数のバインディング方法があります。

```html
<p class="static property">hello</p>
<p :class="'dynamic property'">hello</p>
<p :class="['dynamic', 'property', 'array']">hello</p>
<p :class="{ dynamic: true, property: true, array: true}">hello</p>
<p class="static property" :class="'mixed dynamic property'">hello</p>
<p style="static: true;" :style="{ mixed-dynamic: 'true' }">hello</p>
```

これらを実現するには、Basic Template Compiler 部門で説明する `transform` という概念が必要になります。  
本家 Vue の設計に則らなければどこに実装してもいいのですが、本書では本家 Vue の設計に則りたいためここではスキップします。

# innerHTML / textContent

innerHTML と textContent については他の Props と比べて少し特殊です。
というのもこの Prop を持つ要素が子要素を持っていた場合、unmount する必要があります。

TODO: 書く

<!-- 以下の例を見てみましょう。

```ts
const Child = {
  setup() {
    return () => h("span", {}, "initial message");
  },
};

const App = {
  setup() {
    const message = ref(undefined);

    return () =>
      h("div", [
        h("p", { innerHTML: message.value }, [Child]),
        h(
          "button",
          {
            onClick: () => {
              message.value = "hello";
            },
          },
          "update"
        ),
      ]);
  },
};

export default App;
```

初回レンダリング時は message は undefined なので、innerHTML には特に何もセットされず、Child コンポーネントがマウントされます。

ボタンをクリックすると innerHTML に `"hello"` が入ることになるのですが、この時、既にマウントされている Child コンポーネントはアンマウントする必要があります。

これは textContent にも同じことが言えます。

最近の Vue でこのコードを試してもらえればわかるのですが、innerHTML と textContent を props としてもつ要素が子要素を持つこと
なので、あまり考える必要はないっちゃないのですが、一応 unmount するように実装しましょう。 -->

# DOM Props の更新と value の型の微調整

まず、DOM の属性として更新されるべきものを列挙しておく必要があります。
removeAttribute / setAttribute で更新されるべきものと `el[key] = value` のように更新されるべきものを分けます。

また、DOM Props の値として使用できる型に制限がある場合はそれに合わせてキャストしておく必要があります。  
`const type = typeof el[key]`により型を取得し、patch 関数に入ってきた value をそれに合わせてキャストします。  
また、キャストだけではなく、そもそも削除としてみなすような値の場合は removeAttribute します。例えば、patch の key が id で value が空文字だった場合です。

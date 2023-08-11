

# ディレクティブの実装 (v-on/v-bind)

## DirectiveTransform

ここからは Vue.js の醍醐味であるディレクティブを実装していきます。  
DirectiveTransform は DirectiveNode,ElementNode を受け取り、Transform 後の Property を返すようなインタフェースになっています。

```ts
export type DirectiveTransform = (
  dir: DirectiveNode,
  node: ElementNode,
  context: TransformContext
) => DirectiveTransformResult;

export interface DirectiveTransformResult {
  props: Property[];
}
```

## v-on

## AST と Parser の変更

ディレクティブの実装としてまずは v-on から見ていきましょう。  
まず、AST についてですが、今は exp, arg 共に string という簡易的なものになってしまっているので、ExpressionNode を受け取れるように変更します。

```ts
export interface DirectiveNode extends Node {
  type: NodeTypes.DIRECTIVE;
  name: string;
  exp: ExpressionNode | undefined; // ここ
  arg: ExpressionNode | undefined; // ここ
}
```

これに伴って parser の実装も変更します。exp, arg を SimpleExpressionNode としてパースします。

```ts
function parseAttribute(
  context: ParserContext,
  nameSet: Set<string>
): AttributeNode | DirectiveNode {
  // .
  // .
  // .
  // .
  // directive
  const loc = getSelection(context, start);
  if (/^(v-[A-Za-z0-9-]|@)/.test(name)) {
    const match =
      /(?:^v-([a-z0-9-]+))?(?:(?::|^\.|^@|^#)(\[[^\]]+\]|[^\.]+))?(.+)?$/i.exec(
        name
      )!;

    let dirName = match[1] || (startsWith(name, "@") ? "on" : "");

    // ---------------- ここから ----------------
    let arg: ExpressionNode | undefined;

    if (match[2]) {
      const startOffset = name.lastIndexOf(match[2]);
      const loc = getSelection(
        context,
        getNewPosition(context, start, startOffset),
        getNewPosition(context, start, startOffset + match[2].length)
      );
      let content = match[2];
      arg = {
        type: NodeTypes.SIMPLE_EXPRESSION,
        content,
        isStatic: true,
        loc,
      };
    }

    return {
      type: NodeTypes.DIRECTIVE,
      name: dirName,
      exp: value && {
        type: NodeTypes.SIMPLE_EXPRESSION,
        content: value.content,
        isStatic: false,
        loc: value.loc,
      },
      loc,
      arg,
    };
  }
}
```

ここまでで今回、トランスフォームしたい対象の AST Node を作ることができました。

## transformOn でやりたいこと

さて、ここからは Transformer の実装です。
まずは、考えられる開発者インタフェースについてみてみましょう。
v-on ディレクティブの exp として取りうる形と、それらに必要な AST Node の変換を考えてみます。

```ts
const App = defineComponent({
  setup() {
    const count = ref(0);
    const increment = () => count.value++;
    const object = { increment };
    return { count, increment, object };
  },

  template: `
    <div class="container">
      <button @click="increment">increment</button>
      <button @click="($event) => count++">() => count++</button>
      <button @click="object.increment">object.increment</button>
      <button @click="count++;">count++</button>
      <p> {{ count }} </p>
    </div>
    `,
});
```

テンプレートの部分だけ抜きだしてみます。

```html
<button @click="increment">increment</button>
<button @click="() => count++">() => count++</button>
<button @click="object.increment">object.increment</button>
<button @click="count = 0">reset</button>
```

上記のように、v-on ディレクティブの exp としては関数の識別子を指定するケースであったり、関数式を定義したり、直接文を書いたりすることができます。  
いくつかの課題に分けて列挙してみましょう。

- 課題 1  
  関数以外のや文を書くことができる

  ```html
  <button @click="count = 0">reset</button>
  ```

  この式は以下のような関数に変換する必要があるようです。

  ```ts
  () => {
    count = 0;
  };
  ```

- 課題 2  
  課題 1 のような場合には `$event` というという識別子を使うことができる

  ```ts
  const App = defineComponent({
    setup() {
      const count = ref(0);
      const increment = (e: Event) => {
        console.log(e);
        count.value++;
      };
      const object = { increment };
      return { count, increment, object };
    },

    template: `
      <div class="container">
        <button @click="increment">increment</button>
        <button @click="increment($event)">increment($event)</button>
        <button @click="(e) => increment(e)">(e) => increment(e)</button>
        <p> {{ count }} </p>
      </div>
      `,
  });
  // @click="() => increment($event)" のようには使えない。
  ```

  以下のような関数に変換する必要があるようです。

  ```ts
  ($event) => {
    increment($event);
  };
  ```

- 課題 3  
  transformExpression で transform してはいけない識別子がある
  ```html
  <button @click="() => { const a = 999; count += a;}">+999</button>
  ```
  このような式がある場合、count は transform する必要がありますが、`a`ば transform してはいけません (\_ctx.a ではなく a として使いたい)
  これは `$event` 識別子をしようした場合にも同様です。

## transformOn の実装方針



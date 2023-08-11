import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "The chibivue Books",
  description: "This is an online book for implementing chibivue.",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Start Learning", link: "/ja/00-introduction/010-about" },
    ],

    sidebar: [
      {
        text: "Getting Started",
        collapsed: false,
        items: [
          { text: "初めに", link: "/ja/00-introduction/010-about" },
          { text: "Vue.jsとは", link: "/ja/00-introduction/020-what-is-vue" },
          {
            text: "Vue.jsを構成する主要な要素",
            link: "/ja/00-introduction/030-vue-core-components",
          },
          {
            text: "本書の進め方と環境構築",
            link: "/ja/00-introduction/040-setup-project",
          },
        ],
      },
      {
        text: "Minimum Example",
        collapsed: true,
        items: [
          {
            text: "初めてのレンダリングとcreateApp API",
            link: "/ja/10-minimum-example/010-create-app-api",
          },
          {
            text: "HTML要素をレンダリングできるようにしよう",
            link: "/ja/10-minimum-example/020-simple-h-function",
          },
          {
            text: "小さいリアクティブシステム",
            link: "/ja/10-minimum-example/030-minimum-reactive",
          },
          {
            text: "小さい仮想DOMシステム",
            link: "/ja/10-minimum-example/040-minimum-virtual-dom",
          },
          {
            text: "コンポーネント指向で開発したい",
            link: "/ja/10-minimum-example/050-minimum-component",
          },
          {
            text: "小さいテンプレートコンパイラ",
            link: "/ja/10-minimum-example/060-minimum-template-compiler",
          },
          {
            text: "もっと複雑な HTML を書きたい",
            link: "/ja/10-minimum-example/070-more-complex-parser",
          },
          {
            text: "データバインディング",
            link: "/ja/10-minimum-example/080-template-binding",
          },
          {
            text: "SFC で開発したい",
            link: "/ja/10-minimum-example/090-minimum-sfc",
          },
          {
            text: "ちょっと一息",
            link: "/ja/10-minimum-example/100-break",
          },
        ],
      },
      {
        text: "Basic Virtual DOM",
        collapsed: true,
        items: [
          {
            text: "key属性とパッチレンダリング",
            link: "/ja/20-basic-virtual-dom/010-bvd-patch-keyed-children",
          },
          {
            text: "ビットによるVNodeの表現",
            link: "/ja/20-basic-virtual-dom/020-bvd-bit-flags",
          },
          {
            text: "スケジューラ",
            link: "/ja/20-basic-virtual-dom/030-bvd-scheduler",
          },
          {
            text: "対応できていない Props のパッチ",
            link: "/ja/20-basic-virtual-dom/040-bvd-patch-other-attrs",
          },
        ],
      },
      {
        text: "Basic Reactivity System",
        collapsed: true,
        items: [
          {
            text: "ref api",
            link: "/ja/30-basic-reactivity-system/010-brs-ref-api",
          },
          {
            text: "computed / watch api",
            link: "/ja/30-basic-reactivity-system/020-brs-computed-watch",
          },
          {
            text: "様々な Reactive Proxy Handler",
            link: "/ja/30-basic-reactivity-system/030-brs-reactive-proxy-handlers",
          },
          {
            text: "Effect のクリーンアップと Effect Scope",
            link: "/ja/30-basic-reactivity-system/040-brs-effect-scope",
          },
          {
            text: "その他の reactivity api",
            link: "/ja/30-basic-reactivity-system/050-brs-other-apis",
          },
        ],
      },
      {
        text: "Basic Component System",
        collapsed: true,
        items: [
          {
            text: "ライフサイクルフック",
            link: "/ja/40-basic-component-system/010-bcs-lifecycle-hooks",
          },
          {
            text: "Provide/Inject",
            link: "/ja/40-basic-component-system/020-bcs-provide-inject",
          },
          {
            text: "コンポーネントの Proxy と setupContext",
            link: "/ja/40-basic-component-system/030-bcs-component-proxy-setup-context",
          },
          {
            text: "スロット",
            link: "/ja/40-basic-component-system/040-bcs-component-slot",
          },
          {
            text: "Options APIに対応する",
            link: "/ja/40-basic-component-system/050-bcs-options-api",
          },
        ],
      },
      {
        text: "Basic Template Compiler",
        collapsed: true,
        items: [
          {
            text: "Transformer の実装 の Codegen のリファクタ",
            link: "/ja/50-basic-template-compiler/010-btc-transform",
          },
          {
            text: "transformExpression",
            link: "/ja/50-basic-template-compiler/020-btc-transform-expression",
          },
          {
            text: "v-for に対応する",
            link: "/ja/50-basic-template-compiler/030-btc-v-for",
          },
          {
            text: "v-if に対応する",
            link: "/ja/50-basic-template-compiler/040-btc-v-if",
          },
          {
            text: "v-model に対応する",
            link: "/ja/50-basic-template-compiler/050-btc-v-model",
          },
          {
            text: "スロットに対応する",
            link: "/ja/50-basic-template-compiler/060-btc-slot",
          },
        ],
      },
      {
        text: "Basic SFC Compiler",
        collapsed: true,
        items: [
          {
            text: "script setup に対応する",
            link: "/ja/60-basic-sfc-compiler/010-bsc-script-setup",
          },
          {
            text: "defineProps に対応する",
            link: "/ja/60-basic-sfc-compiler/020-bsc-define-props",
          },
          {
            text: "defineEmits に対応する",
            link: "/ja/60-basic-sfc-compiler/030-bsc-define-emits",
          },
          {
            text: "Scoped CSS に対応する",
            link: "/ja/60-basic-sfc-compiler/040-scoped-css",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});

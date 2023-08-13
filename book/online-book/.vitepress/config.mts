import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "The chibivue Book",
  description: "This is an online book for implementing chibivue.",
  lang: "ja",
  srcDir: "src",
  srcExclude: ["__wip"],
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "https://github.com/Ubugeeei/chibivue/blob/main/book/images/logo/logo.png?raw=true",
      },
    ],

    // og
    [
      "meta",
      { property: "og:url", content: "https://ubugeeei.github.io/chibivue" },
    ],
    ["meta", { property: "og:title", content: "chibivue" }],
    [
      "meta",
      {
        property: "og:description",
        content: "Writing Vue.js with your own hands.",
      },
    ],
    [
      "meta",
      {
        property: "og:image",
        content:
          "https://github.com/Ubugeeei/chibivue/blob/main/book/images/logo/logo.png?raw=true",
      },
    ],
  ],

  locales: {
    root: {
      label: "Japanese",
      lang: "ja",
      // link: "/ja/",
    },
    en: {
      label: "English",
      lang: "en",
      link: "/en/",
    },
  },
  themeConfig: {
    logo: "https://github.com/Ubugeeei/chibivue/blob/main/book/images/logo/logo.png?raw=true",
    nav: [
      { text: "Home", link: "/" },
      { text: "Start Learning", link: "/00-introduction/010-about" },
    ],

    sidebar: [
      {
        text: "Getting Started",
        collapsed: false,
        items: [
          { text: "初めに", link: "/00-introduction/010-about" },
          { text: "Vue.jsとは", link: "/00-introduction/020-what-is-vue" },
          {
            text: "Vue.jsを構成する主要な要素",
            link: "/00-introduction/030-vue-core-components",
          },
          {
            text: "本書の進め方と環境構築",
            link: "/00-introduction/040-setup-project",
          },
        ],
      },
      {
        text: "Minimum Example",
        collapsed: true,
        items: [
          {
            text: "初めてのレンダリングとcreateApp API",
            link: "/10-minimum-example/010-create-app-api",
          },
          {
            text: "HTML要素をレンダリングできるようにしよう",
            link: "/10-minimum-example/020-simple-h-function",
          },
          {
            text: "小さいリアクティブシステム",
            link: "/10-minimum-example/030-minimum-reactive",
          },
          {
            text: "小さい仮想DOMシステム",
            link: "/10-minimum-example/040-minimum-virtual-dom",
          },
          {
            text: "コンポーネント指向で開発したい",
            link: "/10-minimum-example/050-minimum-component",
          },
          {
            text: "小さいテンプレートコンパイラ",
            link: "/10-minimum-example/060-minimum-template-compiler",
          },
          {
            text: "もっと複雑な HTML を書きたい",
            link: "/10-minimum-example/070-more-complex-parser",
          },
          {
            text: "データバインディング",
            link: "/10-minimum-example/080-template-binding",
          },
          {
            text: "SFC で開発したい",
            link: "/10-minimum-example/090-minimum-sfc",
          },
          {
            text: "ちょっと一息",
            link: "/10-minimum-example/100-break",
          },
        ],
      },
      {
        text: "Basic Virtual DOM",
        collapsed: true,
        items: [
          {
            text: "key属性とパッチレンダリング",
            link: "/20-basic-virtual-dom/010-patch-keyed-children",
          },
          {
            text: "ビットによるVNodeの表現",
            link: "/20-basic-virtual-dom/020-bit-flags",
          },
          {
            text: "スケジューラ",
            link: "/20-basic-virtual-dom/030-scheduler",
          },
          {
            text: "対応できていない Props のパッチ",
            link: "/20-basic-virtual-dom/040-patch-other-attrs",
          },
        ],
      },
      {
        text: "Basic Reactivity System",
        collapsed: true,
        items: [
          {
            text: "ref api",
            link: "/30-basic-reactivity-system/010-ref-api",
          },
          {
            text: "computed / watch api",
            link: "/30-basic-reactivity-system/020-computed-watch",
          },
          {
            text: "様々な Reactive Proxy Handler",
            link: "/30-basic-reactivity-system/030-reactive-proxy-handlers",
          },
          {
            text: "Effect のクリーンアップと Effect Scope",
            link: "/30-basic-reactivity-system/040-effect-scope",
          },
          {
            text: "その他の reactivity api",
            link: "/30-basic-reactivity-system/050-other-apis",
          },
        ],
      },
      {
        text: "Basic Component System",
        collapsed: true,
        items: [
          {
            text: "ライフサイクルフック",
            link: "/40-basic-component-system/010-lifecycle-hooks",
          },
          {
            text: "Provide/Inject",
            link: "/40-basic-component-system/020-provide-inject",
          },
          {
            text: "コンポーネントの Proxy と setupContext",
            link: "/40-basic-component-system/030-component-proxy-setup-context",
          },
          {
            text: "スロット",
            link: "/40-basic-component-system/040-component-slot",
          },
          {
            text: "Options APIに対応する",
            link: "/40-basic-component-system/050-options-api",
          },
        ],
      },
      {
        text: "Basic Template Compiler",
        collapsed: true,
        items: [
          {
            text: "Transformer の実装 の Codegen のリファクタ",
            link: "/50-basic-template-compiler/010-transform",
          },
          // {
          //   text: "transformExpression",
          //   link: "/50-basic-template-compiler/020-transform-expression",
          // },
          {
            text: "v-for に対応する",
            link: "/50-basic-template-compiler/030-v-for",
          },
          {
            text: "v-if に対応する",
            link: "/50-basic-template-compiler/040-v-if",
          },
          {
            text: "v-model に対応する",
            link: "/50-basic-template-compiler/050-v-model",
          },
          {
            text: "スロットに対応する",
            link: "/50-basic-template-compiler/060-slot",
          },
        ],
      },
      {
        text: "Basic SFC Compiler",
        collapsed: true,
        items: [
          {
            text: "script setup に対応する",
            link: "/60-basic-sfc-compiler/010-script-setup",
          },
          {
            text: "defineProps に対応する",
            link: "/60-basic-sfc-compiler/020-define-props",
          },
          {
            text: "defineEmits に対応する",
            link: "/60-basic-sfc-compiler/030-define-emits",
          },
          {
            text: "Scoped CSS に対応する",
            link: "/60-basic-sfc-compiler/040-scoped-css",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/Ubugeeei/chibivue" },
      { icon: "twitter", link: "https://twitter.com/ubugeeei" },
    ],

    // editLink: {
    //   repo: "ubugeeei/chibivue",
    //   text: "Edit this page on GitHub",
    // },

    footer: {
      // license: {
      //   text: "MIT License",
      //   link: "https://opensource.org/licenses/MIT",
      // },
      copyright: `Copyright © 2023-${new Date().getFullYear()} ubugeeei`,
    },
  },
});

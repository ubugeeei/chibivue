// book/online-book/.vitepress/config/index.ts
import { defineConfig as defineConfig2 } from "file:///Users/ubugeeei/projects/personal/typescript/chibi-vue/node_modules/.pnpm/vitepress@1.0.0-rc.4_@algolia+client-search@4.19.1_@types+node@17.0.45_search-insights@2.7.0/node_modules/vitepress/dist/node/index.js";

// book/online-book/.vitepress/config/shared.ts
import { defineConfig } from "file:///Users/ubugeeei/projects/personal/typescript/chibi-vue/node_modules/.pnpm/vitepress@1.0.0-rc.4_@algolia+client-search@4.19.1_@types+node@17.0.45_search-insights@2.7.0/node_modules/vitepress/dist/node/index.js";
var sharedConfig = defineConfig({
  title: "The chibivue Book",
  appearance: "dark",
  description: 'Writing Vue.js: Step by Step, from just one line of "Hello, World".',
  lang: "ja",
  srcDir: "src",
  srcExclude: ["__wip"],
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "https://github.com/Ubugeeei/chibivue/blob/main/book/images/logo/logo.png?raw=true"
      }
    ],
    // og
    ["meta", { property: "og:site_name", content: "chibivue" }],
    [
      "meta",
      { property: "og:url", content: "https://ubugeeei.github.io/chibivue" }
    ],
    ["meta", { property: "og:title", content: "chibivue" }],
    [
      "meta",
      {
        property: "og:description",
        content: 'Writing Vue.js: Step by Step, from just one line of "Hello, World".'
      }
    ],
    [
      "meta",
      {
        property: "og:image",
        content: "https://github.com/Ubugeeei/chibivue/blob/main/book/images/logo/chibivue-img.png?raw=true"
      }
    ],
    ["meta", { property: "og:image:alt", content: "chibivue" }],
    ["meta", { name: "twitter:site", content: "chibivue" }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:title", content: "chibivue" }],
    [
      "meta",
      {
        name: "twitter:description",
        content: 'Writing Vue.js: Step by Step, from just one line of "Hello, World".'
      }
    ],
    [
      "meta",
      {
        name: "twitter:image",
        content: "https://github.com/Ubugeeei/chibivue/blob/main/book/images/logo/chibivue-img.png?raw=true"
      }
    ],
    ["meta", { name: "twitter:image:alt", content: "chibivue" }]
  ],
  themeConfig: {
    logo: "https://github.com/Ubugeeei/chibivue/blob/main/book/images/logo/logo.png?raw=true",
    search: { provider: "local" },
    outline: "deep",
    socialLinks: [
      { icon: "github", link: "https://github.com/Ubugeeei/chibivue" },
      { icon: "twitter", link: "https://twitter.com/ubugeeei" }
    ],
    editLink: {
      pattern: "https://github.com/Ubugeeei/chibivue/blob/main/book/online-book/src/:path",
      text: "Suggest changes to this page"
    },
    footer: {
      copyright: `Copyright \xA9 2023-${(/* @__PURE__ */ new Date()).getFullYear()} ubugeeei`,
      message: "Released under the MIT License."
    }
  }
});

// book/online-book/.vitepress/config/ja.ts
var jaConfig = {
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Start Learning", link: "/00-introduction/010-about" }
    ],
    sidebar: [
      {
        text: "Getting Started",
        collapsed: false,
        items: [
          { text: "\u521D\u3081\u306B", link: "/00-introduction/010-about" },
          { text: "Vue.js\u3068\u306F", link: "/00-introduction/020-what-is-vue" },
          {
            text: "Vue.js\u3092\u69CB\u6210\u3059\u308B\u4E3B\u8981\u306A\u8981\u7D20",
            link: "/00-introduction/030-vue-core-components"
          },
          {
            text: "\u672C\u66F8\u306E\u9032\u3081\u65B9\u3068\u74B0\u5883\u69CB\u7BC9",
            link: "/00-introduction/040-setup-project"
          }
        ]
      },
      {
        text: "Minimum Example",
        collapsed: false,
        items: [
          {
            text: "\u521D\u3081\u3066\u306E\u30EC\u30F3\u30C0\u30EA\u30F3\u30B0\u3068createApp API",
            link: "/10-minimum-example/010-create-app-api"
          },
          {
            text: "HTML\u8981\u7D20\u3092\u30EC\u30F3\u30C0\u30EA\u30F3\u30B0\u3067\u304D\u308B\u3088\u3046\u306B\u3057\u3088\u3046",
            link: "/10-minimum-example/020-simple-h-function"
          },
          {
            text: "\u5C0F\u3055\u3044 reactivity system ",
            link: "/10-minimum-example/030-minimum-reactive"
          },
          {
            text: "\u5C0F\u3055\u3044 virtual DOM",
            link: "/10-minimum-example/040-minimum-virtual-dom"
          },
          {
            text: "\u30B3\u30F3\u30DD\u30FC\u30CD\u30F3\u30C8\u6307\u5411\u3067\u958B\u767A\u3057\u305F\u3044",
            link: "/10-minimum-example/050-minimum-component"
          },
          {
            text: "\u5C0F\u3055\u3044\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u30B3\u30F3\u30D1\u30A4\u30E9",
            link: "/10-minimum-example/060-minimum-template-compiler"
          },
          {
            text: "\u3082\u3063\u3068\u8907\u96D1\u306A HTML \u3092\u66F8\u304D\u305F\u3044",
            link: "/10-minimum-example/070-more-complex-parser"
          },
          {
            text: "\u30C7\u30FC\u30BF\u30D0\u30A4\u30F3\u30C7\u30A3\u30F3\u30B0",
            link: "/10-minimum-example/080-template-binding"
          },
          {
            text: "SFC \u3067\u958B\u767A\u3057\u305F\u3044",
            link: "/10-minimum-example/090-minimum-sfc"
          },
          {
            text: "\u3061\u3087\u3063\u3068\u4E00\u606F",
            link: "/10-minimum-example/100-break"
          }
        ]
      },
      {
        text: "Basic Virtual DOM",
        collapsed: false,
        items: [
          {
            text: "key\u5C5E\u6027\u3068\u30D1\u30C3\u30C1\u30EC\u30F3\u30C0\u30EA\u30F3\u30B0",
            link: "/20-basic-virtual-dom/010-patch-keyed-children"
          },
          {
            text: "\u30D3\u30C3\u30C8\u306B\u3088\u308BVNode\u306E\u8868\u73FE",
            link: "/20-basic-virtual-dom/020-bit-flags"
          },
          {
            text: "\u30B9\u30B1\u30B8\u30E5\u30FC\u30E9",
            link: "/20-basic-virtual-dom/030-scheduler"
          },
          {
            text: "\u5BFE\u5FDC\u3067\u304D\u3066\u3044\u306A\u3044 Props \u306E\u30D1\u30C3\u30C1",
            link: "/20-basic-virtual-dom/040-patch-other-attrs"
          }
        ]
      },
      {
        text: "Basic Reactivity System",
        collapsed: false,
        items: [
          {
            text: "ref api",
            link: "/30-basic-reactivity-system/010-ref-api"
          },
          {
            text: "computed / watch api",
            link: "/30-basic-reactivity-system/020-computed-watch"
          },
          {
            text: "\u69D8\u3005\u306A Reactive Proxy Handler",
            link: "/30-basic-reactivity-system/030-reactive-proxy-handlers"
          },
          {
            text: "Effect \u306E\u30AF\u30EA\u30FC\u30F3\u30A2\u30C3\u30D7\u3068 Effect Scope",
            link: "/30-basic-reactivity-system/040-effect-scope"
          },
          {
            text: "\u305D\u306E\u4ED6\u306E reactivity api",
            link: "/30-basic-reactivity-system/050-other-apis"
          }
        ]
      },
      {
        text: "Basic Component System",
        collapsed: false,
        items: [
          {
            text: "\u30E9\u30A4\u30D5\u30B5\u30A4\u30AF\u30EB\u30D5\u30C3\u30AF",
            link: "/40-basic-component-system/010-lifecycle-hooks"
          },
          {
            text: "Provide/Inject",
            link: "/40-basic-component-system/020-provide-inject"
          },
          {
            text: "\u30B3\u30F3\u30DD\u30FC\u30CD\u30F3\u30C8\u306E Proxy \u3068 setupContext",
            link: "/40-basic-component-system/030-component-proxy-setup-context"
          },
          {
            text: "\u30B9\u30ED\u30C3\u30C8",
            link: "/40-basic-component-system/040-component-slot"
          },
          {
            text: "Options API\u306B\u5BFE\u5FDC\u3059\u308B",
            link: "/40-basic-component-system/050-options-api"
          }
        ]
      },
      {
        text: "Basic Template Compiler",
        collapsed: false,
        items: [
          {
            text: "Transformer \u306E\u5B9F\u88C5 \u306E Codegen \u306E\u30EA\u30D5\u30A1\u30AF\u30BF",
            link: "/50-basic-template-compiler/010-transform"
          },
          {
            text: "\u30C7\u30A3\u30EC\u30AF\u30C6\u30A3\u30D6\u3092\u5B9F\u88C5\u3057\u3088\u3046 (v-bind)",
            link: "/50-basic-template-compiler/020-v-bind"
          },
          {
            text: "v-on \u306B\u5BFE\u5FDC\u3059\u308B",
            link: "/50-basic-template-compiler/025-v-on"
          },
          {
            text: "compiler-dom \u3068\u30A4\u30D9\u30F3\u30C8\u4FEE\u98FE\u5B50",
            link: "/50-basic-template-compiler/027-event-modifier"
          },
          {
            text: "Fragment \u306B\u5BFE\u5FDC\u3059\u308B",
            link: "/50-basic-template-compiler/030-fragment"
          },
          {
            text: "\u30B3\u30E1\u30F3\u30C8\u30A2\u30A6\u30C8\u306B\u5BFE\u5FDC\u3059\u308B",
            link: "/50-basic-template-compiler/035-comment"
          },
          {
            text: "\u{1F6A7} v-if \u3068\u69CB\u9020\u7684\u30C7\u30A3\u30EC\u30AF\u30C6\u30A3\u30D6",
            link: "/50-basic-template-compiler/030-v-if-and-structural-directive"
          },
          {
            text: "\u{1F6A7} v-for \u306B\u5BFE\u5FDC\u3059\u308B",
            link: "/50-basic-template-compiler/040-v-for"
          },
          {
            text: "\u{1F6A7} v-model \u306B\u5BFE\u5FDC\u3059\u308B",
            link: "/50-basic-template-compiler/050-v-model"
          },
          {
            text: "\u{1F6A7} \u30B3\u30F3\u30DD\u30FC\u30CD\u30F3\u30C8\u3092\u89E3\u6C7A\u3059\u308B",
            link: "/50-basic-template-compiler/060-v-model"
          },
          {
            text: "\u{1F6A7} \u30B9\u30ED\u30C3\u30C8\u306B\u5BFE\u5FDC\u3059\u308B",
            link: "/50-basic-template-compiler/070-slot"
          },
          {
            text: "\u{1F6A7} \u30AB\u30B9\u30BF\u30E0\u30C7\u30A3\u30EC\u30AF\u30C6\u30A3\u30D6",
            link: "/50-basic-template-compiler/080-custom-directive"
          }
        ]
      },
      {
        text: "\u{1F6A7} Basic SFC Compiler",
        collapsed: false,
        items: [
          {
            text: "\u{1F6A7} script setup \u306B\u5BFE\u5FDC\u3059\u308B",
            link: "/60-basic-sfc-compiler/010-script-setup"
          },
          {
            text: "\u{1F6A7} defineProps \u306B\u5BFE\u5FDC\u3059\u308B",
            link: "/60-basic-sfc-compiler/020-define-props"
          },
          {
            text: "\u{1F6A7} defineEmits \u306B\u5BFE\u5FDC\u3059\u308B",
            link: "/60-basic-sfc-compiler/030-define-emits"
          },
          {
            text: "\u{1F6A7} Scoped CSS \u306B\u5BFE\u5FDC\u3059\u308B",
            link: "/60-basic-sfc-compiler/040-scoped-css"
          }
        ]
      },
      {
        text: "\u{1F6A7} Web Application Essentials",
        collapsed: false,
        items: [
          {
            text: "\u{1F6A7} Plugin",
            collapsed: false,
            items: [
              {
                text: "\u{1F6A7} Router",
                link: "/90-web-application-essentials/010-plugins/010-router"
              },
              {
                text: "\u{1F6A7} Preprocessors",
                link: "/90-web-application-essentials/010-plugins/020-preprocessors"
              }
            ]
          },
          {
            text: "\u{1F6A7} Server Side Rendering",
            collapsed: false,
            items: [
              {
                text: "\u{1F6A7} createSSRApp",
                link: "/90-web-application-essentials/020-ssr/010-create-ssr-app"
              },
              {
                text: "\u{1F6A7} hydration",
                link: "/90-web-application-essentials/020-ssr/020-hydration"
              }
            ]
          },
          {
            text: "\u{1F6A7} Builtins",
            collapsed: false,
            items: [
              {
                text: "\u{1F6A7} KeepAlive",
                link: "/90-web-application-essentials/030-builtins/010-keep-alive"
              },
              {
                text: "\u{1F6A7} Suspense",
                link: "/90-web-application-essentials/030-builtins/020-suspense"
              },
              {
                text: "\u{1F6A7} Transition",
                link: "/90-web-application-essentials/030-builtins/030-transition"
              }
            ]
          },
          {
            text: "\u{1F6A7} Optimizations",
            collapsed: false,
            items: [
              {
                text: "\u{1F6A7} Static Hoisting",
                link: "/90-web-application-essentials/040-optimizations/010-static-hoisting"
              },
              {
                text: "\u{1F6A7} Patch Flags",
                link: "/90-web-application-essentials/040-optimizations/020-patch-flags"
              },
              {
                text: "\u{1F6A7} Tree Flattening",
                link: "/90-web-application-essentials/040-optimizations/030-tree-flattening"
              }
            ]
          }
        ]
      },
      {
        text: "\u4ED8\u9332",
        collapsed: false,
        items: [
          {
            text: "chibivue\u3001\u30C7\u30AB\u304F\u306A\u3044\u3067\u3059\u304B...?",
            link: "/bonus/hyper-ultimate-super-extreme-minimal-vue/"
          },
          {
            text: "15 \u5206\u3067 Vue \u3092\u4F5C\u308B",
            link: "/bonus/hyper-ultimate-super-extreme-minimal-vue/15-min-impl"
          }
        ]
      }
    ]
  }
};

// book/online-book/.vitepress/config/en.ts
var enConfig = {
  themeConfig: {
    nav: [
      { text: "Home", link: "/en/" },
      { text: "Start Learning", link: "/en/00-introduction/010-about" }
    ],
    sidebar: [
      {
        text: "Getting Started",
        collapsed: false,
        items: [
          { text: "Getting Started", link: "/en/00-introduction/010-about" },
          {
            text: "What is Vue.js?",
            link: "/en/00-introduction/020-what-is-vue"
          },
          {
            text: "Key Elements of Vue.js",
            link: "/en/00-introduction/030-vue-core-components"
          },
          {
            text: "Approach in This Book and Setting Up the Environment",
            link: "/en/00-introduction/040-setup-project"
          }
        ]
      },
      {
        text: "Minimum Example",
        collapsed: false,
        items: [
          {
            text: "First Rendering and the createApp API",
            link: "/en/10-minimum-example/010-create-app-api"
          },
          {
            text: "Let's Enable Rendering HTML Elements",
            link: "/en/10-minimum-example/020-simple-h-function"
          },
          {
            text: "A Lightweight Reactivity System",
            link: "/en/10-minimum-example/030-minimum-reactive"
          },
          {
            text: "A Minimal Virtual DOM",
            link: "/en/10-minimum-example/040-minimum-virtual-dom"
          },
          {
            text: "Aspiring for Component-Oriented Development",
            link: "/en/10-minimum-example/050-minimum-component"
          },
          {
            text: "A Simple Template Compiler",
            link: "/en/10-minimum-example/060-minimum-template-compiler"
          },
          {
            text: "Desire to Write More Complex HTML",
            link: "/en/10-minimum-example/070-more-complex-parser"
          },
          {
            text: "Data Binding",
            link: "/en/10-minimum-example/080-template-binding"
          },
          {
            text: "Desire to Develop with Single File Components",
            link: "/en/10-minimum-example/090-minimum-sfc"
          },
          {
            text: "Taking a Short Break",
            link: "/en/10-minimum-example/100-break"
          }
        ]
      },
      {
        text: "\u{1F6A7} Basic Virtual DOM",
        collapsed: false,
        items: [
          {
            text: "key Attribute and Patch Rendering",
            link: "/en/20-basic-virtual-dom/010-patch-keyed-children"
          },
          {
            text: "Bit-Level Representation of VNodes",
            link: "/en/20-basic-virtual-dom/020-bit-flags"
          },
          {
            text: "Scheduler",
            link: "/en/20-basic-virtual-dom/030-scheduler"
          },
          {
            text: "Patch for Unhandled Props",
            link: "/en/20-basic-virtual-dom/040-patch-other-attrs"
          }
        ]
      },
      {
        text: "\u{1F6A7} Basic Reactivity System",
        collapsed: false,
        items: [
          {
            text: "ref API",
            link: "/en/30-basic-reactivity-system/010-ref-api"
          },
          {
            text: "computed / watch API",
            link: "/en/30-basic-reactivity-system/020-computed-watch"
          },
          {
            text: "Various Reactive Proxy Handlers",
            link: "/en/30-basic-reactivity-system/030-reactive-proxy-handlers"
          },
          {
            text: "Effect Cleanup and Effect Scope",
            link: "/en/30-basic-reactivity-system/040-effect-scope"
          },
          {
            text: "Other Reactivity APIs",
            link: "/en/30-basic-reactivity-system/050-other-apis"
          }
        ]
      },
      {
        text: "\u{1F6A7} Basic Component System",
        collapsed: false,
        items: [
          {
            text: "Lifecycle Hooks",
            link: "/en/40-basic-component-system/010-lifecycle-hooks"
          },
          {
            text: "Provide/Inject",
            link: "/en/40-basic-component-system/020-provide-inject"
          },
          {
            text: "Component Proxies and setupContext",
            link: "/en/40-basic-component-system/030-component-proxy-setup-context"
          },
          {
            text: "Slots",
            link: "/en/40-basic-component-system/040-component-slot"
          },
          {
            text: "Supporting Options API",
            link: "/en/40-basic-component-system/050-options-api"
          }
        ]
      },
      {
        text: "\u{1F6A7} Basic Template Compiler",
        collapsed: false,
        items: [
          {
            text: "Refactoring Implementation of Transformer for Codegen",
            link: "/en/50-basic-template-compiler/010-transform"
          },
          {
            text: "Implementing Directives (v-bind)",
            link: "/en/50-basic-template-compiler/020-v-bind"
          },
          {
            text: "Supporting v-on",
            link: "/en/50-basic-template-compiler/025-v-on"
          },
          {
            text: "compiler-dom and Event Modifiers",
            link: "/en/50-basic-template-compiler/027-event-modifier"
          },
          {
            text: "Support for Fragment",
            link: "/en/50-basic-template-compiler/030-fragment"
          },
          {
            text: "\u30B3\u30E1\u30F3\u30C8\u30A2\u30A6\u30C8\u306B\u5BFE\u5FDC\u3059\u308B",
            link: "/50-basic-template-compiler/035-comment"
          },
          {
            text: "v-if and Structural Directives",
            link: "/en/50-basic-template-compiler/030-v-if-and-structural-directive"
          },
          {
            text: "Support for v-for",
            link: "/en/50-basic-template-compiler/040-v-for"
          },
          {
            text: "Support for v-model",
            link: "/en/50-basic-template-compiler/050-v-model"
          },
          {
            text: "Resolving Components",
            link: "/en/50-basic-template-compiler/060-v-model"
          },
          {
            text: "Support for Slot",
            link: "/en/50-basic-template-compiler/070-slot"
          },
          {
            text: "Custom Directives",
            link: "/en/50-basic-template-compiler/080-custom-directive"
          }
        ]
      },
      {
        text: "\u{1F6A7} Basic SFC Compiler",
        collapsed: false,
        items: [
          {
            text: "Supporting script setup",
            link: "/en/60-basic-sfc-compiler/010-script-setup"
          },
          {
            text: "Supporting defineProps",
            link: "/en/60-basic-sfc-compiler/020-define-props"
          },
          {
            text: "Supporting defineEmits",
            link: "/en/60-basic-sfc-compiler/030-define-emits"
          },
          {
            text: "Supporting Scoped CSS",
            link: "/en/60-basic-sfc-compiler/040-scoped-css"
          }
        ]
      },
      {
        text: "\u{1F6A7} Web Application Essentials",
        collapsed: false,
        items: [
          {
            text: "Plugin",
            collapsed: false,
            items: [
              {
                text: "Router",
                link: "en//90-web-application-essentials/010-plugins/010-router"
              },
              {
                text: "Preprocessors",
                link: "en//90-web-application-essentials/010-plugins/020-preprocessors"
              }
            ]
          },
          {
            text: "Server Side Rendering",
            collapsed: false,
            items: [
              {
                text: "createSSRApp",
                link: "en//90-web-application-essentials/020-ssr/010-create-ssr-app"
              },
              {
                text: "hydration",
                link: "en//90-web-application-essentials/020-ssr/020-hydration"
              }
            ]
          },
          {
            text: "\u{1F6A7} Builtins",
            collapsed: false,
            items: [
              {
                text: "KeepAlive",
                link: "en//90-web-application-essentials/030-builtins/010-keep-alive"
              },
              {
                text: "Suspense",
                link: "en//90-web-application-essentials/030-builtins/020-suspense"
              },
              {
                text: "Transition",
                link: "en//90-web-application-essentials/030-builtins/030-transition"
              }
            ]
          },
          {
            text: "\u{1F6A7} Optimizations",
            collapsed: false,
            items: [
              {
                text: "Static Hoisting",
                link: "en//90-web-application-essentials/040-optimizations/010-static-hoisting"
              },
              {
                text: "Patch Flags",
                link: "en//90-web-application-essentials/040-optimizations/020-patch-flags"
              },
              {
                text: "Tree Flattening",
                link: "en//90-web-application-essentials/040-optimizations/030-tree-flattening"
              }
            ]
          }
        ]
      },
      {
        text: "Appendix",
        collapsed: false,
        items: [
          {
            text: "chibivue, isn't it small...?",
            link: "/en/bonus/hyper-ultimate-super-extreme-minimal-vue/"
          },
          {
            text: "Writing Vue.js in 15 minutes.",
            link: "/en/bonus/hyper-ultimate-super-extreme-minimal-vue/15-min-impl.md"
          }
        ]
      }
    ]
  }
};

// book/online-book/.vitepress/config/index.ts
var config_default = defineConfig2({
  ...sharedConfig,
  locales: {
    root: { label: "Japanese", lang: "ja", link: "/", ...jaConfig },
    en: { label: "English", lang: "en", link: "/en/", ...enConfig }
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYm9vay9vbmxpbmUtYm9vay8udml0ZXByZXNzL2NvbmZpZy9pbmRleC50cyIsICJib29rL29ubGluZS1ib29rLy52aXRlcHJlc3MvY29uZmlnL3NoYXJlZC50cyIsICJib29rL29ubGluZS1ib29rLy52aXRlcHJlc3MvY29uZmlnL2phLnRzIiwgImJvb2svb25saW5lLWJvb2svLnZpdGVwcmVzcy9jb25maWcvZW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdWJ1Z2VlZWkvcHJvamVjdHMvcGVyc29uYWwvdHlwZXNjcmlwdC9jaGliaS12dWUvYm9vay9vbmxpbmUtYm9vay8udml0ZXByZXNzL2NvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3VidWdlZWVpL3Byb2plY3RzL3BlcnNvbmFsL3R5cGVzY3JpcHQvY2hpYmktdnVlL2Jvb2svb25saW5lLWJvb2svLnZpdGVwcmVzcy9jb25maWcvaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3VidWdlZWVpL3Byb2plY3RzL3BlcnNvbmFsL3R5cGVzY3JpcHQvY2hpYmktdnVlL2Jvb2svb25saW5lLWJvb2svLnZpdGVwcmVzcy9jb25maWcvaW5kZXgudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZXByZXNzXCI7XG5pbXBvcnQgeyBzaGFyZWRDb25maWcgfSBmcm9tIFwiLi9zaGFyZWQuanNcIjtcbmltcG9ydCB7IGphQ29uZmlnIH0gZnJvbSBcIi4vamFcIjtcbmltcG9ydCB7IGVuQ29uZmlnIH0gZnJvbSBcIi4vZW4uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgLi4uc2hhcmVkQ29uZmlnLFxuICBsb2NhbGVzOiB7XG4gICAgcm9vdDogeyBsYWJlbDogXCJKYXBhbmVzZVwiLCBsYW5nOiBcImphXCIsIGxpbms6IFwiL1wiLCAuLi5qYUNvbmZpZyB9LFxuICAgIGVuOiB7IGxhYmVsOiBcIkVuZ2xpc2hcIiwgbGFuZzogXCJlblwiLCBsaW5rOiBcIi9lbi9cIiwgLi4uZW5Db25maWcgfSxcbiAgfSxcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdWJ1Z2VlZWkvcHJvamVjdHMvcGVyc29uYWwvdHlwZXNjcmlwdC9jaGliaS12dWUvYm9vay9vbmxpbmUtYm9vay8udml0ZXByZXNzL2NvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3VidWdlZWVpL3Byb2plY3RzL3BlcnNvbmFsL3R5cGVzY3JpcHQvY2hpYmktdnVlL2Jvb2svb25saW5lLWJvb2svLnZpdGVwcmVzcy9jb25maWcvc2hhcmVkLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy91YnVnZWVlaS9wcm9qZWN0cy9wZXJzb25hbC90eXBlc2NyaXB0L2NoaWJpLXZ1ZS9ib29rL29ubGluZS1ib29rLy52aXRlcHJlc3MvY29uZmlnL3NoYXJlZC50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlcHJlc3NcIjtcblxuZXhwb3J0IGNvbnN0IHNoYXJlZENvbmZpZyA9IGRlZmluZUNvbmZpZyh7XG4gIHRpdGxlOiBcIlRoZSBjaGliaXZ1ZSBCb29rXCIsXG4gIGFwcGVhcmFuY2U6IFwiZGFya1wiLFxuICBkZXNjcmlwdGlvbjpcbiAgICAnV3JpdGluZyBWdWUuanM6IFN0ZXAgYnkgU3RlcCwgZnJvbSBqdXN0IG9uZSBsaW5lIG9mIFwiSGVsbG8sIFdvcmxkXCIuJyxcbiAgbGFuZzogXCJqYVwiLFxuICBzcmNEaXI6IFwic3JjXCIsXG4gIHNyY0V4Y2x1ZGU6IFtcIl9fd2lwXCJdLFxuICBoZWFkOiBbXG4gICAgW1xuICAgICAgXCJsaW5rXCIsXG4gICAgICB7XG4gICAgICAgIHJlbDogXCJpY29uXCIsXG4gICAgICAgIGhyZWY6IFwiaHR0cHM6Ly9naXRodWIuY29tL1VidWdlZWVpL2NoaWJpdnVlL2Jsb2IvbWFpbi9ib29rL2ltYWdlcy9sb2dvL2xvZ28ucG5nP3Jhdz10cnVlXCIsXG4gICAgICB9LFxuICAgIF0sXG5cbiAgICAvLyBvZ1xuICAgIFtcIm1ldGFcIiwgeyBwcm9wZXJ0eTogXCJvZzpzaXRlX25hbWVcIiwgY29udGVudDogXCJjaGliaXZ1ZVwiIH1dLFxuICAgIFtcbiAgICAgIFwibWV0YVwiLFxuICAgICAgeyBwcm9wZXJ0eTogXCJvZzp1cmxcIiwgY29udGVudDogXCJodHRwczovL3VidWdlZWVpLmdpdGh1Yi5pby9jaGliaXZ1ZVwiIH0sXG4gICAgXSxcbiAgICBbXCJtZXRhXCIsIHsgcHJvcGVydHk6IFwib2c6dGl0bGVcIiwgY29udGVudDogXCJjaGliaXZ1ZVwiIH1dLFxuICAgIFtcbiAgICAgIFwibWV0YVwiLFxuICAgICAge1xuICAgICAgICBwcm9wZXJ0eTogXCJvZzpkZXNjcmlwdGlvblwiLFxuICAgICAgICBjb250ZW50OlxuICAgICAgICAgICdXcml0aW5nIFZ1ZS5qczogU3RlcCBieSBTdGVwLCBmcm9tIGp1c3Qgb25lIGxpbmUgb2YgXCJIZWxsbywgV29ybGRcIi4nLFxuICAgICAgfSxcbiAgICBdLFxuICAgIFtcbiAgICAgIFwibWV0YVwiLFxuICAgICAge1xuICAgICAgICBwcm9wZXJ0eTogXCJvZzppbWFnZVwiLFxuICAgICAgICBjb250ZW50OlxuICAgICAgICAgIFwiaHR0cHM6Ly9naXRodWIuY29tL1VidWdlZWVpL2NoaWJpdnVlL2Jsb2IvbWFpbi9ib29rL2ltYWdlcy9sb2dvL2NoaWJpdnVlLWltZy5wbmc/cmF3PXRydWVcIixcbiAgICAgIH0sXG4gICAgXSxcbiAgICBbXCJtZXRhXCIsIHsgcHJvcGVydHk6IFwib2c6aW1hZ2U6YWx0XCIsIGNvbnRlbnQ6IFwiY2hpYml2dWVcIiB9XSxcbiAgICBbXCJtZXRhXCIsIHsgbmFtZTogXCJ0d2l0dGVyOnNpdGVcIiwgY29udGVudDogXCJjaGliaXZ1ZVwiIH1dLFxuICAgIFtcIm1ldGFcIiwgeyBuYW1lOiBcInR3aXR0ZXI6Y2FyZFwiLCBjb250ZW50OiBcInN1bW1hcnlfbGFyZ2VfaW1hZ2VcIiB9XSxcbiAgICBbXCJtZXRhXCIsIHsgbmFtZTogXCJ0d2l0dGVyOnRpdGxlXCIsIGNvbnRlbnQ6IFwiY2hpYml2dWVcIiB9XSxcbiAgICBbXG4gICAgICBcIm1ldGFcIixcbiAgICAgIHtcbiAgICAgICAgbmFtZTogXCJ0d2l0dGVyOmRlc2NyaXB0aW9uXCIsXG4gICAgICAgIGNvbnRlbnQ6XG4gICAgICAgICAgJ1dyaXRpbmcgVnVlLmpzOiBTdGVwIGJ5IFN0ZXAsIGZyb20ganVzdCBvbmUgbGluZSBvZiBcIkhlbGxvLCBXb3JsZFwiLicsXG4gICAgICB9LFxuICAgIF0sXG4gICAgW1xuICAgICAgXCJtZXRhXCIsXG4gICAgICB7XG4gICAgICAgIG5hbWU6IFwidHdpdHRlcjppbWFnZVwiLFxuICAgICAgICBjb250ZW50OlxuICAgICAgICAgIFwiaHR0cHM6Ly9naXRodWIuY29tL1VidWdlZWVpL2NoaWJpdnVlL2Jsb2IvbWFpbi9ib29rL2ltYWdlcy9sb2dvL2NoaWJpdnVlLWltZy5wbmc/cmF3PXRydWVcIixcbiAgICAgIH0sXG4gICAgXSxcbiAgICBbXCJtZXRhXCIsIHsgbmFtZTogXCJ0d2l0dGVyOmltYWdlOmFsdFwiLCBjb250ZW50OiBcImNoaWJpdnVlXCIgfV0sXG4gIF0sXG4gIHRoZW1lQ29uZmlnOiB7XG4gICAgbG9nbzogXCJodHRwczovL2dpdGh1Yi5jb20vVWJ1Z2VlZWkvY2hpYml2dWUvYmxvYi9tYWluL2Jvb2svaW1hZ2VzL2xvZ28vbG9nby5wbmc/cmF3PXRydWVcIixcbiAgICBzZWFyY2g6IHsgcHJvdmlkZXI6IFwibG9jYWxcIiB9LFxuICAgIG91dGxpbmU6IFwiZGVlcFwiLFxuICAgIHNvY2lhbExpbmtzOiBbXG4gICAgICB7IGljb246IFwiZ2l0aHViXCIsIGxpbms6IFwiaHR0cHM6Ly9naXRodWIuY29tL1VidWdlZWVpL2NoaWJpdnVlXCIgfSxcbiAgICAgIHsgaWNvbjogXCJ0d2l0dGVyXCIsIGxpbms6IFwiaHR0cHM6Ly90d2l0dGVyLmNvbS91YnVnZWVlaVwiIH0sXG4gICAgXSxcbiAgICBlZGl0TGluazoge1xuICAgICAgcGF0dGVybjpcbiAgICAgICAgXCJodHRwczovL2dpdGh1Yi5jb20vVWJ1Z2VlZWkvY2hpYml2dWUvYmxvYi9tYWluL2Jvb2svb25saW5lLWJvb2svc3JjLzpwYXRoXCIsXG4gICAgICB0ZXh0OiBcIlN1Z2dlc3QgY2hhbmdlcyB0byB0aGlzIHBhZ2VcIixcbiAgICB9LFxuICAgIGZvb3Rlcjoge1xuICAgICAgY29weXJpZ2h0OiBgQ29weXJpZ2h0IFx1MDBBOSAyMDIzLSR7bmV3IERhdGUoKS5nZXRGdWxsWWVhcigpfSB1YnVnZWVlaWAsXG4gICAgICBtZXNzYWdlOiBcIlJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cIixcbiAgICB9LFxuICB9LFxufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy91YnVnZWVlaS9wcm9qZWN0cy9wZXJzb25hbC90eXBlc2NyaXB0L2NoaWJpLXZ1ZS9ib29rL29ubGluZS1ib29rLy52aXRlcHJlc3MvY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvdWJ1Z2VlZWkvcHJvamVjdHMvcGVyc29uYWwvdHlwZXNjcmlwdC9jaGliaS12dWUvYm9vay9vbmxpbmUtYm9vay8udml0ZXByZXNzL2NvbmZpZy9qYS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvdWJ1Z2VlZWkvcHJvamVjdHMvcGVyc29uYWwvdHlwZXNjcmlwdC9jaGliaS12dWUvYm9vay9vbmxpbmUtYm9vay8udml0ZXByZXNzL2NvbmZpZy9qYS50c1wiO2ltcG9ydCB7IERlZmF1bHRUaGVtZSwgTG9jYWxlU3BlY2lmaWNDb25maWcgfSBmcm9tIFwidml0ZXByZXNzXCI7XG5cbmV4cG9ydCBjb25zdCBqYUNvbmZpZzogTG9jYWxlU3BlY2lmaWNDb25maWc8RGVmYXVsdFRoZW1lLkNvbmZpZz4gPSB7XG4gIHRoZW1lQ29uZmlnOiB7XG4gICAgbmF2OiBbXG4gICAgICB7IHRleHQ6IFwiSG9tZVwiLCBsaW5rOiBcIi9cIiB9LFxuICAgICAgeyB0ZXh0OiBcIlN0YXJ0IExlYXJuaW5nXCIsIGxpbms6IFwiLzAwLWludHJvZHVjdGlvbi8wMTAtYWJvdXRcIiB9LFxuICAgIF0sXG4gICAgc2lkZWJhcjogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkdldHRpbmcgU3RhcnRlZFwiLFxuICAgICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogXCJcdTUyMURcdTMwODFcdTMwNkJcIiwgbGluazogXCIvMDAtaW50cm9kdWN0aW9uLzAxMC1hYm91dFwiIH0sXG4gICAgICAgICAgeyB0ZXh0OiBcIlZ1ZS5qc1x1MzA2OFx1MzA2RlwiLCBsaW5rOiBcIi8wMC1pbnRyb2R1Y3Rpb24vMDIwLXdoYXQtaXMtdnVlXCIgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIlZ1ZS5qc1x1MzA5Mlx1NjlDQlx1NjIxMFx1MzA1OVx1MzA4Qlx1NEUzQlx1ODk4MVx1MzA2QVx1ODk4MVx1N0QyMFwiLFxuICAgICAgICAgICAgbGluazogXCIvMDAtaW50cm9kdWN0aW9uLzAzMC12dWUtY29yZS1jb21wb25lbnRzXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1NjcyQ1x1NjZGOFx1MzA2RVx1OTAzMlx1MzA4MVx1NjVCOVx1MzA2OFx1NzRCMFx1NTg4M1x1NjlDQlx1N0JDOVwiLFxuICAgICAgICAgICAgbGluazogXCIvMDAtaW50cm9kdWN0aW9uLzA0MC1zZXR1cC1wcm9qZWN0XCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiTWluaW11bSBFeGFtcGxlXCIsXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJcdTUyMURcdTMwODFcdTMwNjZcdTMwNkVcdTMwRUNcdTMwRjNcdTMwQzBcdTMwRUFcdTMwRjNcdTMwQjBcdTMwNjhjcmVhdGVBcHAgQVBJXCIsXG4gICAgICAgICAgICBsaW5rOiBcIi8xMC1taW5pbXVtLWV4YW1wbGUvMDEwLWNyZWF0ZS1hcHAtYXBpXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIkhUTUxcdTg5ODFcdTdEMjBcdTMwOTJcdTMwRUNcdTMwRjNcdTMwQzBcdTMwRUFcdTMwRjNcdTMwQjBcdTMwNjdcdTMwNERcdTMwOEJcdTMwODhcdTMwNDZcdTMwNkJcdTMwNTdcdTMwODhcdTMwNDZcIixcbiAgICAgICAgICAgIGxpbms6IFwiLzEwLW1pbmltdW0tZXhhbXBsZS8wMjAtc2ltcGxlLWgtZnVuY3Rpb25cIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHU1QzBGXHUzMDU1XHUzMDQ0IHJlYWN0aXZpdHkgc3lzdGVtIFwiLFxuICAgICAgICAgICAgbGluazogXCIvMTAtbWluaW11bS1leGFtcGxlLzAzMC1taW5pbXVtLXJlYWN0aXZlXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1NUMwRlx1MzA1NVx1MzA0NCB2aXJ0dWFsIERPTVwiLFxuICAgICAgICAgICAgbGluazogXCIvMTAtbWluaW11bS1leGFtcGxlLzA0MC1taW5pbXVtLXZpcnR1YWwtZG9tXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1MzBCM1x1MzBGM1x1MzBERFx1MzBGQ1x1MzBDRFx1MzBGM1x1MzBDOFx1NjMwN1x1NTQxMVx1MzA2N1x1OTU4Qlx1NzY3QVx1MzA1N1x1MzA1Rlx1MzA0NFwiLFxuICAgICAgICAgICAgbGluazogXCIvMTAtbWluaW11bS1leGFtcGxlLzA1MC1taW5pbXVtLWNvbXBvbmVudFwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJcdTVDMEZcdTMwNTVcdTMwNDRcdTMwQzZcdTMwRjNcdTMwRDdcdTMwRUNcdTMwRkNcdTMwQzhcdTMwQjNcdTMwRjNcdTMwRDFcdTMwQTRcdTMwRTlcIixcbiAgICAgICAgICAgIGxpbms6IFwiLzEwLW1pbmltdW0tZXhhbXBsZS8wNjAtbWluaW11bS10ZW1wbGF0ZS1jb21waWxlclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJcdTMwODJcdTMwNjNcdTMwNjhcdTg5MDdcdTk2RDFcdTMwNkEgSFRNTCBcdTMwOTJcdTY2RjhcdTMwNERcdTMwNUZcdTMwNDRcIixcbiAgICAgICAgICAgIGxpbms6IFwiLzEwLW1pbmltdW0tZXhhbXBsZS8wNzAtbW9yZS1jb21wbGV4LXBhcnNlclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJcdTMwQzdcdTMwRkNcdTMwQkZcdTMwRDBcdTMwQTRcdTMwRjNcdTMwQzdcdTMwQTNcdTMwRjNcdTMwQjBcIixcbiAgICAgICAgICAgIGxpbms6IFwiLzEwLW1pbmltdW0tZXhhbXBsZS8wODAtdGVtcGxhdGUtYmluZGluZ1wiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJTRkMgXHUzMDY3XHU5NThCXHU3NjdBXHUzMDU3XHUzMDVGXHUzMDQ0XCIsXG4gICAgICAgICAgICBsaW5rOiBcIi8xMC1taW5pbXVtLWV4YW1wbGUvMDkwLW1pbmltdW0tc2ZjXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1MzA2MVx1MzA4N1x1MzA2M1x1MzA2OFx1NEUwMFx1NjA2RlwiLFxuICAgICAgICAgICAgbGluazogXCIvMTAtbWluaW11bS1leGFtcGxlLzEwMC1icmVha1wiLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkJhc2ljIFZpcnR1YWwgRE9NXCIsXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJrZXlcdTVDNUVcdTYwMjdcdTMwNjhcdTMwRDFcdTMwQzNcdTMwQzFcdTMwRUNcdTMwRjNcdTMwQzBcdTMwRUFcdTMwRjNcdTMwQjBcIixcbiAgICAgICAgICAgIGxpbms6IFwiLzIwLWJhc2ljLXZpcnR1YWwtZG9tLzAxMC1wYXRjaC1rZXllZC1jaGlsZHJlblwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJcdTMwRDNcdTMwQzNcdTMwQzhcdTMwNkJcdTMwODhcdTMwOEJWTm9kZVx1MzA2RVx1ODg2OFx1NzNGRVwiLFxuICAgICAgICAgICAgbGluazogXCIvMjAtYmFzaWMtdmlydHVhbC1kb20vMDIwLWJpdC1mbGFnc1wiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJcdTMwQjlcdTMwQjFcdTMwQjhcdTMwRTVcdTMwRkNcdTMwRTlcIixcbiAgICAgICAgICAgIGxpbms6IFwiLzIwLWJhc2ljLXZpcnR1YWwtZG9tLzAzMC1zY2hlZHVsZXJcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHU1QkZFXHU1RkRDXHUzMDY3XHUzMDREXHUzMDY2XHUzMDQ0XHUzMDZBXHUzMDQ0IFByb3BzIFx1MzA2RVx1MzBEMVx1MzBDM1x1MzBDMVwiLFxuICAgICAgICAgICAgbGluazogXCIvMjAtYmFzaWMtdmlydHVhbC1kb20vMDQwLXBhdGNoLW90aGVyLWF0dHJzXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiQmFzaWMgUmVhY3Rpdml0eSBTeXN0ZW1cIixcbiAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcInJlZiBhcGlcIixcbiAgICAgICAgICAgIGxpbms6IFwiLzMwLWJhc2ljLXJlYWN0aXZpdHktc3lzdGVtLzAxMC1yZWYtYXBpXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcImNvbXB1dGVkIC8gd2F0Y2ggYXBpXCIsXG4gICAgICAgICAgICBsaW5rOiBcIi8zMC1iYXNpYy1yZWFjdGl2aXR5LXN5c3RlbS8wMjAtY29tcHV0ZWQtd2F0Y2hcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHU2OUQ4XHUzMDA1XHUzMDZBIFJlYWN0aXZlIFByb3h5IEhhbmRsZXJcIixcbiAgICAgICAgICAgIGxpbms6IFwiLzMwLWJhc2ljLXJlYWN0aXZpdHktc3lzdGVtLzAzMC1yZWFjdGl2ZS1wcm94eS1oYW5kbGVyc1wiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJFZmZlY3QgXHUzMDZFXHUzMEFGXHUzMEVBXHUzMEZDXHUzMEYzXHUzMEEyXHUzMEMzXHUzMEQ3XHUzMDY4IEVmZmVjdCBTY29wZVwiLFxuICAgICAgICAgICAgbGluazogXCIvMzAtYmFzaWMtcmVhY3Rpdml0eS1zeXN0ZW0vMDQwLWVmZmVjdC1zY29wZVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJcdTMwNURcdTMwNkVcdTRFRDZcdTMwNkUgcmVhY3Rpdml0eSBhcGlcIixcbiAgICAgICAgICAgIGxpbms6IFwiLzMwLWJhc2ljLXJlYWN0aXZpdHktc3lzdGVtLzA1MC1vdGhlci1hcGlzXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiQmFzaWMgQ29tcG9uZW50IFN5c3RlbVwiLFxuICAgICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHUzMEU5XHUzMEE0XHUzMEQ1XHUzMEI1XHUzMEE0XHUzMEFGXHUzMEVCXHUzMEQ1XHUzMEMzXHUzMEFGXCIsXG4gICAgICAgICAgICBsaW5rOiBcIi80MC1iYXNpYy1jb21wb25lbnQtc3lzdGVtLzAxMC1saWZlY3ljbGUtaG9va3NcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiUHJvdmlkZS9JbmplY3RcIixcbiAgICAgICAgICAgIGxpbms6IFwiLzQwLWJhc2ljLWNvbXBvbmVudC1zeXN0ZW0vMDIwLXByb3ZpZGUtaW5qZWN0XCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1MzBCM1x1MzBGM1x1MzBERFx1MzBGQ1x1MzBDRFx1MzBGM1x1MzBDOFx1MzA2RSBQcm94eSBcdTMwNjggc2V0dXBDb250ZXh0XCIsXG4gICAgICAgICAgICBsaW5rOiBcIi80MC1iYXNpYy1jb21wb25lbnQtc3lzdGVtLzAzMC1jb21wb25lbnQtcHJveHktc2V0dXAtY29udGV4dFwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJcdTMwQjlcdTMwRURcdTMwQzNcdTMwQzhcIixcbiAgICAgICAgICAgIGxpbms6IFwiLzQwLWJhc2ljLWNvbXBvbmVudC1zeXN0ZW0vMDQwLWNvbXBvbmVudC1zbG90XCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIk9wdGlvbnMgQVBJXHUzMDZCXHU1QkZFXHU1RkRDXHUzMDU5XHUzMDhCXCIsXG4gICAgICAgICAgICBsaW5rOiBcIi80MC1iYXNpYy1jb21wb25lbnQtc3lzdGVtLzA1MC1vcHRpb25zLWFwaVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkJhc2ljIFRlbXBsYXRlIENvbXBpbGVyXCIsXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJUcmFuc2Zvcm1lciBcdTMwNkVcdTVCOUZcdTg4QzUgXHUzMDZFIENvZGVnZW4gXHUzMDZFXHUzMEVBXHUzMEQ1XHUzMEExXHUzMEFGXHUzMEJGXCIsXG4gICAgICAgICAgICBsaW5rOiBcIi81MC1iYXNpYy10ZW1wbGF0ZS1jb21waWxlci8wMTAtdHJhbnNmb3JtXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1MzBDN1x1MzBBM1x1MzBFQ1x1MzBBRlx1MzBDNlx1MzBBM1x1MzBENlx1MzA5Mlx1NUI5Rlx1ODhDNVx1MzA1N1x1MzA4OFx1MzA0NiAodi1iaW5kKVwiLFxuICAgICAgICAgICAgbGluazogXCIvNTAtYmFzaWMtdGVtcGxhdGUtY29tcGlsZXIvMDIwLXYtYmluZFwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJ2LW9uIFx1MzA2Qlx1NUJGRVx1NUZEQ1x1MzA1OVx1MzA4QlwiLFxuICAgICAgICAgICAgbGluazogXCIvNTAtYmFzaWMtdGVtcGxhdGUtY29tcGlsZXIvMDI1LXYtb25cIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiY29tcGlsZXItZG9tIFx1MzA2OFx1MzBBNFx1MzBEOVx1MzBGM1x1MzBDOFx1NEZFRVx1OThGRVx1NUI1MFwiLFxuICAgICAgICAgICAgbGluazogXCIvNTAtYmFzaWMtdGVtcGxhdGUtY29tcGlsZXIvMDI3LWV2ZW50LW1vZGlmaWVyXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIkZyYWdtZW50IFx1MzA2Qlx1NUJGRVx1NUZEQ1x1MzA1OVx1MzA4QlwiLFxuICAgICAgICAgICAgbGluazogXCIvNTAtYmFzaWMtdGVtcGxhdGUtY29tcGlsZXIvMDMwLWZyYWdtZW50XCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1MzBCM1x1MzBFMVx1MzBGM1x1MzBDOFx1MzBBMlx1MzBBNlx1MzBDOFx1MzA2Qlx1NUJGRVx1NUZEQ1x1MzA1OVx1MzA4QlwiLFxuICAgICAgICAgICAgbGluazogXCIvNTAtYmFzaWMtdGVtcGxhdGUtY29tcGlsZXIvMDM1LWNvbW1lbnRcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHVEODNEXHVERUE3IHYtaWYgXHUzMDY4XHU2OUNCXHU5MDIwXHU3Njg0XHUzMEM3XHUzMEEzXHUzMEVDXHUzMEFGXHUzMEM2XHUzMEEzXHUzMEQ2XCIsXG4gICAgICAgICAgICBsaW5rOiBcIi81MC1iYXNpYy10ZW1wbGF0ZS1jb21waWxlci8wMzAtdi1pZi1hbmQtc3RydWN0dXJhbC1kaXJlY3RpdmVcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHVEODNEXHVERUE3IHYtZm9yIFx1MzA2Qlx1NUJGRVx1NUZEQ1x1MzA1OVx1MzA4QlwiLFxuICAgICAgICAgICAgbGluazogXCIvNTAtYmFzaWMtdGVtcGxhdGUtY29tcGlsZXIvMDQwLXYtZm9yXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1RDgzRFx1REVBNyB2LW1vZGVsIFx1MzA2Qlx1NUJGRVx1NUZEQ1x1MzA1OVx1MzA4QlwiLFxuICAgICAgICAgICAgbGluazogXCIvNTAtYmFzaWMtdGVtcGxhdGUtY29tcGlsZXIvMDUwLXYtbW9kZWxcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHVEODNEXHVERUE3IFx1MzBCM1x1MzBGM1x1MzBERFx1MzBGQ1x1MzBDRFx1MzBGM1x1MzBDOFx1MzA5Mlx1ODlFM1x1NkM3QVx1MzA1OVx1MzA4QlwiLFxuICAgICAgICAgICAgbGluazogXCIvNTAtYmFzaWMtdGVtcGxhdGUtY29tcGlsZXIvMDYwLXYtbW9kZWxcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHVEODNEXHVERUE3IFx1MzBCOVx1MzBFRFx1MzBDM1x1MzBDOFx1MzA2Qlx1NUJGRVx1NUZEQ1x1MzA1OVx1MzA4QlwiLFxuICAgICAgICAgICAgbGluazogXCIvNTAtYmFzaWMtdGVtcGxhdGUtY29tcGlsZXIvMDcwLXNsb3RcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHVEODNEXHVERUE3IFx1MzBBQlx1MzBCOVx1MzBCRlx1MzBFMFx1MzBDN1x1MzBBM1x1MzBFQ1x1MzBBRlx1MzBDNlx1MzBBM1x1MzBENlwiLFxuICAgICAgICAgICAgbGluazogXCIvNTAtYmFzaWMtdGVtcGxhdGUtY29tcGlsZXIvMDgwLWN1c3RvbS1kaXJlY3RpdmVcIixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJcdUQ4M0RcdURFQTcgQmFzaWMgU0ZDIENvbXBpbGVyXCIsXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJcdUQ4M0RcdURFQTcgc2NyaXB0IHNldHVwIFx1MzA2Qlx1NUJGRVx1NUZEQ1x1MzA1OVx1MzA4QlwiLFxuICAgICAgICAgICAgbGluazogXCIvNjAtYmFzaWMtc2ZjLWNvbXBpbGVyLzAxMC1zY3JpcHQtc2V0dXBcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHVEODNEXHVERUE3IGRlZmluZVByb3BzIFx1MzA2Qlx1NUJGRVx1NUZEQ1x1MzA1OVx1MzA4QlwiLFxuICAgICAgICAgICAgbGluazogXCIvNjAtYmFzaWMtc2ZjLWNvbXBpbGVyLzAyMC1kZWZpbmUtcHJvcHNcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHVEODNEXHVERUE3IGRlZmluZUVtaXRzIFx1MzA2Qlx1NUJGRVx1NUZEQ1x1MzA1OVx1MzA4QlwiLFxuICAgICAgICAgICAgbGluazogXCIvNjAtYmFzaWMtc2ZjLWNvbXBpbGVyLzAzMC1kZWZpbmUtZW1pdHNcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHVEODNEXHVERUE3IFNjb3BlZCBDU1MgXHUzMDZCXHU1QkZFXHU1RkRDXHUzMDU5XHUzMDhCXCIsXG4gICAgICAgICAgICBsaW5rOiBcIi82MC1iYXNpYy1zZmMtY29tcGlsZXIvMDQwLXNjb3BlZC1jc3NcIixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJcdUQ4M0RcdURFQTcgV2ViIEFwcGxpY2F0aW9uIEVzc2VudGlhbHNcIixcbiAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1RDgzRFx1REVBNyBQbHVnaW5cIixcbiAgICAgICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogXCJcdUQ4M0RcdURFQTcgUm91dGVyXCIsXG4gICAgICAgICAgICAgICAgbGluazogXCIvOTAtd2ViLWFwcGxpY2F0aW9uLWVzc2VudGlhbHMvMDEwLXBsdWdpbnMvMDEwLXJvdXRlclwiLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogXCJcdUQ4M0RcdURFQTcgUHJlcHJvY2Vzc29yc1wiLFxuICAgICAgICAgICAgICAgIGxpbms6IFwiLzkwLXdlYi1hcHBsaWNhdGlvbi1lc3NlbnRpYWxzLzAxMC1wbHVnaW5zLzAyMC1wcmVwcm9jZXNzb3JzXCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJcdUQ4M0RcdURFQTcgU2VydmVyIFNpZGUgUmVuZGVyaW5nXCIsXG4gICAgICAgICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6IFwiXHVEODNEXHVERUE3IGNyZWF0ZVNTUkFwcFwiLFxuICAgICAgICAgICAgICAgIGxpbms6IFwiLzkwLXdlYi1hcHBsaWNhdGlvbi1lc3NlbnRpYWxzLzAyMC1zc3IvMDEwLWNyZWF0ZS1zc3ItYXBwXCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlx1RDgzRFx1REVBNyBoeWRyYXRpb25cIixcbiAgICAgICAgICAgICAgICBsaW5rOiBcIi85MC13ZWItYXBwbGljYXRpb24tZXNzZW50aWFscy8wMjAtc3NyLzAyMC1oeWRyYXRpb25cIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1RDgzRFx1REVBNyBCdWlsdGluc1wiLFxuICAgICAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlx1RDgzRFx1REVBNyBLZWVwQWxpdmVcIixcbiAgICAgICAgICAgICAgICBsaW5rOiBcIi85MC13ZWItYXBwbGljYXRpb24tZXNzZW50aWFscy8wMzAtYnVpbHRpbnMvMDEwLWtlZXAtYWxpdmVcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6IFwiXHVEODNEXHVERUE3IFN1c3BlbnNlXCIsXG4gICAgICAgICAgICAgICAgbGluazogXCIvOTAtd2ViLWFwcGxpY2F0aW9uLWVzc2VudGlhbHMvMDMwLWJ1aWx0aW5zLzAyMC1zdXNwZW5zZVwiLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogXCJcdUQ4M0RcdURFQTcgVHJhbnNpdGlvblwiLFxuICAgICAgICAgICAgICAgIGxpbms6IFwiLzkwLXdlYi1hcHBsaWNhdGlvbi1lc3NlbnRpYWxzLzAzMC1idWlsdGlucy8wMzAtdHJhbnNpdGlvblwiLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHVEODNEXHVERUE3IE9wdGltaXphdGlvbnNcIixcbiAgICAgICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogXCJcdUQ4M0RcdURFQTcgU3RhdGljIEhvaXN0aW5nXCIsXG4gICAgICAgICAgICAgICAgbGluazogXCIvOTAtd2ViLWFwcGxpY2F0aW9uLWVzc2VudGlhbHMvMDQwLW9wdGltaXphdGlvbnMvMDEwLXN0YXRpYy1ob2lzdGluZ1wiLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogXCJcdUQ4M0RcdURFQTcgUGF0Y2ggRmxhZ3NcIixcbiAgICAgICAgICAgICAgICBsaW5rOiBcIi85MC13ZWItYXBwbGljYXRpb24tZXNzZW50aWFscy8wNDAtb3B0aW1pemF0aW9ucy8wMjAtcGF0Y2gtZmxhZ3NcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6IFwiXHVEODNEXHVERUE3IFRyZWUgRmxhdHRlbmluZ1wiLFxuICAgICAgICAgICAgICAgIGxpbms6IFwiLzkwLXdlYi1hcHBsaWNhdGlvbi1lc3NlbnRpYWxzLzA0MC1vcHRpbWl6YXRpb25zLzAzMC10cmVlLWZsYXR0ZW5pbmdcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiXHU0RUQ4XHU5MzMyXCIsXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJjaGliaXZ1ZVx1MzAwMVx1MzBDN1x1MzBBQlx1MzA0Rlx1MzA2QVx1MzA0NFx1MzA2N1x1MzA1OVx1MzA0Qi4uLj9cIixcbiAgICAgICAgICAgIGxpbms6IFwiL2JvbnVzL2h5cGVyLXVsdGltYXRlLXN1cGVyLWV4dHJlbWUtbWluaW1hbC12dWUvXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIjE1IFx1NTIwNlx1MzA2NyBWdWUgXHUzMDkyXHU0RjVDXHUzMDhCXCIsXG4gICAgICAgICAgICBsaW5rOiBcIi9ib251cy9oeXBlci11bHRpbWF0ZS1zdXBlci1leHRyZW1lLW1pbmltYWwtdnVlLzE1LW1pbi1pbXBsXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbn07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy91YnVnZWVlaS9wcm9qZWN0cy9wZXJzb25hbC90eXBlc2NyaXB0L2NoaWJpLXZ1ZS9ib29rL29ubGluZS1ib29rLy52aXRlcHJlc3MvY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvdWJ1Z2VlZWkvcHJvamVjdHMvcGVyc29uYWwvdHlwZXNjcmlwdC9jaGliaS12dWUvYm9vay9vbmxpbmUtYm9vay8udml0ZXByZXNzL2NvbmZpZy9lbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvdWJ1Z2VlZWkvcHJvamVjdHMvcGVyc29uYWwvdHlwZXNjcmlwdC9jaGliaS12dWUvYm9vay9vbmxpbmUtYm9vay8udml0ZXByZXNzL2NvbmZpZy9lbi50c1wiO2ltcG9ydCB7IERlZmF1bHRUaGVtZSwgTG9jYWxlU3BlY2lmaWNDb25maWcgfSBmcm9tIFwidml0ZXByZXNzXCI7XG5cbmV4cG9ydCBjb25zdCBlbkNvbmZpZzogTG9jYWxlU3BlY2lmaWNDb25maWc8RGVmYXVsdFRoZW1lLkNvbmZpZz4gPSB7XG4gIHRoZW1lQ29uZmlnOiB7XG4gICAgbmF2OiBbXG4gICAgICB7IHRleHQ6IFwiSG9tZVwiLCBsaW5rOiBcIi9lbi9cIiB9LFxuICAgICAgeyB0ZXh0OiBcIlN0YXJ0IExlYXJuaW5nXCIsIGxpbms6IFwiL2VuLzAwLWludHJvZHVjdGlvbi8wMTAtYWJvdXRcIiB9LFxuICAgIF0sXG4gICAgc2lkZWJhcjogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkdldHRpbmcgU3RhcnRlZFwiLFxuICAgICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogXCJHZXR0aW5nIFN0YXJ0ZWRcIiwgbGluazogXCIvZW4vMDAtaW50cm9kdWN0aW9uLzAxMC1hYm91dFwiIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJXaGF0IGlzIFZ1ZS5qcz9cIixcbiAgICAgICAgICAgIGxpbms6IFwiL2VuLzAwLWludHJvZHVjdGlvbi8wMjAtd2hhdC1pcy12dWVcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiS2V5IEVsZW1lbnRzIG9mIFZ1ZS5qc1wiLFxuICAgICAgICAgICAgbGluazogXCIvZW4vMDAtaW50cm9kdWN0aW9uLzAzMC12dWUtY29yZS1jb21wb25lbnRzXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIkFwcHJvYWNoIGluIFRoaXMgQm9vayBhbmQgU2V0dGluZyBVcCB0aGUgRW52aXJvbm1lbnRcIixcbiAgICAgICAgICAgIGxpbms6IFwiL2VuLzAwLWludHJvZHVjdGlvbi8wNDAtc2V0dXAtcHJvamVjdFwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIk1pbmltdW0gRXhhbXBsZVwiLFxuICAgICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiRmlyc3QgUmVuZGVyaW5nIGFuZCB0aGUgY3JlYXRlQXBwIEFQSVwiLFxuICAgICAgICAgICAgbGluazogXCIvZW4vMTAtbWluaW11bS1leGFtcGxlLzAxMC1jcmVhdGUtYXBwLWFwaVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJMZXQncyBFbmFibGUgUmVuZGVyaW5nIEhUTUwgRWxlbWVudHNcIixcbiAgICAgICAgICAgIGxpbms6IFwiL2VuLzEwLW1pbmltdW0tZXhhbXBsZS8wMjAtc2ltcGxlLWgtZnVuY3Rpb25cIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiQSBMaWdodHdlaWdodCBSZWFjdGl2aXR5IFN5c3RlbVwiLFxuICAgICAgICAgICAgbGluazogXCIvZW4vMTAtbWluaW11bS1leGFtcGxlLzAzMC1taW5pbXVtLXJlYWN0aXZlXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIkEgTWluaW1hbCBWaXJ0dWFsIERPTVwiLFxuICAgICAgICAgICAgbGluazogXCIvZW4vMTAtbWluaW11bS1leGFtcGxlLzA0MC1taW5pbXVtLXZpcnR1YWwtZG9tXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIkFzcGlyaW5nIGZvciBDb21wb25lbnQtT3JpZW50ZWQgRGV2ZWxvcG1lbnRcIixcbiAgICAgICAgICAgIGxpbms6IFwiL2VuLzEwLW1pbmltdW0tZXhhbXBsZS8wNTAtbWluaW11bS1jb21wb25lbnRcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiQSBTaW1wbGUgVGVtcGxhdGUgQ29tcGlsZXJcIixcbiAgICAgICAgICAgIGxpbms6IFwiL2VuLzEwLW1pbmltdW0tZXhhbXBsZS8wNjAtbWluaW11bS10ZW1wbGF0ZS1jb21waWxlclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJEZXNpcmUgdG8gV3JpdGUgTW9yZSBDb21wbGV4IEhUTUxcIixcbiAgICAgICAgICAgIGxpbms6IFwiL2VuLzEwLW1pbmltdW0tZXhhbXBsZS8wNzAtbW9yZS1jb21wbGV4LXBhcnNlclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJEYXRhIEJpbmRpbmdcIixcbiAgICAgICAgICAgIGxpbms6IFwiL2VuLzEwLW1pbmltdW0tZXhhbXBsZS8wODAtdGVtcGxhdGUtYmluZGluZ1wiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJEZXNpcmUgdG8gRGV2ZWxvcCB3aXRoIFNpbmdsZSBGaWxlIENvbXBvbmVudHNcIixcbiAgICAgICAgICAgIGxpbms6IFwiL2VuLzEwLW1pbmltdW0tZXhhbXBsZS8wOTAtbWluaW11bS1zZmNcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiVGFraW5nIGEgU2hvcnQgQnJlYWtcIixcbiAgICAgICAgICAgIGxpbms6IFwiL2VuLzEwLW1pbmltdW0tZXhhbXBsZS8xMDAtYnJlYWtcIixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJcdUQ4M0RcdURFQTcgQmFzaWMgVmlydHVhbCBET01cIixcbiAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcImtleSBBdHRyaWJ1dGUgYW5kIFBhdGNoIFJlbmRlcmluZ1wiLFxuICAgICAgICAgICAgbGluazogXCIvZW4vMjAtYmFzaWMtdmlydHVhbC1kb20vMDEwLXBhdGNoLWtleWVkLWNoaWxkcmVuXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIkJpdC1MZXZlbCBSZXByZXNlbnRhdGlvbiBvZiBWTm9kZXNcIixcbiAgICAgICAgICAgIGxpbms6IFwiL2VuLzIwLWJhc2ljLXZpcnR1YWwtZG9tLzAyMC1iaXQtZmxhZ3NcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiU2NoZWR1bGVyXCIsXG4gICAgICAgICAgICBsaW5rOiBcIi9lbi8yMC1iYXNpYy12aXJ0dWFsLWRvbS8wMzAtc2NoZWR1bGVyXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIlBhdGNoIGZvciBVbmhhbmRsZWQgUHJvcHNcIixcbiAgICAgICAgICAgIGxpbms6IFwiL2VuLzIwLWJhc2ljLXZpcnR1YWwtZG9tLzA0MC1wYXRjaC1vdGhlci1hdHRyc1wiLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIlx1RDgzRFx1REVBNyBCYXNpYyBSZWFjdGl2aXR5IFN5c3RlbVwiLFxuICAgICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwicmVmIEFQSVwiLFxuICAgICAgICAgICAgbGluazogXCIvZW4vMzAtYmFzaWMtcmVhY3Rpdml0eS1zeXN0ZW0vMDEwLXJlZi1hcGlcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiY29tcHV0ZWQgLyB3YXRjaCBBUElcIixcbiAgICAgICAgICAgIGxpbms6IFwiL2VuLzMwLWJhc2ljLXJlYWN0aXZpdHktc3lzdGVtLzAyMC1jb21wdXRlZC13YXRjaFwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJWYXJpb3VzIFJlYWN0aXZlIFByb3h5IEhhbmRsZXJzXCIsXG4gICAgICAgICAgICBsaW5rOiBcIi9lbi8zMC1iYXNpYy1yZWFjdGl2aXR5LXN5c3RlbS8wMzAtcmVhY3RpdmUtcHJveHktaGFuZGxlcnNcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiRWZmZWN0IENsZWFudXAgYW5kIEVmZmVjdCBTY29wZVwiLFxuICAgICAgICAgICAgbGluazogXCIvZW4vMzAtYmFzaWMtcmVhY3Rpdml0eS1zeXN0ZW0vMDQwLWVmZmVjdC1zY29wZVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJPdGhlciBSZWFjdGl2aXR5IEFQSXNcIixcbiAgICAgICAgICAgIGxpbms6IFwiL2VuLzMwLWJhc2ljLXJlYWN0aXZpdHktc3lzdGVtLzA1MC1vdGhlci1hcGlzXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiXHVEODNEXHVERUE3IEJhc2ljIENvbXBvbmVudCBTeXN0ZW1cIixcbiAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIkxpZmVjeWNsZSBIb29rc1wiLFxuICAgICAgICAgICAgbGluazogXCIvZW4vNDAtYmFzaWMtY29tcG9uZW50LXN5c3RlbS8wMTAtbGlmZWN5Y2xlLWhvb2tzXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIlByb3ZpZGUvSW5qZWN0XCIsXG4gICAgICAgICAgICBsaW5rOiBcIi9lbi80MC1iYXNpYy1jb21wb25lbnQtc3lzdGVtLzAyMC1wcm92aWRlLWluamVjdFwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJDb21wb25lbnQgUHJveGllcyBhbmQgc2V0dXBDb250ZXh0XCIsXG4gICAgICAgICAgICBsaW5rOiBcIi9lbi80MC1iYXNpYy1jb21wb25lbnQtc3lzdGVtLzAzMC1jb21wb25lbnQtcHJveHktc2V0dXAtY29udGV4dFwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJTbG90c1wiLFxuICAgICAgICAgICAgbGluazogXCIvZW4vNDAtYmFzaWMtY29tcG9uZW50LXN5c3RlbS8wNDAtY29tcG9uZW50LXNsb3RcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiU3VwcG9ydGluZyBPcHRpb25zIEFQSVwiLFxuICAgICAgICAgICAgbGluazogXCIvZW4vNDAtYmFzaWMtY29tcG9uZW50LXN5c3RlbS8wNTAtb3B0aW9ucy1hcGlcIixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJcdUQ4M0RcdURFQTcgQmFzaWMgVGVtcGxhdGUgQ29tcGlsZXJcIixcbiAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIlJlZmFjdG9yaW5nIEltcGxlbWVudGF0aW9uIG9mIFRyYW5zZm9ybWVyIGZvciBDb2RlZ2VuXCIsXG4gICAgICAgICAgICBsaW5rOiBcIi9lbi81MC1iYXNpYy10ZW1wbGF0ZS1jb21waWxlci8wMTAtdHJhbnNmb3JtXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIkltcGxlbWVudGluZyBEaXJlY3RpdmVzICh2LWJpbmQpXCIsXG4gICAgICAgICAgICBsaW5rOiBcIi9lbi81MC1iYXNpYy10ZW1wbGF0ZS1jb21waWxlci8wMjAtdi1iaW5kXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIlN1cHBvcnRpbmcgdi1vblwiLFxuICAgICAgICAgICAgbGluazogXCIvZW4vNTAtYmFzaWMtdGVtcGxhdGUtY29tcGlsZXIvMDI1LXYtb25cIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiY29tcGlsZXItZG9tIGFuZCBFdmVudCBNb2RpZmllcnNcIixcbiAgICAgICAgICAgIGxpbms6IFwiL2VuLzUwLWJhc2ljLXRlbXBsYXRlLWNvbXBpbGVyLzAyNy1ldmVudC1tb2RpZmllclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJTdXBwb3J0IGZvciBGcmFnbWVudFwiLFxuICAgICAgICAgICAgbGluazogXCIvZW4vNTAtYmFzaWMtdGVtcGxhdGUtY29tcGlsZXIvMDMwLWZyYWdtZW50XCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1MzBCM1x1MzBFMVx1MzBGM1x1MzBDOFx1MzBBMlx1MzBBNlx1MzBDOFx1MzA2Qlx1NUJGRVx1NUZEQ1x1MzA1OVx1MzA4QlwiLFxuICAgICAgICAgICAgbGluazogXCIvNTAtYmFzaWMtdGVtcGxhdGUtY29tcGlsZXIvMDM1LWNvbW1lbnRcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwidi1pZiBhbmQgU3RydWN0dXJhbCBEaXJlY3RpdmVzXCIsXG4gICAgICAgICAgICBsaW5rOiBcIi9lbi81MC1iYXNpYy10ZW1wbGF0ZS1jb21waWxlci8wMzAtdi1pZi1hbmQtc3RydWN0dXJhbC1kaXJlY3RpdmVcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiU3VwcG9ydCBmb3Igdi1mb3JcIixcbiAgICAgICAgICAgIGxpbms6IFwiL2VuLzUwLWJhc2ljLXRlbXBsYXRlLWNvbXBpbGVyLzA0MC12LWZvclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJTdXBwb3J0IGZvciB2LW1vZGVsXCIsXG4gICAgICAgICAgICBsaW5rOiBcIi9lbi81MC1iYXNpYy10ZW1wbGF0ZS1jb21waWxlci8wNTAtdi1tb2RlbFwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJSZXNvbHZpbmcgQ29tcG9uZW50c1wiLFxuICAgICAgICAgICAgbGluazogXCIvZW4vNTAtYmFzaWMtdGVtcGxhdGUtY29tcGlsZXIvMDYwLXYtbW9kZWxcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiU3VwcG9ydCBmb3IgU2xvdFwiLFxuICAgICAgICAgICAgbGluazogXCIvZW4vNTAtYmFzaWMtdGVtcGxhdGUtY29tcGlsZXIvMDcwLXNsb3RcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiQ3VzdG9tIERpcmVjdGl2ZXNcIixcbiAgICAgICAgICAgIGxpbms6IFwiL2VuLzUwLWJhc2ljLXRlbXBsYXRlLWNvbXBpbGVyLzA4MC1jdXN0b20tZGlyZWN0aXZlXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiXHVEODNEXHVERUE3IEJhc2ljIFNGQyBDb21waWxlclwiLFxuICAgICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiU3VwcG9ydGluZyBzY3JpcHQgc2V0dXBcIixcbiAgICAgICAgICAgIGxpbms6IFwiL2VuLzYwLWJhc2ljLXNmYy1jb21waWxlci8wMTAtc2NyaXB0LXNldHVwXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIlN1cHBvcnRpbmcgZGVmaW5lUHJvcHNcIixcbiAgICAgICAgICAgIGxpbms6IFwiL2VuLzYwLWJhc2ljLXNmYy1jb21waWxlci8wMjAtZGVmaW5lLXByb3BzXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIlN1cHBvcnRpbmcgZGVmaW5lRW1pdHNcIixcbiAgICAgICAgICAgIGxpbms6IFwiL2VuLzYwLWJhc2ljLXNmYy1jb21waWxlci8wMzAtZGVmaW5lLWVtaXRzXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIlN1cHBvcnRpbmcgU2NvcGVkIENTU1wiLFxuICAgICAgICAgICAgbGluazogXCIvZW4vNjAtYmFzaWMtc2ZjLWNvbXBpbGVyLzA0MC1zY29wZWQtY3NzXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiXHVEODNEXHVERUE3IFdlYiBBcHBsaWNhdGlvbiBFc3NlbnRpYWxzXCIsXG4gICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJQbHVnaW5cIixcbiAgICAgICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogXCJSb3V0ZXJcIixcbiAgICAgICAgICAgICAgICBsaW5rOiBcImVuLy85MC13ZWItYXBwbGljYXRpb24tZXNzZW50aWFscy8wMTAtcGx1Z2lucy8wMTAtcm91dGVyXCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlByZXByb2Nlc3NvcnNcIixcbiAgICAgICAgICAgICAgICBsaW5rOiBcImVuLy85MC13ZWItYXBwbGljYXRpb24tZXNzZW50aWFscy8wMTAtcGx1Z2lucy8wMjAtcHJlcHJvY2Vzc29yc1wiLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogXCJTZXJ2ZXIgU2lkZSBSZW5kZXJpbmdcIixcbiAgICAgICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogXCJjcmVhdGVTU1JBcHBcIixcbiAgICAgICAgICAgICAgICBsaW5rOiBcImVuLy85MC13ZWItYXBwbGljYXRpb24tZXNzZW50aWFscy8wMjAtc3NyLzAxMC1jcmVhdGUtc3NyLWFwcFwiLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogXCJoeWRyYXRpb25cIixcbiAgICAgICAgICAgICAgICBsaW5rOiBcImVuLy85MC13ZWItYXBwbGljYXRpb24tZXNzZW50aWFscy8wMjAtc3NyLzAyMC1oeWRyYXRpb25cIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIlx1RDgzRFx1REVBNyBCdWlsdGluc1wiLFxuICAgICAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIktlZXBBbGl2ZVwiLFxuICAgICAgICAgICAgICAgIGxpbms6IFwiZW4vLzkwLXdlYi1hcHBsaWNhdGlvbi1lc3NlbnRpYWxzLzAzMC1idWlsdGlucy8wMTAta2VlcC1hbGl2ZVwiLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogXCJTdXNwZW5zZVwiLFxuICAgICAgICAgICAgICAgIGxpbms6IFwiZW4vLzkwLXdlYi1hcHBsaWNhdGlvbi1lc3NlbnRpYWxzLzAzMC1idWlsdGlucy8wMjAtc3VzcGVuc2VcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6IFwiVHJhbnNpdGlvblwiLFxuICAgICAgICAgICAgICAgIGxpbms6IFwiZW4vLzkwLXdlYi1hcHBsaWNhdGlvbi1lc3NlbnRpYWxzLzAzMC1idWlsdGlucy8wMzAtdHJhbnNpdGlvblwiLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IFwiXHVEODNEXHVERUE3IE9wdGltaXphdGlvbnNcIixcbiAgICAgICAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogXCJTdGF0aWMgSG9pc3RpbmdcIixcbiAgICAgICAgICAgICAgICBsaW5rOiBcImVuLy85MC13ZWItYXBwbGljYXRpb24tZXNzZW50aWFscy8wNDAtb3B0aW1pemF0aW9ucy8wMTAtc3RhdGljLWhvaXN0aW5nXCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlBhdGNoIEZsYWdzXCIsXG4gICAgICAgICAgICAgICAgbGluazogXCJlbi8vOTAtd2ViLWFwcGxpY2F0aW9uLWVzc2VudGlhbHMvMDQwLW9wdGltaXphdGlvbnMvMDIwLXBhdGNoLWZsYWdzXCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlRyZWUgRmxhdHRlbmluZ1wiLFxuICAgICAgICAgICAgICAgIGxpbms6IFwiZW4vLzkwLXdlYi1hcHBsaWNhdGlvbi1lc3NlbnRpYWxzLzA0MC1vcHRpbWl6YXRpb25zLzAzMC10cmVlLWZsYXR0ZW5pbmdcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiQXBwZW5kaXhcIixcbiAgICAgICAgY29sbGFwc2VkOiBmYWxzZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcImNoaWJpdnVlLCBpc24ndCBpdCBzbWFsbC4uLj9cIixcbiAgICAgICAgICAgIGxpbms6IFwiL2VuL2JvbnVzL2h5cGVyLXVsdGltYXRlLXN1cGVyLWV4dHJlbWUtbWluaW1hbC12dWUvXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiBcIldyaXRpbmcgVnVlLmpzIGluIDE1IG1pbnV0ZXMuXCIsXG4gICAgICAgICAgICBsaW5rOiBcIi9lbi9ib251cy9oeXBlci11bHRpbWF0ZS1zdXBlci1leHRyZW1lLW1pbmltYWwtdnVlLzE1LW1pbi1pbXBsLm1kXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWliLFNBQVMsZ0JBQUFBLHFCQUFvQjs7O0FDQTNCLFNBQVMsb0JBQW9CO0FBRXpjLElBQU0sZUFBZSxhQUFhO0FBQUEsRUFDdkMsT0FBTztBQUFBLEVBQ1AsWUFBWTtBQUFBLEVBQ1osYUFDRTtBQUFBLEVBQ0YsTUFBTTtBQUFBLEVBQ04sUUFBUTtBQUFBLEVBQ1IsWUFBWSxDQUFDLE9BQU87QUFBQSxFQUNwQixNQUFNO0FBQUEsSUFDSjtBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsUUFDRSxLQUFLO0FBQUEsUUFDTCxNQUFNO0FBQUEsTUFDUjtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBR0EsQ0FBQyxRQUFRLEVBQUUsVUFBVSxnQkFBZ0IsU0FBUyxXQUFXLENBQUM7QUFBQSxJQUMxRDtBQUFBLE1BQ0U7QUFBQSxNQUNBLEVBQUUsVUFBVSxVQUFVLFNBQVMsc0NBQXNDO0FBQUEsSUFDdkU7QUFBQSxJQUNBLENBQUMsUUFBUSxFQUFFLFVBQVUsWUFBWSxTQUFTLFdBQVcsQ0FBQztBQUFBLElBQ3REO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxRQUNFLFVBQVU7QUFBQSxRQUNWLFNBQ0U7QUFBQSxNQUNKO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFO0FBQUEsTUFDQTtBQUFBLFFBQ0UsVUFBVTtBQUFBLFFBQ1YsU0FDRTtBQUFBLE1BQ0o7QUFBQSxJQUNGO0FBQUEsSUFDQSxDQUFDLFFBQVEsRUFBRSxVQUFVLGdCQUFnQixTQUFTLFdBQVcsQ0FBQztBQUFBLElBQzFELENBQUMsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLFNBQVMsV0FBVyxDQUFDO0FBQUEsSUFDdEQsQ0FBQyxRQUFRLEVBQUUsTUFBTSxnQkFBZ0Is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QUNOLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFVBQ1I7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLFdBQVc7QUFBQSxRQUNYLE9BQU87QUFBQSxVQUNMO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxVQUNSO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixXQUFXO0FBQUEsUUFDWCxPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUEsVUFDUjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sV0FBVztBQUFBLFFBQ1gsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUEsVUFDUjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sV0FBVztBQUFBLFFBQ1gsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxVQUNSO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixXQUFXO0FBQUEsUUFDWCxPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sV0FBVztBQUFBLFlBQ1gsT0FBTztB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VUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUEsVUFDUjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sV0FBVztBQUFBLFFBQ1gsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxVQUNSO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixXQUFXO0FBQUEsUUFDWCxPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUEsVUFDUjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sV0FBVztBQUFBLFFBQ1gsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFVBQ1I7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLFdBQVc7QUFBQSxRQUNYLE9BQU87QUFBQSxVQUNMO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sTUFBTTtBQUFBLFVBQ1I7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07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

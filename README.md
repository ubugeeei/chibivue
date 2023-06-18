# chibivue

chibivue is minimal [Vue.js v3](https://github.com/vuejs/core) core implementations (reactivity, vnode, component, compiler).

"chibi" means "small" in Japanese.

This project began in February 2023 with the goal of simplifying the understanding of Vue's core implementation.

Currently, I am still in the process of implementation, but after implementation, I intend to post explanatory articles as well.

(For now, I plan to post Japanese first.)

[example](https://github.com/Ubugeeei/chibivue/tree/main/example/app)

# Online Book

### [English](https://github.com/Ubugeeei/chibivue/tree/main/books/english) | [Japanese](https://github.com/Ubugeeei/chibivue/tree/main/books/japanese)

<br/>
<br/>

# status

## Reactive System

| feature       | impl | book |
| ------------- | ---- | ---- |
| reactive      | ✅   | ✅   |
| ref           | ✅   | ✅   |
| computed      | ✅   | ✅   |
| shallowRef    | ✅   | ✅   |
| triggerRef    | ✅   | ✅   |
| toRef         | ✅   | ✅   |
| toRefs        | ✅   | ✅   |
| watch         | ✅   | ✅   |
| watchEffect   | ✅   | ✅   |
| effectScope   | ✅   |      |
| template refs |      |      |

## Virtual Dom & Renderer

| feature         | impl | book |
| --------------- | ---- | ---- |
| h function      | ✅   | ✅   |
| patch rendering | ✅   | ✅   |
| key attribute   | ✅   | ✅   |
| scheduler       | ✅   | ✅   |
| nextTick        | ✅   | ✅   |
| ssr             |      |      |

## Component System

| feature          | impl | book |
| ---------------- | ---- | ---- |
| Options API      | ✅   |      |
| Composition API  | ✅   | ✅   |
| lifecycle hooks  | ✅   |      |
| props / emit     | ✅   | ✅   |
| provide / inject | ✅   |      |
| use plugin       | ✅   |      |
| slot (default)   |      |      |
| slot (named)     |      |      |
| slot (scoped)    |      |      |

## Template Compiler

| feature  | impl | book |
| -------- | ---- | ---- |
| v-on     | ✅   |      |
| v-bind   | ✅   |      |
| v-for    | ✅   |      |
| v-model  | ✅   |      |
| v-if     |      |      |
| v-show   |      |      |
| mustache | ✅   |      |
|          |      |      |

## SFC Compiler

| feature                          | impl | book |
| -------------------------------- | ---- | ---- |
| basics (template, script, style) | ✅   | ✅   |
| scoped css                       |      |      |
| script setup                     | ✅   |      |
| compiler macro                   | ✅   |      |

## Extensions and Other Builtin

| feature    | impl | book |
| ---------- | ---- | ---- |
| store      | ✅   |      |
| router     | ✅   |      |
| keep-alive |      |      |
| suspense   |      |      |

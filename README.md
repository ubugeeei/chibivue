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

## status

- ✅ Reactive System
  - ✅ reactive
  - ✅ ref
  - ✅ shallowRef
  - ✅ triggerRef
  - ✅ computed
- ✅ Virtual Dom & Renderer
  - ✅ h function
  - ✅ patch rendering
  - ✅ scheduler
- ✅ Component
  - ✅ API
    - ✅ Options API
    - ✅ Composition API
  - ✅ lifecycle hooks
    - ✅ mounted
  - ✅ props / emit
  - ✅ provide / inject
  - ✅ use plugin
- Template Compiler
  - ✅ directives
    - ✅ v-on
    - ✅ v-for
    - ✅ v-model
    - v-if
  - ✅ mustache
- ✅ Extensions
  - ✅ sfc compiler (vite plugin)
    - ✅ basic
    - ✅ script setup
      - ✅ basic
      - ✅ defineProps / defineEmits
    - ✅ style block
  - ✅ store
  - ✅ router

# Vue.js Repository

Vue.js can be found in this repository:  
https://github.com/vuejs/core

Actually, this is the repository for v3, and v2 and earlier versions can be found in a separate repository:  
https://github.com/vuejs/vue

As a prerequisite, we will be using the core repository (v3) for explanation.

# Key Components of Vue.js

First, let's grasp the overall picture of Vue.js implementation. There is a markdown file about contributing to the Vue.js repository, so if you have the capacity, you can find various information about the structure there. (Well, you don't have to look at it)

https://github.com/vuejs/core/blob/main/.github/contributing.md

In a nutshell, Vue.js has the following key components:

## Runtime

The runtime refers to all parts that affect actual operation, such as rendering and component state management. It covers all parts of a Vue.js-developed web application running in a browser or on a server (in the case of SSR). Specifically, it includes the following elements (each will be explained in detail in their respective chapters):

### Component System

Vue.js is a component-oriented framework. You can create maintainable components according to each user's requirements and perform encapsulation and reuse. It also provides state sharing between components (props/emits or provide/inject, etc.) and lifecycle hooks.

### Reactive System

"Reactivity" can be translated as "reactiveness" in Japanese. It tracks the state held by components and updates the screen when changes occur. This process of tracking and reacting is called reactiveness.

```ts
import { ref } from "vue";

const count = ref(0);

// When this function is executed, the screen displaying the count will also be updated
const increment = () => {
  count.value++;
};
```

(When you think about it, it's strange that the screen is updated even though you're just changing the value.)

### Virtual DOM System

The virtual DOM system is another powerful system in Vue.js. The virtual DOM defines JavaScript objects that mimic the DOM on the JS runtime and considers them as the current DOM. When updating, it compares the current virtual DOM with the new virtual DOM and applies the differences to the real DOM. This will be explained in detail in a dedicated chapter.

## Compiler

The compiler is responsible for converting the developer interface and internal implementation. In this context, the "developer interface" refers to the boundary between "developers who actually use Vue.js to develop web applications" and "Vue's internal implementation". Specifically, you can think of the compiler as a feature in Vue.js that converts the implementation you usually write with Vue into a format that can be handled internally.

When developing with Vue.js, you may notice parts that are clearly not JavaScript, such as template directives and Single File Components. These notations (syntax) are provided by Vue.js, and there is a function to convert them into JavaScript-only notation. This function is used only during the development stage and is not part of the actual operation of a web application (it only serves to compile JavaScript code).

This compiler is divided into two main sections:

### Template Compiler

As the name suggests, this is the compiler for the template part. Specifically, it includes directives such as v-if and v-on, user component notation (writing original tags like <Counter />), and slot functionality.

### SFC Compiler

As the name suggests, this is the compiler for Single File Components. It is a feature for writing component templates, scripts, and styles in a single file with a .vue extension. The defineComponent and defineProps functions used in script setup are also provided by this compiler (to be discussed later).

This SFC compiler is actually

[prev](https://github.com/Ubugeeei/chibivue/blob/main/books/english/02_what_is_vue.md) | [next](https://github.com/Ubugeeei/chibivue/blob/main/books/english/04_setup_project.md)

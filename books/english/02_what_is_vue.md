# Vue.js Recap

Let's dive right into the main topic.  
But first, let's quickly recap Vue.js.

## What is Vue.js again?

Vue.js is a "friendly, performant, and versatile framework for building web user interfaces."  
This description comes from the official documentation's homepage.  
I think it's easier to understand by quoting the official words directly rather than adding my own interpretation, so I'll quote it below:

> Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. It is designed from the ground up to be incrementally adoptable, and can easily scale between a library and a full-featured framework depending on your use case. Vue provides a simple, component-based declarative programming model built on top of standard HTML, CSS, and JavaScript. It is a framework for efficiently building user interfaces, from simple to complex.

> Declarative Rendering: In Vue, you can declaratively describe the output of your HTML using an extended template syntax. This output is based on the state of your JavaScript.

> Reactivity: Vue automatically tracks changes to JavaScript state and efficiently updates the DOM when changes occur.

> A minimal example looks like this:

> ```ts
> import { createApp } from "vue";
>
> createApp({
>   data() {
>     return {
>       count: 0,
>     };
>   },
> }).mount("#app");
> ```
>
> ```html
> <div id="app">
>   <button @click="count++">Count is: {{ count }}</button>
> </div>
> ```

[Source](https://ja.vuejs.org/guide/introduction.html#what-is-vue)

We'll go into more detail on declarative rendering and reactivity in chapters dedicated to explaining them, so for now, a high-level understanding is sufficient.

Also, the term "framework" is used here, and Vue.js claims to be a "progressive framework." The most concise, accurate, and easy-to-understand reference for this can be found in the documentation:

https://vuejs.org/guide/introduction.html#the-progressive-framework

# The Difference Between the Official Documentation and This Book

In the official documentation, the focus is on "how to use Vue.js" with an abundance of tutorials and guides.

However, in this book, we'll change the focus to "how Vue.js is implemented" and actually write code while creating a small Vue.js instance.

Also, this book is not an official one and may not be perfect. There might be some inaccuracies or mistakes, so please feel free to point them out as you come across them.

[prev](https://github.com/Ubugeeei/chibivue/blob/main/books/english/01_about.md) | [next](https://github.com/Ubugeeei/chibivue/blob/main/books/english/03_vue_core_components.md)

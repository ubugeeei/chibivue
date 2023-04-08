# Developer Interface of Vue.js

## Where to begin? 🤔

Now, let's start implementing chibivue one step at a time.
How should we go about implementing it?

When creating your own software based on an existing one, the author always keeps in mind to first think about how to use that software.  
From now on, we'll call this "software's actual usage interface" the "developer interface" for convenience.  
The "developer" referred to here is not the developer of chibivue, but the person who develops a web application using chibivue.  
In other words, we'll refer to the developer interface of the original Vue.js while developing chibivue.  
Specifically, we'll look at what to write first when developing a web application with Vue.js.

## Levels of Developer Interface? 🤔

What we need to be careful about here is that Vue.js has multiple developer interfaces, and each has a different level.  
By "level," we mean "how close it is to raw JavaScript."  
For example, there are several ways to display HTML with Vue's developer interface, such as:

1. Write a template in Single File Component

```vue
<!-- App.vue -->
<template>
  <div>Hello world.</div>
</template>
```

```ts
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.mount("#app");
```

2. Use the template option

```ts
import { createApp } from "vue";

const app = createApp({
  template: "<div>Hello world.</div>",
});

app.mount("#app");
```

3. Use the render option and h function

```ts
import { createApp, h } from "vue";

const app = createApp({
  render() {
    return h("div", {}, ["Hello world."]);
  },
});

app.mount("#app");
```

Let's think about these three developer interfaces, among others.  
Which one is the closest to raw JavaScript?  
The answer is 3, "using the render option and h function."  
1 requires the implementation of an SFC compiler and bundler, while 2 requires the HTML passed to the template to be compiled (converting it into JS code, as it won't work as is).

For convenience, we'll call the one closer to raw JS the "lower-level developer interface."  
The important thing is to start implementing from the lower level when you start.  
The reason is that in most cases, higher-level notations are converted to lower-level notations and run.  
In other words, both 1 and 2 are ultimately converted internally to the form of 3.  
This conversion implementation is called the "compiler."

So, let's start implementing with the developer interface like 3 in mind!

# createApp API and Rendering

## Approach

Although we aim for the form of 3, we don't know much about the h function yet, and after all, this book is aiming for incremental development, so instead of aiming for the form of 3 right away, let's try implementing it in the following way, where the render function just returns a message and displays it.

Image ↓

```ts
import { createApp } from "vue";

const app = createApp({
  render() {
    return "Hello world.";
  },
});

app.mount("#app");
```

## Let's start implementing

Let's create the createApp function in `~/packages/index.ts`.  
※ You can remove helloChibivue, as it's not needed.

```ts
export type Options = {
  render: () => string;
};

export type App = {
  mount: (selector: string) => void;
};

export const createApp = (options: Options): App => {
  return {
    mount: (selector) => {
      const root = document.querySelector(selector);
      if (root) {
        root.innerHTML = options.render();
      }
    },
  };
};
```

Very simple, right? Let's try it out in the playground.

`~/examples/playground/src/main.ts`

```ts
import { createApp } from "chibivue";

const app = createApp({
  render() {
    return "Hello world.";
  },
});

app.mount("#app");
```

We were able to display the message on the screen! Great job!

![hello_createApp](https://raw.githubusercontent.com/Ubugeeei/chibivue/main/books/images/hello_createApp.png)

Source code up to this point:

https://github.com/Ubugeeei/chibivue/tree/main/books/chapter_codes/02-1_create_app

## Refactoring

You might be thinking, "What? We're refactoring already even though we've only implemented so little?" One of the goals of this book is to help you understand the Vue.js source code.  
To do this, we want to be constantly aware of Vue.js's file and directory structure. So, please allow me to refactor a little bit.

## Vue.js Design

### runtime-core and runtime-dom

Here's a brief explanation of the structure of the official Vue.js repository. We will create two directories called runtime-core and runtime-dom during this refactoring.

What are these directories? The runtime-core contains the core features of Vue.js's runtime. It might be difficult to understand what's considered core and what's not at this point.

So, it's easier to understand the relationship between them by looking at runtime-dom. As the name suggests, the runtime-dom directory contains implementations that depend on the DOM.  
Roughly speaking, it handles "browser-dependent processes." Examples include querySelector and createElement, as well as other DOM operations.

In runtime-core, such processes are not written, and the design focuses on describing the core logic of Vue.js's runtime within the pure TypeScript world. Examples include the implementation of virtual DOM, components, etc.  
As the development of chibivue progresses, these aspects will become clearer, so if you don't understand, simply refactor according to the book for now.

### Roles and Dependencies of Each File

We will create several files in runtime-core and runtime-dom. The necessary files are as follows:

```sh
pwd # ~
mkdir packages/runtime-core
mkdir packages/runtime-dom

# core
touch packages/runtime-core/index.ts
touch packages/runtime-core/apiCreateApp.ts
touch packages/runtime-core/component.ts
touch packages/runtime-core/componentOptions.ts
touch packages/runtime-core/renderer.ts

# dom
touch packages/runtime-dom/index.ts
touch packages/runtime-dom/nodeOps.ts
```

It might be difficult to understand their roles by explaining them in text, so please refer to the following diagram:

![refactor_createApp!](https://raw.githubusercontent.com/Ubugeeei/chibivue/main/books/images/refactor_createApp.png)

#### Renderer Design

As mentioned earlier, Vue.js separates the parts that depend on the DOM and the core features of Vue.js.  
First, let's focus on the renderer factory in runtime-core and the node-ops in runtime-dom.  
In the previous implementation, the mount method of the app returned by createApp directly rendered.

```ts
// This is the code from before
export const createApp = (options: Options): App => {
  return {
    mount: (selector) => {
      const root = document.querySelector(selector);
      if (root) {
        root.innerHTML = options.render(); // Rendering
      }
    },
  };
};
```

At this point, there is not much code, and it's not complicated, so it might seem like there's no problem.  
However, as we move forward, we will need to write more complex logic, such as virtual DOM patch rendering.  
In Vue.js, this rendering responsibility is extracted into a renderer. This is runtime-core/renderer.ts.

When it comes to rendering in an SPA, it's easy to imagine that it depends on browser DOM APIs (e.g., creating elements or setting text).  
To separate this DOM-dependent part from the core rendering logic of Vue.js, several techniques are used, as follows:

- Implement an object for DOM operations in `runtime-dom/nodeOps`
- In `runtime-core/renderer`, implement a factory function that creates an object containing only render logic.  
  In doing so, receive the object for handling Node (not limited to DOM) as an argument of the factory function.  
  This allows the rendering logic to be written without directly depending on the DOM APIs.
- Complete renderer based on nodeOps and renderer factories in `runtime-dom/index.ts`.

So far, we have discussed the part surrounded by red in the figure.
![refactor_createApp_render](https://raw.githubusercontent.com/Ubugeeei/chibivue/main/books/images/refactor_createApp_render.png)

Let's explain the source code. At this point, we have not yet implemented the virtual DOM rendering function, so we will create the same function as before.

First, implement the interface for the Node (not limited to DOM) operation object in `runtime-core/renderer`.

```ts
export interface RendererOptions<HostNode = RendererNode> {
  setElementText(node: HostNode, text: string): void;
}

export interface RendererNode {
  [key: string]: any;
}

export interface RendererElement extends RendererNode {}
```

For now, there is only a `setElementText` function, but it's fine if you can imagine that functions like `createElement` and `removeChild` will be implemented in the future.

Do not worry about RendererNode and RendererElement for now (the implementation here must not depend on the DOM, so it defines something that can be a Node and makes it generic).  
Implement a renderer factory in this file that receives this RendererOptions.

```ts
export type RootRenderFunction<HostElement = RendererElement> = (
  message: string,
  container: HostElement
) => void;

export function createRenderer(options: RendererOptions) {
  const { setElementText: hostSetElementText } = options;

  const render: RootRenderFunction = (message, container) => {
    hostSetElementText(container, message); // Since we only insert a message this time, the implementation is like this
  };

  return { render };
}
```

Next is the implementation on the `runtime-dom/nodeOps` side.

```ts
import { RendererOptions } from "../runtime-core";

export const nodeOps: RendererOptions<Node> = {
  setElementText(node, text) {
    node.textContent = text;
  },
};
```

I don't think there's anything particularly difficult.

Now let's complete the renderer in `runtime-dom/index.ts`.

```ts
import { createRenderer } from "../runtime-core";
import { nodeOps } from "./nodeOps";

const { render } = createRenderer(nodeOps);
```

This completes the renderer part of the refactoring.

#### DI and DIP

We have looked at the renderer's design. To summarize again,

- Implement a factory function to create a renderer in runtime-core/renderer
- Implement an object for DOM-dependent operations in runtime-dom/nodeOps
- Create a renderer by combining the factory function and nodeOps in runtime-dom/index

This is how it was done.  
In general, this design is called "DI" using "DIP".  
First, let's talk about DIP. DIP (Dependency inversion principle) is to invert dependencies by implementing interfaces.  
The point to pay attention to is the RendererOptions interface implemented in renderer.ts.  
Both the factory function and nodeOps are implemented to comply with this RendererOptions (make them dependent on the RendererOptions interface).  
Using this, perform DI. DI (Dependency Injection) is a technique to reduce dependency by injecting an object that a certain object depends on from the outside.  
In this case, the renderer depends on RendererOptions (an object that implements RendererOptions (in this case, nodeOps)).  
This dependency is not directly called and implemented from the renderer, but is received as an argument of the factory (injected from the outside).  
These techniques are used to devise ways to make the renderer not dependent on the DOM.

DI and DIP may be difficult concepts if you are not familiar with them, but they are important techniques that often come up, so it would be great if you could research and understand them on your own.

#### Completing createApp

Returning to the implementation, since the renderer has been generated, all that remains is to consider the red area in the following figure.

![refactor_createApp_createApp](https://raw.githubusercontent.com/Ubugeeei/chibivue/main/books/images/refactor_createApp_createApp.png)

Having said that, all we need to do is simply implement the createApp factory function so that it can pass the renderer we just created.

```ts
// ~/packages/runtime-core apiCreateApp.ts

import { Component } from "./component";
import { RootRenderFunction } from "./renderer";

export interface App<HostElement = any> {
  mount(rootContainer: HostElement | string): void;
}

export type CreateAppFunction<HostElement> = (
  rootComponent: Component
) => App<HostElement>;

export function createAppAPI<HostElement>(
  render: RootRenderFunction<HostElement>
): CreateAppFunction<HostElement> {
  return function createApp(rootComponent) {
    const app: App = {
      mount(rootContainer: HostElement) {
        const message = rootComponent.render!();
        render(message, rootContainer);
      },
    };

    return app;
  };
}
```

```ts
// ~/packages/runtime-dom/index.ts

import {
  CreateAppFunction,
  createAppAPI,
  createRenderer,
} from "../runtime-core";
import { nodeOps } from "./nodeOps";

const { render } = createRenderer(nodeOps);
const _createApp = createAppAPI(render);

export const createApp = ((...args) => {
  const app = _createApp(...args);
  const { mount } = app;
  app.mount = (selector: string) => {
    const container = document.querySelector(selector);
    if (!container) return;
    mount(container);
  };

  return app;
}) as CreateAppFunction<Element>;
```

Some types have been moved to ~/packages/runtime-core/component.ts, but that is not very important, so please refer to the source code (it's just following the official Vue.js code).

Now that we've gotten closer to the official Vue.js source code, let's check the operation. If the message is still displayed, it is OK.

The source code so far:

https://github.com/Ubugeeei/chibivue/tree/main/books/chapter_codes/02-2_create_app

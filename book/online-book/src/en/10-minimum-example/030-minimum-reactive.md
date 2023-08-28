# Small reactivity system

## Developer interface we aim for this time

Now let's talk about the essence of Vue.js, which is the reactivity system.  
The previous implementation, although it looks similar to Vue.js, is not actually Vue.js in terms of functionality.  
I simply implemented the initial developer interface and made it possible to display various HTML.

However, as it is now, once the screen is rendered, it remains the same, and it becomes just a static site as a web application.  
From now on, we will add state to build a richer UI, and update the rendering when the state changes.

First, let's think about what kind of developer interface it will be, as usual.  
How about something like this?

```ts
import { createApp, h, reactive } from "chibivue";

const app = createApp({
  setup() {
    const state = reactive({ count: 0 });

    const increment = () => {
      state.count++;
    };

    return () =>
      h("div", { id: "my-app" }, [
        h("p", {}, [`count: ${state.count}`]),
        h("button", { onClick: increment }, ["increment"]),
      ]);
  },
});

app.mount("#app");
```

If you are used to developing with Single File Components (SFC), this may look a little unfamiliar.  
This is a developer interface that defines state in the setup option and returns a render function.  
In fact, Vue.js has such notation.

https://vuejs.org/api/composition-api-setup.html#usage-with-render-functions

We define the state using the reactive function and implement the increment function that modifies it, and bind it to the click event of the button.  
To summarize what we want to do:

- Execute the setup function to obtain the function for getting the vnode from the return value
- Make the object passed to the reactive function reactive
- When the button is clicked, the state is updated
- Track the state update, re-execute the render function, and redraw the screen

## What is the reactivity system?

Now, let's review what reactivity is.  
Let's refer to the official documentation.

> A reactive object is a JavaScript Proxy that behaves like a normal object, with the difference that Vue can track property access and changes on reactive objects.

[Source](https://v3.vuejs.org/guide/reactivity-fundamentals.html)

> One of Vue's most distinctive features is its modest reactivity system. The state of a component is composed of reactive JavaScript objects. When the state changes, the view is updated.

[Source](https://v3.vuejs.org/guide/reactivity-in-depth.html)

In summary, "a reactive object is one that updates the screen when changes occur".  
Let's put aside how to implement this for now and try to implement the developer interface mentioned earlier.

## Implementation of the setup function

It's very easy to do.  
We receive the setup option as an argument and execute it, and then we can use it just like the render option we have used so far.

Edit ~/packages/runtime-core/componentOptions.ts.

```ts
export type ComponentOptions = {
  render?: Function;
  setup?: () => Function; // Add this
};
```

Then use it.

```ts
// createAppAPI

const app: App = {
  mount(rootContainer: HostElement) {
    const componentRender = rootComponent.setup!();

    const updateComponent = () => {
      const vnode = componentRender();
      render(vnode, rootContainer);
    };

    updateComponent();
  },
};
```

```ts
// playground

import { createApp, h } from "chibivue";

const app = createApp({
  setup() {
    // Define state here in the future
    // const state = reactive({ count: 0 })

    return function render() {
      return h("div", { id: "my-app" }, [
        h("p", { style: "color: red; font-weight: bold;" }, ["Hello world."]),
        h(
          "button",
          {
            onClick() {
              alert("Hello world!");
            },
          },
          ["click me!"]
        ),
      ]);
    };
  },
});

app.mount("#app");
```

Well, that's it.  
In practice, we want to execute this `updateComponent` when the state is changed.

## Implementation of a small reactivity system

This is the main theme of this time. Somehow, we want to execute `updateComponent` when the state is changed.  
The key to this is the following two:

- Proxy object
- Observer pattern

The reactivity system is implemented by combining these two.

First, let's explain each of them, not how to implement the reactivity system.

## Proxy object

https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Proxy

The Proxy object is a very interesting object.

You can use it by passing an object as an argument and using `new`.

```ts
const o = new Proxy({ value: 1 });
console.log(o.value); // 1
```

In this example, `o` behaves almost the same as a normal object.

What's interesting is that the Proxy object can take a second argument and register a handler.  
This handler is a handler for object operations. Take a look at the following example.

```ts
const o = new Proxy(
  { value: 1, value2: 2 },

  {
    get(target, key, receiver) {
      console.log(`target:${target}, key: ${key}`);
      return target[key];
    },
  }
);
```

In this example, we write settings for the object to be generated.  
Specifically, when accessing (get) the properties of this object, the original object (target) and the accessed key name will be output to the console.  
Let's check the behavior in a browser or something.

![proxy_get](https://raw.githubusercontent.com/Ubugeeei/chibivue/main/book/images/proxy_get.png)

You can see that the set processing is executed when reading the value from the property of the object generated by this Proxy.

Similarly, you can also set it for set.

```ts
const o = new Proxy(
  { value: 1, value2: 2 },
  {
    set(target, key, value, receiver) {
      console.log("hello from setter");
      target[key] = value;
      return true;
    },
  }
);
```

![proxy_set](https://raw.githubusercontent.com/Ubugeeei/chibivue/main/book/images/proxy_set.png)

This is enough to understand the Proxy.

## Observer Pattern

The Observer Pattern is a type of design pattern.

https://en.wikipedia.org/wiki/Observer_pattern

The Observer Pattern is a design pattern used to notify other objects of events in a certain object. It involves the use of the Observer and Subject. Instead of explaining it in words, I will provide a code-based explanation below.

Observer is an interface for the objects that receive notifications. This interface has a method called `update`.

```ts
interface Observer {
  update(): void;
}
```

Subject is an interface for the objects that send notifications. This interface has methods called `observe`, `forget`, and `notify`.

```ts
interface Subject {
  observe(obs: Observer): void;
  forget(obs: Observer): void;
  notify(): void;
}
```

And they are implemented like this:

```ts
class O implements Observer {
  update() {
    console.log("event received!");
  }
}

class S implements Subject {
  private observers: Observer[] = [];

  observe(obs: Observer) {
    this.observers.push(obs);
  }

  forget() {
    this.observers = this.observers.filter((it) => it !== obs);
  }

  notify() {
    this.observers.forEach((it) => it.update());
  }
}
```

You can use them like this:

```ts
const obs1 = new O();
const obs2 = new O();
const obs3 = new O();

const sub = new S();

sub.observe(obs1);
sub.observe(obs2);
sub.observe(obs3);

sub.notify(); // notify
```

You might wonder why you would use something like this, but for now, just think of this as the Observer Pattern.

## Implementing a Reactivity System with Proxy and Observer Pattern

To clarify the purpose again, the goal is to "execute `updateComponent` when the state changes". Let's explain the implementation process using Proxy and the Observer Pattern.

In Vue.js's reactivity system, there are `target`, `Proxy`, `ReactiveEffect`, `Dep`, `track`, `trigger`, `targetMap`, and `activeEffect`.

First, let's talk about the structure of `targetMap`. `targetMap` is a mapping of keys and dependencies for a specific target. `target` represents the object you want to make reactive, and `dep` represents the effect (function) you want to execute. Here's how it looks in code:

```ts
type Target = any;
type TargetKey = any;

const targetMap = new WeakMap<Target, KeyToDepMap>();

type KeyToDepMap = Map<TargetKey, Dep>;

type Dep = Set<ReactiveEffect>;

class ReactiveEffect {
  constructor(public fn: () => T) {}
}
```

This structure forms the basis, and then we need to think about how to create and execute effects (functions) by registering them in `targetMap`.

This is where `track` and `trigger` come in. `track` is a function that registers dependencies in `targetMap`, and `trigger` is a function that retrieves and executes effects from `targetMap`.

```ts
export function track(target: object, key: unknown) {
  // ...
}

export function trigger(target: object, key?: unknown) {
  // ...
}
```

These `track` and `trigger` functions are implemented in the `get` and `set` handlers of Proxy.

```ts
const state = new Proxy(
  { count: 1 },
  {
    get(target, key, receiver) {
      track(target, key);
      return target[key];
    },
    set(target, key, value, receiver) {
      target[key] = value;
      trigger(target, key);
      return true;
    },
  }
);
```

The API for generating this Proxy is the `reactive` function.

```ts
function reactive<T>(target: T) {
  return new Proxy(target, {
    get(target, key, receiver) {
      track(target, key);
      return target[key];
    },
    set(target, key, value, receiver) {
      target[key] = value;
      trigger(target, key);
      return true;
    },
  });
}
```

![reactive](https://raw.githubusercontent.com/Ubugeeei/chibivue/main/book/images/reactive.png)

These are the applications of the Observer Pattern we discussed earlier. Remember this class:

```ts
class S implements Subject {
  private observers: Observer[] = [];

  observe(obs: Observer) {
    this.observers.push(obs);
  }

  forget() {
    this.observers = this.observers.filter((it) => it !== obs);
  }

  notify() {
    this.observers.forEach((it) => it.update());
  }
}
```

Let's replace it with something similar. In this class, `observers` corresponds to `Dep`. However, the structure of `Dep` is a bit more complex, as it separates dependencies for each key of an object. In other words, `observers` corresponds to `targetMap`.

```ts
class S implements Subject {
  private targetMap = new WeakMap<Target, KeyToDepMap>();

  observe(obs: Observer) {
    //
  }

  forget() {
    //
  }

  notify() {
    //
  }
}
```

![reactive_observer](https://raw.githubusercontent.com/Ubugeeei/chibivue/main/book/images/reactive_observer.png)

`observe` and `notify` correspond to `track` and `trigger`, respectively. There is no `forget` in this case.

```ts
class S implements Subject {
  private targetMap = new WeakMap<Target, KeyToDepMap>();

  track(target, key, effect: ???) {}
  trigger(target, key) {}
}
```

## Let's implement based on these.

The most difficult part is understanding up to the above, so once you understand it, you just need to write the source code.
However, some people may not be able to understand it just by the above explanation without actually knowing what it is.
For those people, let's try implementing it here first. Then, please refer to the previous section while reading the actual code!

First, let's create the necessary files. Create them in `packages/reactivity`.
Here, we will try to be conscious of the configuration of the original Vue as much as possible.

```sh
pwd # ~
mkdir packages/reactivity

touch packages/reactivity/index.ts

touch packages/reactivity/dep.ts
touch packages/reactivity/effect.ts
touch packages/reactivity/reactive.ts
touch packages/reactivity/baseHandler.ts
```

As usual, `index.ts` just exports, so I won't explain it in detail. Export what you want to use from the reactivity external package here.

Next is `dep.ts`.

```ts
import { type ReactiveEffect } from "./effect";

export type Dep = Set<ReactiveEffect>;

export const createDep = (effects?: ReactiveEffect[]): Dep => {
  const dep: Dep = new Set<ReactiveEffect>(effects);
  return dep;
};
```

There is no definition of `effect` yet, but we will implement it later, so it's okay.

Next is `effect.ts`.

```ts
import { Dep, createDep } from "./dep";

type KeyToDepMap = Map<any, Dep>;
const targetMap = new WeakMap<any, KeyToDepMap>();

export let activeEffect: ReactiveEffect | undefined;

export class ReactiveEffect<T = any> {
  public deps: Dep[] = [];
  constructor(public fn: () => T) {}

  run() {
    // ※ Save the activeEffect before executing fn and restore it after execution.
    // If you don't do this, it will be overwritten and behave unexpectedly. (Let's restore it to the original after use)
    let parent: ReactiveEffect | undefined = activeEffect;
    activeEffect = this;
    const res = this.fn();
    activeEffect = parent;
    return res;
  }
}

export function track(target: object, key: unknown) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }

  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = createDep()));
  }

  if (activeEffect) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}

export function trigger(target: object, key?: unknown) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;

  const dep = depsMap.get(key);

  if (dep) {
    const effects = [...dep];
    for (const effect of effects) {
      effect.run();
    }
  }
}
```

I haven't explained the contents of `track` and `trigger` so far, but they simply register and retrieve from `targetMap` and execute them, so please try to read them.

Next is `baseHandler.ts`. Define the handler for the reactive proxy here.
Well, you can implement it directly in `reactive`, but I followed the original Vue because it is like this.
In reality, there are various proxies such as `readonly` and `shallow`, so the idea is to implement those handlers here (but we won't do it this time).

```ts
import { track, trigger } from "./effect";
import { reactive } from "./reactive";

export const mutableHandlers: ProxyHandler<object> = {
  get(target: object, key: string | symbol, receiver: object) {
    track(target, key);

    const res = Reflect.get(target, key, receiver);
    // If it's an object, make it reactive (this allows nested objects to be reactive as well).
    if (res !== null && typeof res === "object") {
      return reactive(res);
    }

    return res;
  },

  set(target: object, key: string | symbol, value: unknown, receiver: object) {
    Reflect.set(target, key, value, receiver);
    trigger(target, key);
    return true;
  },
};
```

Here, `Reflect` appears, which is similar to `Proxy`, but while `Proxy` is a meta setting for objects created at the creation stage, `Reflect` is used to perform operations on existing objects. Both `Proxy` and `Reflect` are APIs for processing objects in the JS engine, and they allow you to perform metaprogramming compared to using objects normally.
To be precise, it is not a processing function, but the concept of reflection is used, which is often used to obtain meta information about a specific object.
You can perform various meta operations such as executing functions that change the object, executing functions that read the object, and checking if a key exists.

Actually,

```ts
Reflect.get(target, key, receiver);
```

can be written as

```ts
target[key];
```

and it will work, but since `Proxy` and `Reflect` have similar API structures and their methods are paired, they are often used together.
Well, don't worry about the details, the original Vue also uses `Reflect`, so let's use `Reflect` here.

Next is `reactive.ts`.

```ts
import { mutableHandlers } from "./baseHandler";

export function reactive<T extends object>(target: T): T {
  const proxy = new Proxy(target, mutableHandlers);
  return proxy as T;
}
```

Now that the implementation of the reactive part is complete, let's use them when mounting.
`~/packages/runtime-core/apiCreateApp.ts`.

```ts
import { ReactiveEffect } from "../reactivity";

export function createAppAPI<HostElement>(
  render: RootRenderFunction<HostElement>
): CreateAppFunction<HostElement> {
  return function createApp(rootComponent) {
    const app: App = {
      mount(rootContainer: HostElement) {
        const componentRender = rootComponent.setup!();

        const updateComponent = () => {
          const vnode = componentRender();
          render(vnode, rootContainer);
        };

        // From here
        const effect = new ReactiveEffect(updateComponent);
        effect.run();
        // To here
      },
    };

    return app;
  };
}
```

Now, let's try it out on the playground.

```ts
import { createApp, h, reactive } from "chibivue";

const app = createApp({
  setup() {
    const state = reactive({ count: 0 });
    const increment = () => {
      state.count++;
    };

    return function render() {
      return h("div", { id: "my-app" }, [
        h("p", {}, [`count: ${state.count}`]),
        h("button", { onClick: increment }, ["increment"]),
      ]);
    };
  },
});

app.mount("#app");
```

![reactive_example_mistake](https://raw.githubusercontent.com/Ubugeeei/chibivue/main/book/images/reactive_example_mistake.png)

Oh...

The rendering is working correctly now, but something seems off.
Well, it's understandable because in `updateComponent`, we are creating new elements every time.
So, when rendering for the second time and onwards, the old elements remain as they are, and new elements are created.
Therefore, let's remove all the elements before rendering each time.

Modify the `render` function in `~/packages/runtime-core/renderer.ts`.

```ts
const render: RootRenderFunction = (vnode, container) => {
  while (container.firstChild) container.removeChild(container.firstChild); // Add code to remove all elements
  const el = renderVNode(vnode);
  hostInsert(el, container);
};
```

Now, how does it look?

![reactive_example](https://raw.githubusercontent.com/Ubugeeei/chibivue/main/book/images/reactive_example.png)

It seems to be working fine now!

We can now update the screen reactively!!

::: tip
As you can see from the implementation, the Observer pattern introduced in this chapter does not have a direct representation in the vuejs/core (3.x repository).

However, if you take a look at the v2 repository, you will find an actual `Observer` class, as well as terms like `notify` and `observe`.

Moreover, the dependency relationship is the same as the current implementation, with the existence of `dep` and other implementations that serve as a step forward in the current implementation.

https://github.com/vuejs/vue/blob/49b6bd4264c25ea41408f066a1835f38bf6fe9f1/src/core/observer/index.ts#L48

While chibivue is based on Vue.js 3.x for explanation purposes, it's really fun to observe traces of Vue.js's history by occasionally looking at the v2 repository. I highly recommend you to take a look as well!!
:::

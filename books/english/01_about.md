# 🎯 Purpose of This Book

Thank you for picking up this book!  
I'm delighted that you're even slightly interested in it.  
First, let's summarize the purpose of this book.

☆ Objectives

- Deepen your understanding of Vue.js  
  What is Vue.js? What is its structure?
- Become able to implement basic Vue.js features  
  Implement basic features in practice
- Be able to read the source code of vue/core  
  Understand the relationship between the implementation and the official code, and comprehend the actual implementation

I've listed a few rough objectives, but you don't need to achieve all of them or aim for perfection.  
Feel free to read the whole book or just the parts you're interested in.  
I'm happy if you find any part of it helpful!

# 🤷‍♂️ Intended Audience

- Have used Vue.js before
- Can write TypeScript

No other knowledge is required beyond this.  
While many unfamiliar terms may appear in this book, I will strive to eliminate prior knowledge as much as possible, provide explanations throughout, and aim for a self-contained experience.  
However, if you are unfamiliar with Vue.js or TypeScript, I recommend learning those first.  
(Basic functionality is more than enough! No need to know the details)

# 🙋‍♀️ Things This Book (Author) Keeps in Mind (Wants to Do)

I will summarize some things that I want to keep in mind while writing this book, so please read it with that mindset.  
Please point out any shortcomings on this front.

- Elimination of prior knowledge  
  As mentioned earlier in the "Intended Audience" section, this book will aim to eliminate prior knowledge as much as possible and provide explanations along the way to create a self-contained experience.  
  This is because I want to make explanations accessible to as many people as possible.  
  For those with some knowledge, there may be parts that feel like redundant explanations, but please bear with me orz

- Incremental implementation  
  One of the purposes of this book is to implement a small version of Vue.js with your own hands.  
  In other words, this book will be based on implementation, and I will strive to keep it incremental and small.  
  More specifically, it means "minimizing the non-working state."  
  I will avoid implementations that don't work until the end and aim for a constantly functioning product as much as possible.  
  This is something I value highly when implementing things personally, as writing non-working code can be quite frustrating.  
  Let's make it fun by creating a situation where it's always functioning, albeit imperfect.  
  The idea is to repeatedly experience "I did it! Now it works up to this point!"

- Avoid discussing the merits of specific frameworks, libraries, languages, etc.  
  While this book focuses on Vue.js, there are numerous other great frameworks, libraries, and languages available today.  
  In fact, I, the author, also have many favorite libraries besides Vue.js, and I'm often helped by services and insights created with them, even if I don't write them myself.  
  The ultimate purpose of this book is to "understand Vue.js," and other discussions are beyond its scope. It does not aim to rank the merits of each.

# 💡 Topics and Flow Covered in This Book

This book has become quite voluminous, so we will divide it into sections by setting milestones for each department.

- **Minimal Example Department**  
  Implement Vue.js in the smallest configuration. Although this is the smallest department in terms of functionality, it supports virtual DOM, reactive systems, compilers, and SFCs.  
  The implementation is quite simplified, far from practical.
  However, it is enough for those who want a rough understanding of the overall picture of Vue.js.

- **Basic Virtual DOM Department**  
  Here, we implement a reasonably practical virtual DOM patch rendering feature.  
  We do not implement features such as suspense or optimizations, but it is complete enough to handle basic rendering without any problems.  
  We will also implement the scheduler here.

- **Basic Component System Department**  
  Here, we implement the basic Component System. In fact, the base of the Component System is implemented in the Basic Virtual DOM Department, so we will implement the other parts of the Component System. For example, props/emit, provide/inject, extensions to the reactive system, lifecycle hooks, etc.

- **Basic Template Compiler Department**  
  In addition to the compiler for the virtual DOM system implemented in Basic Virtual DOM, we will implement directives such as v-on, v-bind, v-for, etc.  
  Basically, it will be implemented using the component's template option, and we will not deal with SFCs here.

- **Basic SFC Compiler Department**  
  Here, we implement a reasonably practical SFC compiler.  
  Utilizing the template compiler implemented in the Basic Template Compiler Department, we will mainly implement the script compiler here.  
  Specifically, we will implement the SFC's script (default exports) and script setup.  
  By this point, the feel of the tool will be much closer to the usual Vue.

- **Web Application Essentials Department**  
  Up to the Basic SFC Compiler Department, we can implement reasonably practical features of Vue.js.  
  However, it is still not enough to develop a web application. For example, global state management and router management are required.  
  In this department, we will implement such external plugins and aim for a more practical tool from the perspective of "developing a web application".

## ★ Minimal Example Department

### Review of Vue.js

We will briefly touch on what Vue.js is, based on quotes from the official documentation.
Also, we will explain the positioning of this book and the differences between the content covered in the official documentation.

### Key Elements of Vue.js

In implementing the Vue.js core, we will explain what components make up the Vue.js source code and how it is structured. (Reactive system, compiler, etc.)

### Environment Setup

This book assumes that you will actually write source code while reading, so we will set up the environment for that.
You don't necessarily have to write the source code, but I encourage you to try it yourself!

### Implementing the createApp API

From this chapter, we will start implementing right away.
You may be wondering, "What? You're starting from there? Not from the virtual DOM?" but as mentioned earlier, this book aims for incremental implementation.
First, we will implement a simple interface with the developer and aim for a working state. We will add systems like the virtual DOM as needed.

### Implementing a Small Reactive System

We will explain the basics of reactive systems and implement a basic version.
We will not aim for a large or practical one.

### Implementing the Root Component

Finally, the concept of components appears here.
We will implement the root component and organize the implementation we have created so far.

### Implementing a Small Virtual DOM

We will give the root component a small virtual DOM and implement simple patch rendering.
Understand the basics of why the virtual DOM exists and how it is implemented.

### Implementing a Small Template Compiler

We will implement a developer interface that allows the h function implemented in the previous chapter to be written as a template.
We will implement a simple compiler that converts templates to h functions (accurately, createElement functions).

## ★ Basic Virtual DOM Department

- Items will be updated as needed, as this department seems to be getting bigger

## ★ Basic Component System Department

Items will be updated as needed, as this department seems to be getting bigger

- props/emit
- provide/inject
- computed api
- watch api
- lifecycle hooks

## ★ Basic Template Compiler Department

Items will be updated as needed, as this department seems to be getting bigger

- v-on
- v-bind
- v-for
- v-model

## ★ Basic SFC Compiler Department

Items will be updated as needed, as this department seems to be getting bigger

- Basics of SFC
- script setup
- style block

## ★ Web Application Essentials Department

- router
- store

# 🧑‍🏫 Opinions and Questions About This Book

I will try to respond to any questions or opinions about this book as much as possible.  
You can reach out to me on Twitter (either DM or tweet), and since I'm also publishing a repository, you can submit issues there as well.  
I don't think my understanding or this book is perfect, so I would appreciate any feedback you have, and if you find any explanations difficult to understand, please don't hesitate to ask.  
I want to spread easy-to-understand and accurate explanations to as many people as possible, so I hope we can work together to create this book 👍

https://twitter.com/ubugeeei

https://github.com/Ubugeeei/zenn

prev | [next](https://github.com/Ubugeeei/chibivue/blob/main/books/english/02_what_is_vue.md)

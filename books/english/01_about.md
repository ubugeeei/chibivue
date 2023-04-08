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

## Minimal Configuration Edition

### Vue.js Recap

We'll revisit what Vue.js is all about, using official documentation as reference.  
We will also explain the positioning of this book and the differences between its content and that of the official documentation.

### Key Components of Vue.js

When implementing Vue.js itself, we will explain what components and structure make up Vue.js's source code (reactive system, compiler, etc.).

### Environment Setup

Since this book assumes that you'll be reading and writing source code along the way, we will go through the environment setup process.  
You don't necessarily need to write the code, but I'd love for you to try it out yourself!

### Implementing the createApp API

From this chapter, we'll start the implementation right away  
You might think, "What? Starting from there? Not with virtual DOM?" but as mentioned earlier, this book strives for incremental implementation.  
First, we'll aim for a functional state by implementing a simple interface for developers. We'll add systems like the virtual DOM when needed.

### Implementing a Small Reactive System

We'll explain the basics of reactive systems and implement a basic version.  
We won't aim for anything large or practical.

### Implementing the Root Component

### Implementing a Small Virtual DOM

### Implementing a Small Template Compiler

## Virtual DOM Edition

- Items may be updated as it seems to be getting larger

## Compiler Edition

- Items may be updated as it seems to be getting larger

### SFC

### script setup

## #Additional APIs and Plugins Edition

### props/emits

### compiler macro

### router

### store

# 🧑‍🏫 Opinions and Questions About This Book

I will try to respond to any questions or opinions about this book as much as possible.  
You can reach out to me on Twitter (either DM or tweet), and since I'm also publishing a repository, you can submit issues there as well.  
I don't think my understanding or this book is perfect, so I would appreciate any feedback you have, and if you find any explanations difficult to understand, please don't hesitate to ask.  
I want to spread easy-to-understand and accurate explanations to as many people as possible, so I hope we can work together to create this book 👍

https://twitter.com/ubugeeei

https://github.com/Ubugeeei/zenn

prev | [next](https://github.com/Ubugeeei/chibivue/blob/main/books/english/02_what_is_vue.md)

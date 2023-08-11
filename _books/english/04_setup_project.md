# How to Proceed with This Book

We will start implementing Vue.js in small steps right away.  
Here is a list of attitudes, precautions, and other information you should know along the way.

- The project name is chibivue.  
  We will call the basic implementation of Vue.js that we will implement in this book chibivue.
- The basic principle is, as we discussed earlier, "repeating small developments."
- The source code for each phase is available at XXX as an appendix to this book.  
  Not all of the source code is explained in detail in this book, so please refer to this source code as needed.
- The completed code depends on several packages.  
  This is a common problem with homemade content, as there is often a debate about "how much should I implement by hand to call it homemade?"  
  This book does not write all the source code by hand, either.  
  We will actively use packages like those used in the official Vue.js code, such as Babel.  
  But don't worry, we will provide the minimum necessary explanation for the packages needed, as this book aims to require less prior knowledge.

# Setting up the Environment

Now let's start setting up the environment!  
Here is a list of what we will be setting up:

- Runtime: Node.js v18.14.0
- Language: TypeScript
- Package Manager: pnpm v8.0.0
- Bundler: Vite v3.x

## Installing Node.js

This should probably be fine. Please prepare it yourself.  
I will omit the explanation.

## Installing pnpm

Many of you may be using npm or yarn regularly.  
This time we will use pnpm, so please install it as well.  
The basic commands are almost the same as npm.  
https://pnpm.io/installation

## Creating the Project

Create the project in any directory.  
From here on, for convenience, the root path of the project is represented as "~" (e.g., "~/src/main.ts").

This time, we will implement chibivue's main body and a playground for testing it separately.  
But all we will do in the playground is call chibivue and bundle it with vite.  
We plan to have a structure like this.

```
~
|- examples
| |- playground
|
|- packages
|- tsconfig.js
```

We will implement the playground in a directory called examples.  
We will implement the TypeScript files for chibivue in the packages directory and import them from the example side.

Here are the steps to set up the project.

### Building the Main Project

```sh
# In reality, create a directory for chibivue and move to it (similar notes will be omitted below).
pwd # ~/
pnpm init
pnpm i --D @types/node
mkdir packages
touch packages/index.ts
touch tsconfig.json
```

Contents of tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "lib": ["DOM"],
    "strict": true,
    "paths": { "chibivue": ["./packages"] },
    "moduleResolution": "node",
    "allowJs": true,
    "esModuleInterop": true
  },
  "include": ["packages//*.ts", "examples//**.ts"],
  "exclude": ["node_modules", "dist"]
}
```

Contents of packages/index.ts

```ts
export const helloChibivue = () => {
  console.log("Hello chibivue!");
};
```

### Building the Playground

```sh
pwd # ~/
mkdir examples
cd examples
pnpm create vite

# --------- create vite cli settings
# Project name: playground
# Select a framework: Vanilla
# Select a variant: TypeScript
```

Remove unnecessary files created by vite in the project.

```sh
pwd # ~/examples/playground
rm -rf public
rm -rf src # We will recreate it because there are unnecessary files.
mkdir src
touch src/main.ts
```

Contents of src/main.ts

```ts
import { helloChibivue } from "chibivue";

helloChibivue();
```

Modify index.html as follows.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>chibivue</title>
  </head>

  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

Set up aliases in the project created by vite so that it can import what was implemented in chibivue.

```sh
pwd # ~/examples/playground
touch vite.config.js
```

Contents of vite.config.js

```ts
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      chibivue: `${process.cwd()}/../../packages`,
    },
  },
});
```

Finally, add a command to start the playground in the package.json of the chibivue project and try starting it!

Add the following to ~/package.json

```json
{
  "scripts": {
    "dev": "cd examples/playground && pnpm i && pnpm run dev"
  }
}
```

```sh
pwd # ~
pnpm run dev
```

Access the developer server that started with this command, and if the message is displayed, you are done!

![hello chibivue](https://raw.githubusercontent.com/Ubugeeei/chibivue/main/books/images/hello_chibivue.png)

Source code up to this point:

https://github.com/Ubugeeei/chibivue/tree/main/books/chapter_codes/01_project_setup

[prev](https://github.com/Ubugeeei/chibivue/blob/main/books/english/03_vue_core_components.md)| [next](https://github.com/Ubugeeei/chibivue/blob/main/books/english/05_create_app_api.md)

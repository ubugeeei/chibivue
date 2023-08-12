# How to Proceed with This Book and Environment Setup

## How to Proceed with This Book

We will promptly start with a simple implementation of Vue.js. Here are some points to keep in mind, precautions, and other essential information:

- The project name will be "chibivue." We will refer to the basic Vue.js implementations covered in this book as "chibivue."
- As initially mentioned, our primary approach will be "repeating small developments."
- Source codes for each phase are included in the appendix of this book and can be found at XXX. We will not provide detailed explanations for all the source code in the book, so please refer to the appendix as needed.
- The final code depends on several packages. A common issue with DIY content is the debate over "how much one should implement by hand to call it homemade." While we won't write all source code by hand in this book, we will actively use packages similar to those used in Vue.js's official code. For example, we'll use Babel. Rest assured, we aim to make this book as beginner-friendly as possible, providing minimal explanations for necessary packages.

## Environment Setup

Now, let's quickly move on to setting up the environment! I'll list the tools and versions we'll be using:

- Runtime: Node.js v18.x
- Language: TypeScript
- Package Manager: pnpm v8.x
- Bundler: Vite v3.x

## Installing Node.js

Most of you are probably familiar with this step. Please set it up on your own. We will skip the detailed explanation here.

## Installing pnpm

Many of you might typically use npm or yarn. For this book, we will be using pnpm, so please install it as well. The commands are mostly similar to npm.
https://pnpm.io/installation

## プロジェクトの作成

Create the project in any directory of your choice. For convenience, we'll denote the project's root path as `~` (e.g., `~/src/main.ts`).

This time, we will separate the main "chibivue" from a playground to test its functionality. The playground will simply invoke "chibivue" and bundle it with Vite. We anticipate a structure like this.

```
~
|- examples
|    |- playground
|
|- packages
|- tsconfig.js
```

We will implement the playground in a directory named "examples."
We will implement the core TypeScript files for chibivue in "packages" and import them from the example side.

Below are the steps to construct it.

### Building the Main Project

```sh
## Please create a directory specifically for chibivue and navigate into it. (Such notes will be omitted hereafter.)
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
    "paths": {
      "chibivue": ["./packages"]
    },
    "moduleResolution": "node",
    "allowJs": true,
    "esModuleInterop": true
  },
  "include": ["packages/**/*.ts", "examples/**/**.ts"],
  "exclude": ["node_modules", "dist"]
}
```

Contents of packages/index.ts

```ts
export const helloChibivue = () => {
  console.log("Hello chibivue!");
};
```

### ### Building the Playground Side

```sh
pwd # ~/
mkdir examples
cd examples
pnpm create vite

## --------- Setting up with the Vite CLI
## Project name: playground
## Select a framework: Vanilla
## Select a variant: TypeScript
```

Remove unnecessary items from the project created with Vite.

```sh
pwd # ~/examples/playground
rm -rf public
rm -rf src # We will recreate it since there are unnecessary files.
mkdir src
touch src/main.ts
```

Contents of src/main.ts

※ For now, there will be an error after "from," but we will address this in the upcoming steps, so it's not a problem.

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

Configure an alias in the Vite project to be able to import what you implemented in chibivue.

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

Lastly, let's add a command to the package.json of the chibivue project to launch the playground and try starting it!

Append the following to ~/package.json

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

Access the developer server that started with this command. If a message displays, then the setup is complete.

![hello chibivue](https://raw.githubusercontent.com/Ubugeeei/chibivue/main/book/images/hello_chibivue.png)

Source code up to this point:  
[chibivue (GitHub)](https://github.com/Ubugeeei/chibivue/tree/main/book/impls//00_introduction/010_project_setup)

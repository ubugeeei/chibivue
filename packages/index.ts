export * from "./runtime-dom";
export * from "./runtime-core";
import * as runtimeDom from "./runtime-dom";

import { compile } from "./compiler-dom";
import { RenderFunction, registerRuntimeCompiler } from "./runtime-core";
import { CompilerOptions } from "./compiler-core";

function compileToFunction(
  template: string,
  options?: CompilerOptions
): RenderFunction {
  const opts = { ...options, isBrowser: true } as CompilerOptions;
  const { code } = compile(template, opts);
  return new Function("ChibiVue", code)(runtimeDom);
}

registerRuntimeCompiler(compileToFunction);

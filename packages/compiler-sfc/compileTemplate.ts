import {
  CodegenResult,
  CompilerOptions,
  ParserOptions,
  RootNode,
} from "../compiler-core";
import * as CompilerDOM from "../compiler-dom";

export interface TemplateCompiler {
  compile(template: string, options: CompilerOptions): CodegenResult;
  parse(template: string, options: ParserOptions): RootNode;
}

export interface SFCTemplateCompileResults {
  code: string;
  source: string;
  ast?: RootNode;
}

export interface SFCTemplateCompileOptions {
  source: string;
  compiler?: TemplateCompiler;
  compilerOptions?: CompilerOptions;
}

export function compileTemplate({
  source,
  compiler = CompilerDOM,
  compilerOptions,
}: SFCTemplateCompileOptions): SFCTemplateCompileResults {
  let { code, ast } = compiler.compile(source, {
    ...compilerOptions,
    __BROWSER__: false,
  });
  return { code: code, ast, source };
}

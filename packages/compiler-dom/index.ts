import {
  CompilerOptions,
  DirectiveTransform,
  ParserOptions,
  RootNode,
  baseCompile,
} from "../compiler-core";
import { baseParse } from "../compiler-core/parse";
import { CodegenResult } from "./codegen";
import { parserOptions } from "./parserOptions";
import { transformModel } from "./transforms/vModel";

export const DOMDirectiveTransforms: Record<string, DirectiveTransform> = {
  model: transformModel, // override compiler-core
};

export function compile(
  template: string,
  options: CompilerOptions
): CodegenResult {
  return baseCompile(template, {
    ...options,
    ...parserOptions,
    directiveTransforms: {
      ...options.directiveTransforms,
      ...DOMDirectiveTransforms,
    },
  }) as any;
}

export function parse(template: string, options: ParserOptions = {}): RootNode {
  return baseParse(template, { ...options, ...parserOptions });
}

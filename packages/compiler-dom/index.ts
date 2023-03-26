import {
  CompilerOptions,
  DirectiveTransform,
  RootNode,
  baseCompile,
} from "../compiler-core";
import { baseParse } from "../compiler-core/parse";
import { CodegenResult } from "./codegen";
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
    directiveTransforms: {
      ...options.directiveTransforms,
      ...DOMDirectiveTransforms,
    },
  }) as any;
}

export function parse(template: string): RootNode {
  return baseParse(template);
}

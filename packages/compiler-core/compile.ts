import { isString } from "../shared";
import { RootNode } from "./ast";
import { generate } from "./codegen";
import { baseParse } from "./parse";
import { DirectiveTransform, NodeTransform, transform } from "./transform";

import { transformElement } from "./transforms/transformElement";
import { transformExpression } from "./transforms/transformExpression";
import { transformFor } from "./transforms/vFor";

import { transformBind } from "./transforms/vBind";
import { transformOn } from "./transforms/vOn";
import { transformModel } from "./transforms/vModel";
import { CompilerOptions } from "./options";

export type TransformPreset = [
  NodeTransform[],
  Record<string, DirectiveTransform>
];

export function getBaseTransformPreset(): TransformPreset {
  return [
    [transformFor, transformExpression, transformElement],
    {
      on: transformOn,
      bind: transformBind,
      model: transformModel,
    },
  ];
}

export function baseCompile(
  template: string | RootNode,
  options: CompilerOptions
) {
  // parse
  const ast = isString(template) ? baseParse(template) : template;

  // transform
  const [nodeTransforms, directiveTransforms] = getBaseTransformPreset();
  transform(ast, {
    nodeTransforms: [...nodeTransforms, ...(options.nodeTransforms || [])],
    directiveTransforms: {
      ...directiveTransforms,
      ...(options.directiveTransforms || {}),
    },
  });

  // codegen
  const code = generate(ast, options);

  return code;
}

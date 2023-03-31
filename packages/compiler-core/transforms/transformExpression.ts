import { parse } from "@babel/parser";
import { Identifier, Node } from "@babel/types";

import { advancePositionWithClone, isSimpleIdentifier } from "../utils";
import { walkIdentifiers } from "../babelUtils";
import {
  CompoundExpressionNode,
  ExpressionNode,
  NodeTypes,
  SimpleExpressionNode,
  createCompoundExpression,
  createSimpleExpression,
} from "../ast";
import { NodeTransform, TransformContext } from "../transform";

export const transformExpression: NodeTransform = (node, context) => {
  if (node.type === NodeTypes.INTERPOLATION) {
    node.content = processExpression(
      node.content as SimpleExpressionNode,
      context
    );
  } else if (node.type === NodeTypes.ELEMENT) {
    for (let i = 0; i < node.props.length; i++) {
      const dir = node.props[i];
      if (dir.type === NodeTypes.DIRECTIVE && dir.name !== "for") {
        if (dir.type === NodeTypes.DIRECTIVE) {
          const exp = dir.exp;
          const arg = dir.arg;

          if (
            exp &&
            exp.type === NodeTypes.SIMPLE_EXPRESSION &&
            !(dir.name === "on" && arg)
          ) {
            dir.exp = processExpression(exp, context);
          }

          if (
            arg &&
            arg.type === NodeTypes.SIMPLE_EXPRESSION &&
            !arg.isStatic
          ) {
            dir.arg = processExpression(arg, context);
          }
        }
      }
    }
  }
};

interface PrefixMeta {
  start: number;
  end: number;
}

export function processExpression(
  node: SimpleExpressionNode,
  context: TransformContext
): ExpressionNode {
  const rawExp = node.content;
  const rewriteIdentifier = (raw: string) => {
    const { inline, bindingMetadata } = context;
    if (inline) {
      // TODO:
      return `${raw}.value`;
    }
    return `_ctx.${raw}`;
  };

  if (isSimpleIdentifier(rawExp)) {
    const isScopeVarReference = context.identifiers[rawExp];
    if (!isScopeVarReference) {
      node.content = rewriteIdentifier(rawExp);
      return node;
    }
  }

  // find ids
  const ast = parse(`(${rawExp})`).program;
  type QualifiedId = Identifier & PrefixMeta;
  const ids: QualifiedId[] = [];
  const parentStack: Node[] = [];
  const knownIds: Record<string, number> = Object.create(context.identifiers);

  walkIdentifiers(
    ast,
    (node, _, __, isReferenced, isLocal) => {
      if (isReferenced && !isLocal) {
        node.name = rewriteIdentifier(node.name);
      }
      ids.push(node as QualifiedId);
    },
    parentStack,
    knownIds
  );

  const children: CompoundExpressionNode["children"] = [];
  ids.sort((a, b) => a.start - b.start);
  ids.forEach((id, i) => {
    // range is offset by -1 due to the wrapping parens when parsed
    const start = id.start - 1;
    const end = id.end - 1;
    const last = ids[i - 1];
    const leadingText = rawExp.slice(last ? last.end - 1 : 0, start);
    if (leadingText.length) {
      children.push(leadingText);
    }

    const source = rawExp.slice(start, end);
    children.push(
      createSimpleExpression(id.name, false, {
        source,
        start: advancePositionWithClone(node.loc.start, source, start),
        end: advancePositionWithClone(node.loc.start, source, end),
      })
    );
    if (i === ids.length - 1 && end < rawExp.length) {
      children.push(rawExp.slice(end));
    }
  });

  let ret;
  if (children.length) {
    ret = createCompoundExpression(children, node.loc);
  } else {
    ret = node;
  }
  ret.identifiers = Object.keys(knownIds);

  return ret;
}

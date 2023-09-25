import {
  DirectiveNode,
  ElementNode,
  IfBranchNode,
  IfConditionalExpression,
  IfNode,
  NodeTypes,
  SimpleExpressionNode,
  VNodeCall,
  createCallExpression,
  createConditionalExpression,
  createObjectExpression,
  createObjectProperty,
  createSimpleExpression,
  createVNodeCall,
} from "../ast";
import { CREATE_COMMENT, FRAGMENT } from "../runtimeHelpers";
import {
  TransformContext,
  createStructuralDirectiveTransform,
  traverseNode,
} from "../transform";

export const transformIf = createStructuralDirectiveTransform(
  /^(if|else|else-if)$/,
  (node, dir, context) => {
    return processIf(node, dir, context, (ifNode, branch, isRoot) => {
      const siblings = context.parent!.children;
      let i = siblings.indexOf(ifNode);
      let key = 0;
      while (i-- >= 0) {
        const sibling = siblings[i];
        if (sibling && sibling.type === NodeTypes.IF) {
          key += sibling.branches.length;
        }
      }

      return () => {
        if (isRoot) {
          ifNode.codegenNode = createCodegenNodeForBranch(
            branch,
            key,
            context
          ) as IfConditionalExpression;
        } else {
          const parentCondition = getParentCondition(ifNode.codegenNode!);
          parentCondition.alternate = createCodegenNodeForBranch(
            branch,
            key + ifNode.branches.length - 1,
            context
          );
        }
      };
    });
  }
);

export function processIf(
  node: ElementNode,
  dir: DirectiveNode,
  context: TransformContext,
  processCodegen?: (
    node: IfNode,
    branch: IfBranchNode,
    isRoot: boolean
  ) => (() => void) | undefined
) {
  if (
    dir.name !== "else" &&
    (!dir.exp || !(dir.exp as SimpleExpressionNode).content.trim())
  ) {
    const loc = dir.exp ? dir.exp.loc : node.loc;
    dir.exp = createSimpleExpression(`true`, false, loc);
  }

  if (dir.name === "if") {
    const branch = createIfBranch(node, dir);
    const ifNode: IfNode = {
      type: NodeTypes.IF,
      loc: node.loc,
      branches: [branch],
    };
    context.replaceNode(ifNode);
    if (processCodegen) {
      return processCodegen(ifNode, branch, true);
    }
  } else {
    const siblings = context.parent!.children;
    let i = siblings.indexOf(node);
    while (i-- >= -1) {
      const sibling = siblings[i];
      if (sibling && sibling.type === NodeTypes.COMMENT) {
        context.removeNode(sibling);
        continue;
      }

      if (
        sibling &&
        sibling.type === NodeTypes.TEXT &&
        !sibling.content.trim().length
      ) {
        context.removeNode(sibling);
        continue;
      }

      if (sibling && sibling.type === NodeTypes.IF) {
        if (
          dir.name === "else-if" &&
          sibling.branches[sibling.branches.length - 1].condition === undefined
        ) {
          throw new Error("X_V_ELSE_NO_ADJACENT_IF"); // TODO: error handling
        }

        context.removeNode();
        const branch = createIfBranch(node, dir);

        sibling.branches.push(branch);
        const onExit = processCodegen && processCodegen(sibling, branch, false);
        traverseNode(branch, context);
        // call on exit
        if (onExit) onExit();
        context.currentNode = null;
      } else {
        throw new Error("X_V_ELSE_NO_ADJACENT_IF"); // TODO: error handling
      }
      break;
    }
  }
}

function createIfBranch(node: ElementNode, dir: DirectiveNode): IfBranchNode {
  return {
    type: NodeTypes.IF_BRANCH,
    loc: node.loc,
    condition: dir.name === "else" ? undefined : dir.exp,
    children: [node],
    // userKey: findProp(node, `key`),
  };
}

function createCodegenNodeForBranch(
  branch: IfBranchNode,
  keyIndex: number,
  context: TransformContext
): IfConditionalExpression | VNodeCall {
  if (branch.condition) {
    return createConditionalExpression(
      branch.condition,
      createChildrenCodegenNode(branch, keyIndex, context),
      createCallExpression(context.helper(CREATE_COMMENT), ['""', "true"])
    ) as IfConditionalExpression;
  } else {
    return createChildrenCodegenNode(branch, keyIndex, context);
  }
}

function createChildrenCodegenNode(
  branch: IfBranchNode,
  keyIndex: number,
  context: TransformContext
): VNodeCall {
  const { helper } = context;
  const keyProperty = createObjectProperty(
    `key`,
    createSimpleExpression(`${keyIndex}`, false)
  );
  const { children } = branch;
  const firstChild = children[0];
  const needFragmentWrapper =
    children.length !== 1 || firstChild.type !== NodeTypes.ELEMENT;
  if (needFragmentWrapper) {
    return createVNodeCall(
      context,
      helper(FRAGMENT),
      createObjectExpression([keyProperty]),
      children
    );
  } else {
    const vnodeCall = (firstChild as ElementNode).codegenNode as VNodeCall;
    // inject branch key
    // injectProp(vnodeCall, keyProperty, context);
    return vnodeCall;
  }
}

function getParentCondition(
  node: IfConditionalExpression
): IfConditionalExpression {
  while (true) {
    if (node.type === NodeTypes.JS_CONDITIONAL_EXPRESSION) {
      if (node.alternate.type === NodeTypes.JS_CONDITIONAL_EXPRESSION) {
        node = node.alternate;
      } else {
        return node;
      }
    }
  }
}

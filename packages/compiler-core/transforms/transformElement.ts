import { isSymbol } from "../../shared";
import {
  ArrayExpression,
  DirectiveArguments,
  DirectiveNode,
  ElementNode,
  ElementTypes,
  NodeTypes,
  ObjectExpression,
  TemplateTextChildNode,
  VNodeCall,
  createArrayExpression,
  createObjectExpression,
  createObjectProperty,
  createSimpleExpression,
  createVNodeCall,
} from "../ast";
import { NodeTransform, TransformContext } from "../transform";

const directiveImportMap = new WeakMap<DirectiveNode, symbol>();

export type PropsExpression = ObjectExpression;

export const transformElement: NodeTransform = (node, context) => {
  return function postTransformElement() {
    node = context.currentNode!;

    if (
      !(
        node.type === NodeTypes.ELEMENT &&
        (node.tagType === ElementTypes.ELEMENT ||
          node.tagType === ElementTypes.COMPONENT)
      )
    ) {
      return;
    }

    const { tag, props } = node;
    const isComponent = node.tagType === ElementTypes.COMPONENT;

    let vnodeTag = `"${tag}"`;
    let vnodeProps: VNodeCall["props"];
    let vnodeDirectives: VNodeCall["directives"];
    let vnodeChildren: VNodeCall["children"];

    // props
    if (props.length > 0) {
      const propsBuildResult = buildProps(node, context);
      vnodeProps = propsBuildResult.props;

      const directives = propsBuildResult.directives;
      vnodeDirectives = directives.length
        ? (createArrayExpression(
            directives.map((dir) => buildDirectiveArgs(dir, context))
          ) as DirectiveArguments)
        : undefined;
    }

    // children
    if (node.children.length > 0) {
      if (node.children.length === 1) {
        const child = node.children[0];
        const type = child.type;
        // check for dynamic text children
        const hasDynamicTextChild = type === NodeTypes.INTERPOLATION;

        // pass directly if the only child is a text node
        // (plain / interpolation / expression)
        if (hasDynamicTextChild || type === NodeTypes.TEXT) {
          vnodeChildren = child as TemplateTextChildNode;
        } else {
          vnodeChildren = node.children;
        }
      } else {
        vnodeChildren = node.children;
      }
    }

    node.codegenNode = createVNodeCall(
      context,
      vnodeTag,
      vnodeProps,
      vnodeChildren,
      vnodeDirectives,
      isComponent
    );
  };
};

export function buildProps(
  node: ElementNode,
  context: TransformContext
): { props: PropsExpression | undefined; directives: DirectiveNode[] } {
  const { props } = node;
  let properties: ObjectExpression["properties"] = [];
  const runtimeDirectives: DirectiveNode[] = [];

  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    if (prop.type === NodeTypes.ATTRIBUTE) {
      const { name, value } = prop;

      properties.push(
        createObjectProperty(
          createSimpleExpression(name, true),
          createSimpleExpression(value ? value.content : "", true)
        )
      );
    } else {
      // directives
      const { name } = prop;
      const directiveTransform = context.directiveTransforms[name];
      if (directiveTransform) {
        // has built-in directive transform.
        const { props, needRuntime } = directiveTransform(prop, node, context);
        properties.push(...props);
        if (needRuntime) {
          runtimeDirectives.push(prop);
          if (isSymbol(needRuntime)) {
            directiveImportMap.set(prop, needRuntime);
          }
        }
      }
    }
  }

  let propsExpression: PropsExpression | undefined = undefined;
  if (properties.length) {
    propsExpression = createObjectExpression(properties);
  }

  return {
    props: propsExpression,
    directives: runtimeDirectives,
  };
}

export function buildDirectiveArgs(
  dir: DirectiveNode,
  context: TransformContext
): ArrayExpression {
  const dirArgs: ArrayExpression["elements"] = [];
  const runtime = directiveImportMap.get(dir);
  if (runtime) {
    dirArgs.push(context.helperString(runtime));
  }
  if (dir.exp) dirArgs.push(dir.exp);
  if (dir.arg) {
    if (!dir.exp) {
      dirArgs.push(`void 0`);
    }
    dirArgs.push(dir.arg);
  }
  return createArrayExpression(dirArgs, dir.loc);
}

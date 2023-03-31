import { ElementNode } from "./ast";
import { TextModes } from "./parse";
import { DirectiveTransform, NodeTransform } from "./transform";

export interface ParserOptions {
  /**
   * e.g. platform native elements, e.g. `<div>` for browsers
   */
  isNativeTag?: (tag: string) => boolean;

  /**
   * @default ['{{', '}}']
   */
  delimiters?: [string, string];

  decodeEntities?: (rawText: string, asAttr: boolean) => string;

  /**
   * Get text parsing mode for this element
   */
  getTextMode?: (
    node: ElementNode,
    parent: ElementNode | undefined
  ) => TextModes;
}

export interface TransformOptions {
  nodeTransforms?: NodeTransform[];
  directiveTransforms?: Record<string, DirectiveTransform | undefined>;
  inline?: boolean;
  bindingMetadata?: BindingMetadata;
}

export type BindingMetadata = {
  [key: string]: BindingTypes | undefined;
} & {
  __isScriptSetup?: boolean;
};

export const enum BindingTypes {
  DATA = "data",
  SETUP_CONST = "setup-const",
  SETUP_MAYBE_REF = "setup-maybe-ref",
  SETUP_REF = "setup-ref",
  SETUP_REACTIVE_CONST = "setup-reactive-const",
  SETUP_LET = "setup-let",
  LITERAL_CONST = "literal-const",
  OPTIONS = "options",
}

export interface CodegenOptions {
  inline?: boolean;
  __BROWSER__?: boolean;
}

export type CompilerOptions = ParserOptions & TransformOptions & CodegenOptions;

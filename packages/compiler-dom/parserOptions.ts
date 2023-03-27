import { ParserOptions } from "../compiler-core";
import { isHTMLTag } from "../shared/domTagConfig";

export const parserOptions: ParserOptions = {
  isNativeTag: (tag) => isHTMLTag(tag),
};

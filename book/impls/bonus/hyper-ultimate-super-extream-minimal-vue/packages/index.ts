// create app api
interface CreateAppOption {
  setup: () => Record<string, unknown>;
  render: (ctx: Record<string, unknown>) => VNode;
}
let update: (() => void) | null = null;
export const createApp = (option: CreateAppOption) => {
  return {
    mount(selector: string) {
      const container = document.querySelector(selector);
      if (!container) throw new Error(`Container ${selector} not found!`);
      container.innerHTML = "";
      let prevVNode: VNode | null = null;
      const setupState = option.setup();
      update = () => {
        const vnode = option.render(setupState);
        render(prevVNode, vnode, container);
        prevVNode = vnode;
      };
      update();
    },
  };
};

// virtual dom patch
export const render = (n1: VNode | null, n2: VNode, container: Element) => {
  const mountElement = (vnode: VNode, container: Element) => {
    const { tag, onClick, children } = vnode;
    const el = document.createElement(tag);
    el.textContent = children;
    el.addEventListener("click", onClick);
    container.appendChild(el);
  };
  const patchElement = (n1: VNode, n2: VNode) => {
    const { children } = n2;
    (container.firstElementChild as Element).textContent = children;
  };
  n1 == null ? mountElement(n2, container) : patchElement(n1, n2);
};

// virtual dom
interface VNode {
  tag: string;
  onClick: (e: Event) => void;
  children: string;
}
export const h = (
  tag: string,
  onClick: (e: Event) => void,
  children: string
): VNode => ({ tag, onClick, children });

// reactive system
export const reactive = <T extends Record<string, unknown>>(obj: T): T => {
  const handler: ProxyHandler<T> = {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const res = Reflect.set(target, key, value, receiver);
      update?.();
      return res;
    },
  };
  return new Proxy(obj, handler);
};

// template compiler
interface AST {
  tag: string;
  onClick: string;
  children: (string | InterpolationNode)[];
}
interface InterpolationNode {
  content: string;
}
const parse = (template: string): AST => {
  const RE = /<([a-z]+)\s@click=\"([a-z]+)\">(.+)<\/[a-z]+>/;
  const [_, tag, onClick, children] = template.match(RE) || [];
  if (!tag || !onClick || !children) throw new Error("Invalid template!");

  const regex = /{{(.*?)}}/g;
  let match: RegExpExecArray | null;
  let lastIndex = 0;
  const parsedChildren: AST["children"] = [];
  while ((match = regex.exec(children)) !== null) {
    if (lastIndex !== match.index)
      parsedChildren.push(children.substring(lastIndex, match.index));
    parsedChildren.push({ content: match[1].trim() });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < children.length)
    parsedChildren.push(children.substr(lastIndex));

  return { tag, onClick, children: parsedChildren };
};
const codegen = (node: AST) => {
  const { tag, onClick, children } = node;
  return `(_ctx) => h('${tag}', _ctx.${onClick}, \`${children
    .map((child) =>
      typeof child === "object" ? `\$\{_ctx.${child.content}\}` : child
    )
    .join("")}\`)`;
};
const compile = (template: string): string => {
  const parsed = parse(template);
  const code = codegen(parsed);
  return code;
};

// sfc compiler (vite transformer)
export const VitePluginChibivue = () => {
  return {
    name: "vite-plugin-chibivue",
    transform(code: string, id: string) {
      if (!id.endsWith(".vue")) return null;
      return compileSFC(code);
    },
  };
};
const compileSFC = (sfc: string): { code: string } => {
  const SCRIPT_RE = /<script>\s*([\s\S]*?)\s*<\/script>/;
  const [_, scriptContent] = sfc.match(SCRIPT_RE) || [];
  const TEMPLATE_RE = /<template>\s*([\s\S]*?)\s*<\/template>/;
  const [__, templateContent] = sfc.match(TEMPLATE_RE) || [];
  if (!scriptContent || !templateContent) throw new Error("Invalid SFC!");

  let code = "";
  const defaultExported = getDefaultExportedContent(scriptContent);
  code += "import { h, reactive } from 'chibivue';\n";
  code += `const options = ${defaultExported}\n`;
  code += `Object.assign(options, { render: ${compile(templateContent)} });\n`;
  code += "export default options;\n";
  return { code };
};

const getDefaultExportedContent = (script: string) => {
  const EXPORT_DEFAULT_RE = /export default\s*([\s\S]*)/;
  const [_, content] = script.match(EXPORT_DEFAULT_RE) || [];
  if (!content) throw new Error("No default export found!");
  return content;
};

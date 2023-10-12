export type VaporComponent<HostNode = any> = () => VaporNode<HostNode>;
export type VaporNode<HostNode = any> = HostNode & {
  __is_vapor: true;
};

export const template = (tmp: string): Element & { __is_vapor: true } => {
  const container = document.createElement("div");
  container.innerHTML = tmp;
  const el = container.firstElementChild as Element & {
    __is_vapor: true;
  };
  el.__is_vapor = true;
  return el;
};

export const setText = (target: Element, format: any, ...values: any[]) => {
  if (!target) return;

  if (!values.length) {
    target.textContent = format;
    return;
  }

  if (!format && values.length) {
    target.textContent = values.join("");
    return;
  }

  let text = format;
  for (let i = 0; i < values.length; i++) {
    text = text.replace("{}", values[i]);
  }

  target.textContent = text;
};

export const on = (element: Element, event: string, callback: () => void) => {
  element.addEventListener(event, callback);
};

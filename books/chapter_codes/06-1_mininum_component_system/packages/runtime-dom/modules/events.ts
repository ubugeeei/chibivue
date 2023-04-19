interface Invoker extends EventListener {
  value: EventValue;
}

type EventValue = Function;

export function addEventListener(
  el: Element,
  event: string,
  handler: EventListener
) {
  el.addEventListener(event, handler);
}

export function patchEvent(
  el: Element & { _vei?: Record<string, Invoker | undefined> },
  rawName: string,
  value: EventValue | null
) {
  const name = parseName(rawName);

  if (value) {
    const invoker = createInvoker(value);
    addEventListener(el, name, invoker);
  }
}

function parseName(rowName: string): string {
  return rowName.slice(2).toLocaleLowerCase();
}

function createInvoker(initialValue: EventValue) {
  const invoker: Invoker = (e: Event) => {
    invoker.value(e);
  };
  invoker.value = initialValue;
  return invoker;
}

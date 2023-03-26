export interface RouterHistory {
  location: string;
  push(to: string): void;
  replace(to: string): void;
  go(delta: number, triggerListeners?: boolean): void;
}

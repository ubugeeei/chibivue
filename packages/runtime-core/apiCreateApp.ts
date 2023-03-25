import { createVNode } from "./vnode";
import { type ComponentPublicInstance } from "./componentPublicInstance";
import { type RootRenderFunction } from "./renderer";
import { Component } from "./component";

export interface App<HostElement = any> {
  use(plugin: Plugin, ...options: any[]): App;
  mount(rootContainer: HostElement | string): void;
}

export type CreateAppFunction<HostElement> = (
  rootComponent: Component
) => App<HostElement>;

export type Plugin = {
  install: (app: App, ...options: any[]) => any;
};

export function createAppAPI<HostElement>(
  render: RootRenderFunction<HostElement>
): CreateAppFunction<HostElement> {
  return function createApp(rootComponent) {
    const installedPlugins = new Set();

    const app: App = {
      use(plugin: Plugin, ...options: any[]) {
        // skip duplicate plugins
        if (installedPlugins.has(plugin)) return app;

        installedPlugins.add(plugin);
        plugin.install(app, ...options);
        return app;
      },

      mount(rootContainer: HostElement) {
        const vnode = createVNode(rootComponent as ComponentPublicInstance);
        render(vnode, rootContainer);
      },
    };

    return app;
  };
}

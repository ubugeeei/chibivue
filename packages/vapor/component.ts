import { VNode } from "chibivue/runtime-core";
import {
  ComponentInternalInstance,
  LifecycleHook,
  setCurrentInstance,
  unsetCurrentInstance,
} from "chibivue/runtime-core/component";
import { LifecycleHooks } from "chibivue/runtime-core/enums";
import { VaporNode } from ".";

export type VaporComponent = () => VaporNode;

export interface VaporComponentInternalInstance {
  __is_vapor: true;
  uid: number;
  type: VaporComponent;
  isMounted: boolean;
  [LifecycleHooks.BEFORE_MOUNT]: LifecycleHook;
  [LifecycleHooks.MOUNTED]: LifecycleHook;
  [LifecycleHooks.BEFORE_UPDATE]: LifecycleHook;
  [LifecycleHooks.UPDATED]: LifecycleHook;
  [LifecycleHooks.BEFORE_UNMOUNT]: LifecycleHook;
  [LifecycleHooks.UNMOUNTED]: LifecycleHook;
}

let uid = 0;
export const createVaporComponentInstance = (
  vnode: VNode
): VaporComponentInternalInstance => {
  const instance: VaporComponentInternalInstance = {
    __is_vapor: true,
    uid: uid++,
    type: vnode.type as VaporComponent,
    isMounted: false,
    [LifecycleHooks.BEFORE_MOUNT]: null,
    [LifecycleHooks.MOUNTED]: null,
    [LifecycleHooks.BEFORE_UPDATE]: null,
    [LifecycleHooks.UPDATED]: null,
    [LifecycleHooks.BEFORE_UNMOUNT]: null,
    [LifecycleHooks.UNMOUNTED]: null,
  };
  return instance;
};

export const initialRenderVaporComponent = (
  instance: VaporComponentInternalInstance
): VaporNode => {
  setCurrentInstance(instance as any); //TODO: types
  const el = instance.type();
  unsetCurrentInstance();
  return el;
};

export const isVapor = (
  instance: ComponentInternalInstance | VaporComponentInternalInstance
): instance is VaporComponentInternalInstance => {
  return (instance as any).__is_vapor;
};

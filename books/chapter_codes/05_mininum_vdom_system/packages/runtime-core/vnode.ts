export interface VNode<HostNode = any> {
  type: string;
  props: VNodeProps;
  children: (VNode | string)[];

  el: HostNode | undefined;
}

export interface VNodeProps {
  [key: string]: any;
}

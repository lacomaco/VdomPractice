import { patch } from "./Maco";
export default class LacoView {
  constructor(componentFN) {
    this.componentFN = componentFN;
    this.__vNode = null;
  }

  render(props, effects) {
    this.__vNode = this.componentFN(props, effects);
    return this.__vNode;
  }

  update() {}

  reconcile(prev, next) {
    this.__vNode = patch(prev, next);
    return this.__vNode;
  }
}

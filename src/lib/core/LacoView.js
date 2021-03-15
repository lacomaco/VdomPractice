import { patch } from "./Maco";
import { h } from "snabbdom/h";
import MacoCore from "./Maco";
import { isString } from "../../util/is";
const { jsxToJson } = MacoCore;
export default class LacoView {
  constructor(componentFN) {
    this.componentFN = componentFN;
    this.__vNode = null;
  }

  render(props, effects) {
    this.vDomInfo = this.componentFN(props, effects);
    return this.__vNode;
  }

  bindLifeCycle() {}

  update() {}

  reconcile(prev, next) {
    this.__vNode = patch(prev, next);
    return this.__vNode;
  }

  createElement({ el, props, children }) {
    return h(
      el,
      props,
      children.map((child) => {
        if (isString(child)) {
          return child;
        }
        this.createElement(child);
      })
    );
  }
}

import { patch } from "./Maco";
import { h } from "snabbdom/h";
import { isString, isComponent } from "../../util/is";
export default class LacoView {
  constructor(componentFN) {
    this.componentFN = componentFN;
    this.__vNode = null;
  }

  render(props, effects, lifeCycle) {
    const vDomInfo = this.componentFN(props, effects);
    this.bindLifeCycle(vDomInfo, lifeCycle);
    return (this.__vNode = this.createElement(vDomInfo));
  }

  bindLifeCycle(vDomInfo, lifeCycle) {
    vDomInfo.props.hook = {
      remove: lifeCycle.remove,
    };
  }

  update(props, effects, lifeCycle) {
    const vDomInfo = this.componentFN(props, effects);
    this.bindLifeCycle(vDomInfo, lifeCycle);
    const vDom = this.createElement(vDomInfo);
    this.reconcile(this.__vNode, vDom);
  }

  reconcile(prev, next) {
    this.__vNode = patch(prev, next);
    return this.__vNode;
  }

  createElement({ el, props, children }) {
    if (isComponent(el)) {
      if (children.length !== 0) {
        props.children = children;
      }
      return el.__render(props);
    }

    return h(
      el,
      props,
      children.map((child) => {
        if (isString(child)) {
          return child;
        }
        return this.createElement(child);
      })
    );
  }
}

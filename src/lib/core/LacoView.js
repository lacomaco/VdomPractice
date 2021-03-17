import { patch } from "./Maco";
import { h } from "snabbdom/h";
import {
  isString,
  isComponent,
  isNumber,
  isFunction,
  isObject,
} from "../../util/is";
export default class LacoView {
  constructor(componentFN) {
    this.componentFN = componentFN;
    this.__vNode = null;
    this.__prevData = null;
  }

  render(props, effects, lifeCycle) {
    const vDomInfo = this.componentFN(props, effects);
    this.__prevData = vDomInfo;
    this.bindLifeCycle(vDomInfo, lifeCycle);
    return (this.__vNode = this.createElement(vDomInfo));
  }

  bindLifeCycle(vDomInfo, lifeCycle) {
    vDomInfo.props.hook = lifeCycle;
  }

  update(props, effects, lifeCycle) {
    const nextData = this.componentFN(props, effects);
    this.__prevData = this.diff(this.__prevData, nextData);
    this.bindLifeCycle(this.__prevData, lifeCycle);
    const vDom = this.createElement(this.__prevData);
    this.reconcile(this.__vNode, vDom);
  }

  reconcile(prev, next) {
    this.__vNode = patch(prev, next);
    return this.__vNode;
  }

  diff(prev, next) {
    const children =
      next.children &&
      next.children
        .map((child, index) => {
          const test = this.diff(prev.children[index], child);
          return test;
        })
        .filter((x) => x);

    if (!isString(next) && !isNumber(next)) {
      next.children = children;
    }

    if (prev && next && isComponent(prev.el) && isComponent(next.el)) {
      if (prev.el.mark === next.el.mark) {
        return { el: prev.el, props: next.props, children };
      } else {
        return { el: next.el, props: next.props, children };
      }
    }

    if (prev && !next) {
      return null;
    }

    if (!prev && next) {
      return next;
    }

    return next;
  }

  createElement(component) {
    if (isString(component) || isNumber(component)) {
      return component;
    }

    const { el, props, children } = component;

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
        return this.createElement(child);
      })
    );
  }
}

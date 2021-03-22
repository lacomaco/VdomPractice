import Maco, { patch } from "./Maco";
import { h } from "snabbdom/h";
import { isString, isComponent, isNumber, isSameKey } from "../util/is";
const { update } = Maco;

export default class LacoView {
  constructor(componentFN, model) {
    this.model = model;
    this.componentFN = componentFN;
    this.runComponentFN = (props, effects) => {
      const renderData = this.componentFN(props, effects);
      return renderData;
    };
    this.__vNode = null;
    this.__prevData = null;
  }

  render(props, effects, lifeCycle) {
    const vDomInfo = this.runComponentFN(props, effects);
    this.__prevData = vDomInfo;
    this.bindLifeCycle(vDomInfo, lifeCycle);
    return (this.__vNode = this.createElement(vDomInfo));
  }

  bindLifeCycle(vDomInfo, lifeCycle) {
    vDomInfo.props.hook = lifeCycle;
  }

  update(props, effects, lifeCycle) {
    const nextData = this.runComponentFN(props, effects);
    this.__diff(this.__prevData, nextData, [this.__prevData]);
    this.__prevData = nextData;
    this.bindLifeCycle(this.__prevData, lifeCycle);
    this.__vNode = this.createElement(this.__prevData);
  }

  reconcile(prev, next) {
    this.__vNode = patch(prev, next);
    return this.__vNode;
  }

  __diff(prev, next, prevSibling) {
    if (next && isComponent(next.el)) {
      const sameComponent = prevSibling.find((component) => {
        if (
          isComponent(component.el) &&
          component.el.marker === next.el.marker &&
          isSameKey(component.el.getKey(), next.props.props.key)
        ) {
          return true;
        }
        return false;
      });

      if (sameComponent) {
        next.el = sameComponent.el;
        next.el.__update(next.props);
      }
    }

    next.children &&
      next.children.map((child, index) => {
        return this.__diff(prev.children[index], child, prev.children);
      });
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

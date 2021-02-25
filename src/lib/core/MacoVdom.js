import { h } from "snabbdom/h";
const MacoVdom = {
  createElement: (el, props, ...children) => {
    return h(el, props, children);
  },
};

export default MacoVdom;

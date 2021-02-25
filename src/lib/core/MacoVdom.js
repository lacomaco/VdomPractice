import { h } from "snabbdom/h";
const MacoVDom = {
  createElement: (el, props, ...children) => {
    return h(el, props, children);
  },
};

export default MacoVdom;

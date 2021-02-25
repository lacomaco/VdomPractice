import { h } from "snabbdom/h";
const MacoVDom = {
  createElement: (el, props, ...children) => {
    return h(
      el,
      props,
      children.flatMap((x) => x)
    );
  },
};

export default MacoVDom;

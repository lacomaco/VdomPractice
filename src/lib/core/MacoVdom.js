import { h } from "snabbdom/h";
import { isFunction } from "../../util/is";
const MacoVDom = {
  createElement: (el, props, ...children) => {
    if (isFunction(el)) {
      return el();
    }
    return h(
      el,
      props,
      children.flatMap((x) => x)
    );
  },
};

export default MacoVDom;

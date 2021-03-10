"use strict";
import Maco, { patch } from "./Maco";

export default function Laco(fn) {
  let hooks = [];
  let afterHooks = [];
  let cursor = 0;
  let __vNode = undefined;
  let componentFunction = fn;
  let __props = undefined;

  const setUpVNode = (v_node) => {
    __vNode = v_node;
  };

  const __render = (props, effects) => {
    __props = props;
    __vNode = componentFunction(props, effects);
    cursor = 0;
    return __vNode;
  };

  const __update = () => {
    cursor = 0;
    __vNode = patch(
      __vNode,
      Maco.createElement({ setUpVNode, __render, __update, effects }, __props)
    );
  };

  const effects = {
    useState: (initValue) => {
      const currentCursor = cursor;
      hooks[currentCursor] = hooks[currentCursor] || [
        initValue,
        (value) => {
          if (hooks[currentCursor] !== value) {
            hooks[currentCursor][0] = value;
            __update();
          }
        },
      ];
      cursor++;
      return [...hooks[currentCursor]];
    },
    useEffect: () => {},
  };

  return {
    setUpVNode,
    __render,
    __update,
    effects,
  };
}

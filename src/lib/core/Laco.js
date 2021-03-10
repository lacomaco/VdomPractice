import { patch } from "./Maco";

export default function Laco(fn) {
  let hooks = [];
  let afterHooks = [];
  let cursor = [];
  let __vNode = undefined;
  let componentFunction = fn;

  return {
    setUpVNode: (v_node) => {
      __vNode = v_node;
    },
    __render: (props, effects) => {
      return (__vNode = componentFunction(props, effects));
    },
    __update: (afterVNode) => {
      __vNode = patch(__vNode, afterVNode);
    },
    effects: {
      useState: () => {},
      useEffect: () => {},
    },
  };
}

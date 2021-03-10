"use strict";
import Maco, { patch } from "./Maco";

export default function LacoFactory(fn) {
  return () => {
    let hooks = [];
    let afterHooks = [];
    let cursor = 0;
    let __vNode = undefined;
    let componentFunction = fn;
    let __props = undefined;

    const addLifeCycle = (props) => {
      if (!props["hook"]) {
        props.hook = {};
        props.hook.remove = () => {};
        props.hook.destroy = () => {};
        props.hook.update = () => {};
      }
    };

    const setUpVNode = (v_node) => {
      __vNode = v_node;
    };

    const __render = (props, effects) => {
      __props = props || {};
      //unmount 라이프 사이클 구조 추가
      addLifeCycle(__props);
      __props.hook.remove = () => {
        console.log("remove Called");
        afterHooks.forEach((fn) => fn());
      };
      __vNode = componentFunction(__props, effects);
      cursor = 0;
      return __vNode;
    };

    const __update = () => {
      cursor = 0;
      __vNode = patch(
        __vNode,
        Maco.createElement(
          () => ({
            setUpVNode,
            __render,
            __update,
            effects,
          }),
          __props
        )
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
      useEffect: (callback, diffArray = []) => {
        const currentCursor = cursor;
        let cleanUp = undefined;

        if (!__vNode) {
          cleanUp = callback();
          hooks[currentCursor] = diffArray;
        } else {
          const isChanged = !hooks[currentCursor].every(
            (elm, i) => elm === diffArray[i]
          );

          if (isChanged) {
            cleanUp = callback();
            hooks[currentCursor] = diffArray;
          }
        }

        if (!cleanUp) {
          afterHooks.push(cleanUp);
        }
        cursor++;
      },
    };
    return {
      setUpVNode,
      __render,
      __update,
      effects,
    };
  };
}

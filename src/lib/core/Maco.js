import { init } from "snabbdom/init";
import { classModule } from "snabbdom/modules/class";
import { propsModule } from "snabbdom/modules/props";
import { styleModule } from "snabbdom/modules/style";
import { eventListenersModule } from "snabbdom/modules/eventlisteners";
import { h } from "snabbdom/h";
import { isFunction } from "../../util/is";

const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);

const Maco = {
  createElement: (el, props, ...children) => {
    props = props || {};
    const prop = {};
    const event = {};
    let style = {};
    let dataset = {};
    Object.keys(props).forEach((key) => {
      if (key.startsWith("on")) {
        const name = key.substring(2).toLowerCase();
        event[name] = props[key];
      } else if (key === "style") {
        style = props[key];
      } else if (key === "dataSet") {
        dataset = props[key];
      } else {
        prop[key] = props[key];
      }
    });

    props = {
      on: {
        ...event,
      },
      style,
      dataset,
      props: {
        ...prop,
      },
    };

    if (isFunction(el)) {
      return el(props);
    }

    return h(
      el,
      props,
      children.flatMap((x) => x)
    );
  },
};

export const MacoCore = (function () {
  const hooks = [];
  let cursor = 0;
  let domEntry = null;
  let rootDom = null;
  let firstRender = true;

  function __update() {
    const afterDom = domEntry();
    rootDom = patch(rootDom, afterDom);
    cursor = 0;
  }

  return {
    render: (container, vDom) => {
      domEntry = vDom;
      rootDom = patch(container, vDom());
      firstRender = false;
      cursor = 0;
      return rootDom;
    },
    useState: (initialValue) => {
      const currentCursor = cursor;

      if (firstRender) {
        hooks[currentCursor] = [
          initialValue,
          (value) => {
            if (hooks[currentCursor] !== value) {
              hooks[currentCursor][0] = value;
              __update();
            }
          },
        ];
      }
      cursor++;
      return [...hooks[currentCursor]];
    },
    useEffect: (callback, diffArray) => {
      const currentCursor = cursor;
      if (firstRender) {
        callback();
        hooks[currentCursor] = diffArray;
      } else {
        const isChanged = !hooks[currentCursor].every(
          (elm, i) => elm === diffArray[i]
        );

        if (isChanged) {
          callback();
          hooks[currentCursor] = diffArray;
        }
      }
      cursor++;
    },
  };
})();

export default Maco;

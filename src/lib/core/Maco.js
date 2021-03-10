import { init } from "snabbdom/init";
import { classModule } from "snabbdom/modules/class";
import { propsModule } from "snabbdom/modules/props";
import { styleModule } from "snabbdom/modules/style";
import { eventListenersModule } from "snabbdom/modules/eventlisteners";
import { h } from "snabbdom/h";
import { isFunction, isObject } from "../../util/is";

export const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);

const Maco = (function () {
  let domEntry = null;
  let rootDom = null;

  return {
    createElement: (el, props, ...children) => {
      props = props || {};
      const prop = {};
      const event = {};
      let style = {};
      let dataset = {};
      let key = undefined;
      Object.keys(props).forEach((key) => {
        if (key.startsWith("on")) {
          const name = key.substring(2).toLowerCase();
          event[name] = props[key];
        } else if (key === "style") {
          style = props[key];
        } else if (key === "dataSet") {
          dataset = props[key];
        } else if (key === "key") {
          key = props[key];
        } else {
          prop[key] = props[key];
        }
      });

      props = {
        hook: {
          ...props["hook"],
        },
        on: {
          ...event,
        },
        style,
        dataset,
        props: {
          ...prop,
        },
        key,
      };

      if (isFunction(el)) {
        const createdElement = el();
        return createdElement.__render(props, createdElement.effects);
      }

      return h(
        el,
        props,
        children.flatMap((x) => x)
      );
    },

    render: (container, vDom) => {
      const createdElement = vDom();
      rootDom = patch(container, createdElement.__render());
      return rootDom;
    },
  };
})();

export default Maco;

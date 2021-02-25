import { init } from "snabbdom/init";
import { classModule } from "snabbdom/modules/class";
import { propsModule } from "snabbdom/modules/props";
import { styleModule } from "snabbdom/modules/style";
import { eventListenersModule } from "snabbdom/modules/eventlisteners";
import { h } from "snabbdom/h"; // helper function for creating vnodes

var patch = init([classModule, propsModule, styleModule, eventListenersModule]);
const container = document.querySelector("#container");

const click = () => {
  console.log("domClick");
};

const changeNewNode = (original) => {
  console.log("===============================================");
  console.log("beforePatch");
  console.log("original", original);
  return patch(original, h("div", {}, "Changed"));
};

const vnode = h(
  "div",
  {
    on: {
      click,
    },
    props: {
      className: "hi",
    },
    babo: {
      zz: "zz",
    },
    key: 123,
    hook: {
      init: () => {
        console.log("===============================================");
        console.log("init");
      },
      create: () => {
        console.log("===============================================");
        console.log("created");
      },
      insert: () => {
        console.log("===============================================");
        console.log("inserted");
      },
      prepatch: () => {
        console.log("===============================================");
        console.log("prepatched");
      },
      destroy: () => {
        console.log("===============================================");
        console.log("im destroied");
      },
      remove: (vnode, removeCallback) => {
        console.log("===============================================");
        console.log("remove");
        console.log(vnode);
        removeCallback();
        console.log("===============================================");
      },
      post: () => {
        console.log("===============================================");
        console.log("patch");
      },
    },
  },
  ["this is V-node", h("span", {}, "this is span")]
);
const returned = patch(container, vnode);
console.log(returned, "hi");
console.log(returned === vnode);
const newNode = changeNewNode(returned);
console.log(newNode, "new Node");

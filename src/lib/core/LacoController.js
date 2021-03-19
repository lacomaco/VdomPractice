import Maco from "./Maco";
const { update } = Maco;
export default class LacoController {
  constructor(view, model, marker) {
    this.view = view;
    this.model = model;
    this._isVNode = true;
    this.marker = marker;
    this.effects();
  }

  // rendering된 snabbdom의 virtual-node가 리턴되어야함.
  __render(props) {
    this.model.setProps(props);
    this.view.render(props, this.effects, this.model.getHooks());
    this.model.resetCursor();
    return this.view.__vNode;
  }

  __update() {
    this.view.update(this.model.props, this.effects, this.model.getHooks());
    this.model.resetCursor();
    return this.getVNode();
  }

  getKey() {
    return this.model.getKey();
  }

  getVNode() {
    return this.view.__vNode;
  }

  effects() {
    this.effects = {
      useState: (initVal) => {
        const cursor = this.model.cursor;
        const hooks = this.model.hooks;

        hooks[cursor] = hooks[cursor] || [
          initVal,
          (val) => {
            if (hooks[cursor] !== val) {
              hooks[cursor][0] = val;
              //this.__update();
              update();
            }
          },
        ];

        this.model.cursor++;
        return [...hooks[cursor]];
      },
      useEffect: (callback, diffArray = []) => {
        const cursor = this.model.cursor;
        const hooks = this.model.hooks;
        const afterCursor = this.model.afterHookCursor;
        const afterHooks = this.model.afterHooks;

        let cleanUp = undefined;

        if (!hooks[cursor]) {
          cleanUp = callback();
          hooks[cursor] = diffArray;
        } else {
          const isChanged = !hooks[cursor].every(
            (elm, i) => elm === diffArray[i]
          );

          if (isChanged) {
            cleanUp = callback();
            hooks[cursor] = diffArray;
          }
        }

        if (cleanUp) {
          this.model.afterHookCursor++;
          afterHooks[afterCursor] = cleanUp;
        }

        this.model.cursor++;
      },
    };
  }
}

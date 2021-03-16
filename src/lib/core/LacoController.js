export default class LacoController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this._isVNode = true;
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
              this.__update(this.model.props);
            }
          },
        ];

        this.model.cursor++;
        return [...hooks[cursor]];
      },
      useEffect: (callback, diffArray = []) => {
        const cursor = this.model.cursor;
        const hooks = this.model.hooks;
        const afterCursor = this.model.afterCursor;
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
          this.model.afterCursor++;
          afterHooks[afterCursor] = cleanUp;
        }

        this.model.cursor++;
      },
    };
  }
}

export default class LacoController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this._isVNode = true;
  }
  // rendering된 snabbdom의 virtual-node가 리턴되어야함.
  __render(props) {
    this.model.setProps(props);
    this.view.render(
      props,
      {
        useState: this.useState,
        useEffect: this.useEffect,
      },
      this.model.hook
    );
    return this.view.__vNode;
  }
  __update(props) {
    this.model.cursor = 0;
    this.model.afterHookCursor = 0;
  }
  useState(initVal) {
    const cursor = this.model.cursor;
    const hooks = this.model.hooks;

    hooks[cursor] = hooks[cursor] || [
      initVal,
      (val) => {
        if (hooks[cursor] !== val) {
          hooks[val][0] = val;
          this.__update(this.model.props);
        }
      },
    ];

    this.model.cursor++;
    return [...hooks[cursor]];
  }
  useEffect(callback, diffArray = []) {
    const cursor = this.model.cursor;
    const hooks = this.model.hooks;
    const afterCursor = this.model.afterCursor;
    const afterHooks = this.model.afterHooks;

    let cleanUp = undefined;

    if (!hooks[cursor]) {
      cleanUp = callback();
      hooks[cursor] = callback;
    } else {
      const isChanged = !hooks[cursor].every((elm, i) => elm === diffArray[i]);

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
  }
}

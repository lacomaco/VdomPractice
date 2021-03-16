export default class LacoModel {
  constructor() {
    this.props = null;
    this.cursor = 0;
    this.afterHookCursor = 0;
    this.hooks = [];
    this.afterHooks = [];
  }

  setProps(props) {
    this.props = props;
  }

  getHook() {
    return this.hooks[this.cursor];
  }

  increaseCursor() {
    this.cursor++;
  }

  resetCursor() {
    this.cursor = 0;
  }

  getHooks() {
    return {
      remove: (vNode, cb) => {
        this.afterHooks.forEach((hook) => hook());
        cb();
      },
    };
  }
}

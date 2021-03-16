export default class LacoModel {
  constructor() {
    this.props = null;
    this.cursor = 0;
    this.afterHookCursor = 0;
    this.hooks = [];
    this.afterHooks = [];
    this.hook = {};
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

  setUnMountHook(cn) {}

  getHooks() {}
}

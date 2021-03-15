export class LacoModel {
  constructor() {
    this.props = null;
    this.cursor = 0;
    this.hooks = [];
    this.afterHooks = [];
    this.hook = {};
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
}

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
  __update(props) {}
  useState(initVal) {}
  useEffect(callback, diffArray = []) {}
}

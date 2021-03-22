import LacoController from "./LacoController";
import LacoModel from "./LacoModel";
import LacoView from "./LacoView";

export default function (componentFN) {
  const componentMarker = Symbol();
  return () => {
    const model = new LacoModel();
    const view = new LacoView(componentFN, model);
    const controller = new LacoController(view, model, componentMarker);
    return controller;
  };
}

import LacoController from "./LacoController";
import LacoModel from "./LacoModel";
import LacoView from "./LacoView";

export default function (componentFN) {
  const componentMarker = Symbol();
  return () => {
    const view = new LacoView(componentFN);
    const model = new LacoModel();
    const controller = new LacoController(view, model, componentMarker);
    return controller;
  };
}

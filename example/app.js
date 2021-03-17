import MacoCore, { patch } from "../lib/core/Maco";
import Main from "./main";

const { render } = MacoCore;

let container = document.querySelector("#container");

render(container, Main);

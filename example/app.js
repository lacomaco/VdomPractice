import MacoCore, { patch } from "../src/lib/core/Maco";
import Main from "./main";
import "./style.css";

const { render } = MacoCore;

let container = document.querySelector("#container");

render(container, Main);

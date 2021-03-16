export const isFunction = (fn) => typeof fn === "function";
export const isString = (str) => typeof str === "string";
export const isNumber = (num) => typeof num === "number";
export const isObject = (obj) => typeof obj === "object";
export const isComponent = (obj) => obj._isVNode || false;

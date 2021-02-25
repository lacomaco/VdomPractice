module.exports = {
  presets: [
    ["@babel/preset-env", { useBuiltIns: "usage", corejs: { version: 2 } }],
    [
      "@babel/preset-react",
      {
        pragma: "MacoVDom.createElement",
        throwIfNamespace: false,
      },
    ],
  ],
};

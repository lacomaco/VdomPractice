module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "79",
          ie: "11",
        },
      },
    ],
  ],
  plugins: [
    [
      "@babel/plugin-transform-react-jsx",
      {
        pragma: "Maco.createElement", // 기본값은 React.createElement
        throwIfNamespace: false,
      },
    ],
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-arrow-functions",
  ],
};

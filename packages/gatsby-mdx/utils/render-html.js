const MDXRenderer = require("../mdx-renderer");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { MDXTag } = require("@mdx-js/tag");

module.exports = function renderHTML(rawMDX, scopeOverride) {
  const scope = {
    ...scopeOverride,
    React,
    MDXTag
  };

  return renderToStaticMarkup(
    React.createElement(MDXRenderer, { scope }, rawMDX)
  );
};

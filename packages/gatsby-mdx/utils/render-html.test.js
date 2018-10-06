const renderHTML = require("./render-html");
const { genMDX } = require("./gen-mdx");
const defaultOptions = require("./default-options");

test("renderHTML works for simple compiled MDX", async () => {
  const renderedJS = `return () => React.createElement(MDXTag, {
    name: "wrapper",
    components: components
  }, React.createElement(MDXTag, {
    name: "h1",
    components: components
  }, "Hello"), React.createElement(MDXTag, {
    name: "ul",
    components: components
  }, React.createElement(MDXTag, {
    name: "li",
    components: components,
    parentName: "ul"
  }, React.createElement(MDXTag, {
    name: "p",
    components: components,
    parentName: "li"
  }, "World!"))));`;

  expect(renderHTML(renderedJS)).toBe(
    "<div><h1>Hello</h1><ul><li><p>World!</p></li></ul></div>"
  );
});

test("renderHTML works end-to-end", async () => {
  const rawBody = `
# Hello

* World!
  `;

  const { body } = await genMDX({ rawBody }, defaultOptions());

  expect(renderHTML(body)).toBe(
    "<div><h1>Hello</h1><ul><li><p>World!</p></li></ul></div>"
  );
});

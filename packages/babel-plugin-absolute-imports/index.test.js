const Plugin = require(".");

const babel = require("@babel/core");

describe("babel-plugin-absolute-imports", () => {
  test("rewrites relative imports", () => {
    const testContents = `import blah from './blah';`;
    const instance = new Plugin();
    const result = babel.transform(testContents, {
      configFile: false,
      plugins: [[instance.plugin, { importRoot: "/test/root" }]],
      presets: [require("@babel/preset-react")]
    });

    expect(result.code).toEqual(`import blah from '/test/root/./blah';`);
  });

  test("doesn't rewrite absolute imports", () => {
    const testContents = `import blah from '/blah';`;
    const instance = new Plugin();
    const result = babel.transform(testContents, {
      configFile: false,
      plugins: [[instance.plugin, { importRoot: "/test/root" }]],
      presets: [require("@babel/preset-react")]
    });

    expect(result.code).toEqual(`import blah from '/blah';`);
  });

  test("doesn't rewrite imports from module.paths", () => {
    const testContents = `import blah from 'blah';`;
    const instance = new Plugin();
    const result = babel.transform(testContents, {
      configFile: false,
      plugins: [[instance.plugin, { importRoot: "/test/root" }]],
      presets: [require("@babel/preset-react")]
    });

    expect(result.code).toEqual(`import blah from 'blah';`);
  });
});

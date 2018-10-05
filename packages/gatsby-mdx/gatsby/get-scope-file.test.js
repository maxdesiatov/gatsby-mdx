const { resolveModules } = require("./get-scope-file");

test("resolveModules correctly rewrites import", async () => {
  const js = `import blah from './blah'`;
  const { code } = resolveModules(js, "/test/blah");
  expect(code).toBe(`"use strict";

var _blah = _interopRequireDefault(require("/test/blah/./blah"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }`);
});

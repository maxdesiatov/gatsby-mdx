const declare = require("@babel/helper-plugin-utils").declare;

module.exports = class Plugin {
  constructor() {
    this.plugin = declare(api => {
      api.assertVersion(7);

      return {
        visitor: {
          ImportDeclaration(path, state) {
            const source = path.get("source");
            const sourcePath = source.node.value;
            const { importRoot } = state.opts;

            if (sourcePath.startsWith(".")) {
              const replacement = `'${importRoot}/${sourcePath}'`;
              source.replaceWithSourceString(replacement);
            }
          }
        }
      };
    });
  }
};

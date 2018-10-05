const crypto = require("crypto");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const path = require("path");
const babel = require("@babel/core");
const ImportRewriter = require("babel-plugin-absolute-imports");
const { MDX_SCOPES_LOCATION } = require("../constants");

const debug = require("debug")("gatsby-mdx:get-scope-file");

function resolveModules(scopeFileContent, importRoot) {
  const instance = new ImportRewriter();
  return babel.transform(scopeFileContent, {
    plugins: [
      [
        instance.plugin,
        {
          importRoot
        }
      ]
    ],
    presets: [require("@babel/preset-env")]
  });
}

async function getScopeFile(
  scopeRoot,
  importsRoot,
  scopeImports,
  scopeIdentifiers
) {
  const createFilePath = (directory, filename, ext) =>
    path.join(directory, MDX_SCOPES_LOCATION, `${filename}${ext}`);

  const createHash = str =>
    crypto
      .createHash(`md5`)
      .update(str)
      .digest(`hex`);

  debug(`scopeRoot is ${scopeRoot}`);
  debug(`scopeImports is ${JSON.stringify(scopeImports)}`);

  const scopeFileContent = `${scopeImports.join("\n")}

export default { ${scopeIdentifiers.join(", ")} }`;

  const filePath = createFilePath(
    scopeRoot,
    createHash(scopeFileContent),
    ".js"
  );
  const result = resolveModules(scopeFileContent, importsRoot);
  await writeFileAsync(filePath, result.code);
  debug(`scope file written to ${filePath}`);
  return filePath;
}

module.exports = {
  getScopeFile,
  resolveModules
};

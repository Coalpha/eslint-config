const fs = require("fs");
const { join } = require("path");
const { load } = require("js-yaml");

const resolveYAML = location => load(fs.readFileSync(location, "utf8"));
const base = resolveYAML("base.yml");
function minify(str) {
  switch (String(str)) {
    case "warn":
      return 1;
    case "error":
      return 2;
    default:
      return str;
  }
}

const rulesDir = join(__dirname, "rules");
base.rules = Object.assign({}, ...["best-practices", "errors", "node", "style", "variables"]
  .map(fileName => Object.entries(resolveYAML(join(rulesDir, `${fileName}.yml`)))
    .map(([_, rule]) => [_, Array.isArray(rule) ? [minify(rule[0]), ...rule.slice(1)] : minify(rule)])
    .reduce((o, [k, v]) => ({ ...o, [k]: v }), {})));
fs.writeFileSync(
  join(__dirname, "index.js"),
  `module.exports=${JSON.stringify(base).replace(/"(\w+)":/g, "$1:")}`
);

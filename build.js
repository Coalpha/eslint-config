const fs = require("fs");
const path = require("path");
const { load } = require("js-yaml");

const resolveYAML = location => load(fs.readFileSync(location, "utf8"), { noCompatMode: true });

const base = resolveYAML("base.yml");

function minify(str) {
  switch (`${str}`) {
    case "false":
      return 0
    case "true":
    case "warn":
      return 1
    case "error":
      return 2
    default:
      return str;
  }
}
base.rules = Object.assign(
  Object.create(null),
  ...["best-practices", "errors", "node", "style", "variables"]
  .map(fileName => {
    const rules = resolveYAML(`./rules/${fileName}.yml`);
    Object.keys(rules).forEach(key => {
      const val = rules[key];
      rules[key] = Array.isArray(val) ? [minify(val[0]), ...val.slice(1)] : minify(val);
    });
    return rules;
  })
);
fs.writeFileSync(
  path.join(__dirname, "index.js"),
  `module.exports=${JSON.stringify(base).replace(/"(\w+)":/g, "$1:")}`
);


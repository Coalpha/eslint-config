const fs = require("fs");
const path = require("path");
const { load } = require("js-yaml");

const resolveYAML = location => load(fs.readFileSync(location, "utf8"), { noCompatMode: true });

const base = resolveYAML("base.yml");

function minify(str) {
  switch (`${str}`) {
    case "false":
      return 0;
    case "true":
    case "warn":
      return 1;
    case "error":
      return 2;
    default:
      return str;
  }
}
const fromEntries = pairs => pairs.reduce((o, [k, v]) => (o[k] = v, o), {});
base.rules = {
  ...["best-practices", "errors", "node", "style", "variables"]
    .map(fileName => fromEntries(
      Object.entries(resolveYAML(`./rules/${fileName}.yml`)).map(([_, rule]) => [_,
        Array.isArray(rule)
          ? [minify(rule[0]),
            ...rule.slice(1).map(arg => typeof arg === "object" && !Array.isArray(arg)
              ? fromEntries(
                Object.entries(arg).map(([_, val]) => [_, minify(val)])
              ) : arg)] : minify(rule)])
    ))
};
fs.writeFileSync(
  path.join(__dirname, "index.js"),
  `module.exports=${JSON.stringify(base).replace(/"(\w+)":/g, "$1:")}`
);


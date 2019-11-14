const fs = require("fs");
const YAML = require("yaml");

const outfile = JSON.parse(fs.readFileSync("package.json")).main;
var base = fs.readFileSync("base.yml", "utf8");
var base = YAML.parse(base);
base.rules = {};
const rules_dir = fs.readdirSync("rules");

const int_warnlevel = { off: 0, warn: 1, error: 2 };

for (const filename of rules_dir) {
   const raw_yaml = fs.readFileSync(`./rules/${filename}`, "utf8");
   const these_rules = YAML.parse(raw_yaml);
   for (const [key, val] of Object.entries(these_rules)) {
      let warnlevel;
      if (base.rules.hasOwnProperty(key)) {
         console.error(`Duplicate property "${key}" in ${filename}`);
         process.exit(0);
      } else if (Array.isArray(val)) {
         warnlevel = int_warnlevel[val[0]];
         val[0] = warnlevel;
      } else {
         warnlevel = int_warnlevel[val];
      }
      if (warnlevel !== 0) {
         base.rules[key] = val;
      }
   }
}

const jsobj = JSON.stringify(base).replace(/"(\w+)":/g, "$1:");
fs.writeFileSync(outfile, `module.exports=${jsobj}`);

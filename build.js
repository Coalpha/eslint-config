const fs = require("fs");
const YAML = require("yaml");

const outfile = JSON.parse(fs.readFileSync("package.json")).main;
var base = fs.readFileSync("base.yml", "utf8");
var base = YAML.parse(base);
base.rules = {};
const rules_dir = fs.readdirSync("rules");

// convert the warnlevels into something compact
const int_warnlevel = { off: 0, warn: 1, error: 2 };

for (const filename of rules_dir) {
   // ignore non .yml files
   if (!filename.endsWith(".yml")) {
      continue;
   }
   const raw_yaml = fs.readFileSync(`./rules/${filename}`, "utf8");
   const these_rules = YAML.parse(raw_yaml);
   for (const [key, val] of Object.entries(these_rules)) {
      let warnlevel;
      if (base.rules.hasOwnProperty(key)) {
         // prevent errors where I accidentally included a rule twice
         console.error(`Duplicate property "${key}" in ${filename}`);
         process.exit(0);
      } else if (Array.isArray(val)) {
         // if a rule is given an array,
         // the warn level is always in index 0
         warnlevel = int_warnlevel[val[0]];
         val[0] = warnlevel;
      } else {
         warnlevel = int_warnlevel[val];
      }
      // removes rules where the warnlevel is 0
      if (warnlevel !== 0) {
         base.rules[key] = val;
      }
   }
}

// JSON.parse is faster than a bare object in V8
// it probably doesn't matter but might as well
const outJSON = JSON.stringify(base);
fs.writeFileSync(
   outfile,
   `module.exports=JSON.parse('${outJSON}');`,
);

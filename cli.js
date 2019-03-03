#!/usr/bin/env node
const c = require("ansi-colors");
const File = require("./File");
const yaml = require("js-yaml");

const e = require("enquirer");
const { spawn } = require("child_process");

/* eslint-disable no-process-exit */
function error(msg, exit) {
  console.error(msg);
  process.exit(exit);
}
const packageJSON = new File("package.json");
if (!packageJSON.exists()) {
  error(`"${packageJSON.path}" does not exist!`);
}
console.info(`Setting up @coalpha/eslint-config in "${c.magentaBright(File.cwd)}"`);
const eslintConfigFiles = [
  ["JS", new File(".eslintrc.js")],
  ["JSON", new File(".eslintrc.json")],
  ["YAML", new File(".eslintrc.yaml")],
  ["YAML", new File(".eslintrc.yml")],
].filter(([lang, file]) => file.exists());
{
  const noExt = new File(".eslintrc");
  if (noExt.exists()) {
    try {
      eslintConfigFiles.push(["JSON", noExt]);
    } catch (e) {
      eslintConfigFiles.push(["YAML", noExt]);
    }
  }
}
packageJSON.asJSON();
let needsNPMInstall = true;
if (
  packageJSON.obj.devDependencies
  && packageJSON.obj.devDependencies["@coalpha/eslint-config"]
  && packageJSON.obj.devDependencies.eslint
) {
  needsNPMInstall = false;
}
if (packageJSON.obj.eslintConfig) {
  eslintConfigFiles.push([
    "JSON", new Proxy(packageJSON, {
      get(o, k) {
        if (k === "obj") {
          return o.data.eslintConfig;
        }
        if (k === "delete") {
          return () => {
            delete o.data.eslintConfig;
            o.encodeAsJSON();
            o.write();
          };
        }
        if (k === "asJSON") {
          return () => 1;
        }
        const v = o[k];
        return o[k];
      },
      set(o, k, v) {
        if (k === "obj") {
          o.data.eslintConfig = v;
          o.is = "obj";
          return true;
        }
        return o[k] = v;
      },
    })
  ]);
}
const interrupt = () => error(c.bold.bgRedBright("Interrupt"), 0);
(async () => {
  let hasChosenFormat = false;
  let configLang;
  let base = new File("placeholder");
  if (eslintConfigFiles.length) {
    const w = eslintConfigFiles.length > 1 ? ["several", "s", "them"] : ["an", "", "it"];
    const startOverPrompt = new e.Toggle({
      message: `You already have ${w[0]} eslint configuration${w[1]}. Would you like to delete ${w[2]}?`,
      enabled: "Delete",
      disabled: "Modify",
    });
    startOverPrompt.on("cancel", interrupt);
    if (await startOverPrompt.run()) {
      packageJSON.encodeAsJSON();
    } else {
      let theLang, theFile;
      if (eslintConfigFiles.length > 1) {
        const whichToModify = new e.Select({
          message: "Which config file do you want to modify?",
          symbols: { indicator: ">" },
          choices: eslintConfigFiles.map(([lang, file], index) => {
            if (lang === "JS") {
              return { name: file.fileName, disabled: true, hint: "(cannot modify JS configs)" };
            }
            return { message: file.fileName, name: `${index}` };
          }),
        });
        whichToModify.on("cancel", interrupt);
        [theLang, theFile] = eslintConfigFiles[await whichToModify.run()];
      } else {
        [[theLang, theFile]] = eslintConfigFiles;
      }
      try {
        if (theLang === "JSON") {
          try {
            theFile.asJSON();
            configLang = "JSON";
          } catch (e) {
            console.error(e);
            configLang = "JSON";
            theFile.asYAML();
          }
        } else if (theLang === "YAML") {
          theFile.asYAML();
          configLang = "YAML";
        } else {
          throw Error("How did you even select that?");
        }
        hasChosenFormat = true;
        base = theFile;
      } catch (e) {
        let x = 20;
        while (x-- > 0) {
          console.error(c.yellowBright(`Couldn't read ${theFile.path}`));
          console.error(e);
        }
      }
    }
  }
  const config = base.obj;
  config.extends = "@coalpha";
  if (!config.env || typeof config.env !== "object") {
    config.env = {};
  }
  const env = new e.MultiSelect({
    message: `What environments are you coding for? (Space to select)\n${
      c.dim("https://eslint.org/docs/user-guide/configuring#specifying-environments")
    }`,
    symbols: { indicator: ">" },
    initial: Object.keys(config.env),
    choices: [
      "node",
      "browser",
      "shared-node-browser",
      { role: "separator" },
      "commonjs",
      "amd",
      { role: "separator" },
      "serviceworker",
      "worker",
      { role: "separator" },
      "jasmine",
      "jest"
    ],
  });
  env.on("cancel", interrupt);
  const desiredEnv = (await env.run());
  config.env = {};
  desiredEnv.forEach(envOpt => config.env[envOpt] = true);
  if (!hasChosenFormat) {
    const format = new e.Select({
      message: "What format should .eslintrc be in?",
      choices: ["YAML", "JSON", "JavaScript"]
    });
    format.on("cancel", interrupt);
    switch (await format.run()) {
      case "YAML":
        base.fileName = ".eslintrc.yml";
        configLang = "YAML";
        break;
      case "JSON":
        base.fileName = ".eslintrc.json";
        configLang = "JSON";
        break;
      case "JavaScript":
        base.fileName = ".eslintrc.js";
        configLang = "JS";
        break;
      // no default
    }
  }
  base.obj = config;
  base[`encodeAs${configLang}`](true);
  eslintConfigFiles.forEach(([lang, file]) => file.delete());
  base.write();
  if (needsNPMInstall) {
    const packages = ["eslint", "@coalpha/eslint-config"];
    const args = ["install", "--save-dev", ...packages];
    const opts = { cwd: process.cwd(), stdio: "inherit" };
    const npm = process.platform === "win32" ? "npm.cmd" : "npm";
    const install = spawn(npm, args, opts);
    process.removeAllListeners("SIGINT");
    process.on("SIGINT", () => {
      install.kill();
      interrupt();
    });
    install.on("error", err => error(c.red`Failed to spawn subprocess. Do you have npm installed?`, 11));
    install.on("close", (code) => { if (code !== null) console.log(`Installing Finished with code ${code}`); });
  }
})();

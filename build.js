const File = require("./File");

const base = new File("base.yml").asYAML();

const rulesArray = File.readDir("rules").map(file => file.asYAML().obj);
base.obj.rules = Object.assign({}, ...rulesArray);
base.encodeAsJS();
base.fileName = "index.js";
base.write();

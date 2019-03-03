const fs = require("fs");
const YAML = require("js-yaml");
const paths = require("path");

let cwd = process.cwd();
class File {
  static get cwd() { return cwd; }

  static set cwd(path) { cwd = paths.join(cwd, path); }

  static here(path) { return cwd ? paths.join(cwd, path) : path; }

  static readDir(path = "") {
    return fs.readdirSync(File.here(path)).map(fileName => new File(paths.join(path, fileName)));
  }

  constructor(path, ignoreCWD = false) {
    this.__path = File.here(path);
  }

  set text(text) {
    this.data = text;
    this.is = "text";
  }

  set obj(obj) {
    this.data = obj;
    this.is = "obj";
  }

  get obj() {
    if (this.is !== "obj" && this.data) {
      throw TypeError("The file is currently not loaded as an Object");
    }
    if (this.data !== null && typeof this.data === "object") {
      return this.data;
    }
    return {};
  }

  get path() { return this.__path; }

  set path(path) { this.__path = path; }

  get fileName() { return paths.basename(this.__path); }

  set fileName(fileName) {
    this.__path = paths.join(paths.dirname(this.__path), fileName);
  }

  exists() { return fs.existsSync(this.__path); }

  read() {
    this.data = fs.readFileSync(this.__path, "utf8");
    this.is = "text";
  }

  asJSON() {
    if (this.is === "obj") {
      throw Error("Cannot read object as JSON");
    }
    if (!this.hasOwnProperty("data")) {
      this.read();
    }
    this.data = JSON.parse(this.data);
    this.lang = "JSON";
    this.is = "obj";
    return this;
  }

  asYAML() {
    if (!this.hasOwnProperty("data")) {
      this.read();
    }
    if (this.is === "obj") {
      throw Error("Cannot read object as YAML");
    }
    this.data = YAML.load(this.data);
    this.lang = "YAML";
    this.is = "obj";
  }

  encodeAsJSON(pretty) {
    if (this.is === "text") {
      throw Error("Cannot serialize text into text");
    }
    this.data = JSON.stringify(this.data, null, pretty && 2);
    this.is = "text";
  }

  encodeAsYAML() {
    if (this.is === "text") {
      throw Error("Cannot serialize text into text");
    }
    this.data = YAML.dump(this.data);
    this.is = "text";
  }

  encodeAsJS(pretty) {
    this.encodeAsJSON(pretty);
    this.data = `module.exports=${this.data.replace(/"(\w+)":/g, "$1:")}`;
  }

  write() {
    if (this.is === "obj") {
      throw Error(`Cannot write object to file in ${this.fileName}`);
    }
    fs.writeFileSync(this.__path, this.data);
  }

  delete() {
    fs.unlinkSync(this.__path);
  }
}
module.exports = File;

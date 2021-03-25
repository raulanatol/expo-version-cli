const Utils = require('./utils');
const detectIndent = require('detect-indent');

class JsonFile {
  constructor(filename) {
    this.filename = filename;
    const dataString = Utils.readFile(filename);
    this.indent = detectIndent(dataString).indent;
    this.file = JSON.parse(dataString);
  }

  getFile() {
    return this.file;
  }

  save() {
    Utils.saveFile(this.filename, this.file, this.indent);
  }
}

module.exports = JsonFile;

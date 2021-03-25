const fs = require('fs');

function verifyFiles() {
  if (!fs.existsSync('./package.json') || !fs.existsSync('./app.json')) {
    throw new Error('Invalid project. The files package.json and app.json have to exists');
  }
}

function readFile(filename) {
  return fs.readFileSync(filename, 'utf8');
}

function saveFile(filename, fileData, indent) {
  const input = JSON.stringify(fileData, null, indent);
  fs.writeFileSync(filename, input, 'utf8');
}

module.exports = {
  verifyFiles,
  readFile,
  saveFile
};

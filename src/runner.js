const AppFile = require('./AppFile');

function increaseMinor() {
  const appFile = new AppFile();
  appFile.increaseMinor();
  appFile.save();
}

function increaseMajor() {
  const appFile = new AppFile();
  appFile.increaseMajor();
  appFile.save();
}

function increasePatch() {
  const appFile = new AppFile();
  appFile.increasePatch();
  appFile.save();
}

const actions = {
  minor: increaseMinor,
  major: increaseMajor,
  patch: increasePatch
};

const help = () => {
  console.log(`Usage: $ expo-version-cli
    Options
      patch               Increase a patch number
      minor               Increase a minor number
      major               Increase a major number
    Examples
      $ expo-version-cli patch
      $ expo-version-cli minor
      $ expo-version-cli major
    `);
};

module.exports = {
  help,
  actions
};

const AppFile = require('./AppFile');

function increaseBuild() {
  const appFile = new AppFile();
  appFile.increaseBuild();
  appFile.save();
}

function increaseMinor() {
  const appFile = new AppFile();
  appFile.increaseMinor();
  appFile.save();
}

function increasePatch() {
  const appFile = new AppFile();
  appFile.increasePatch();
  appFile.save();
}

function increaseMajor() {
  const appFile = new AppFile();
  appFile.increaseMajor();
  appFile.save();
}

const actions = {
  build: increaseBuild,
  patch: increasePatch,
  minor: increaseMinor,
  major: increaseMajor,
};

function run(cli) {
  try {
    const flags = cli.flags;
    const enabledFlags = Object.keys(flags).filter(flag => flags[flag]);
    if (enabledFlags.length > 0) {
      actions[enabledFlags[0]] ? actions[enabledFlags[0]]() : cli.showHelp();
    }
    cli.showHelp();
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = {
  run,
};

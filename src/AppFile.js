const Utils = require('./utils.js');
const JsonFile = require('./JsonFile');

class AppFile {
  constructor() {
    Utils.verifyFiles();
    this.appFile = new JsonFile('./app.json');
    this.packageFile = new JsonFile('./package.json');
  }

  increaseBuild() {
    const app = this.appFile.getFile();
    const iosBuildNumber = '' + (Number(app.expo && app.expo.ios && app.expo.ios.buildNumber || 0) + 1);
    const androidVersionCode = (app.expo && app.expo.android && app.expo.android.versionCode || 0) + 1;
    this.setAndroidVersionCode(androidVersionCode);
    this.setIOSBuildNumber(iosBuildNumber);
  }

  setIOSBuildNumber(newBuildNumber) {
    const app = this.appFile.getFile();
    if (app.expo) {
      if (app.expo.ios) {
        app.expo.ios.buildNumber = newBuildNumber;
      } else {
        app.expo.ios = { buildNumber: newBuildNumber };
      }
    } else {
      app.expo = { ios: { buildNumber: newBuildNumber } };
    }
  }

  setAndroidVersionCode(newVersionCode) {
    const app = this.appFile.getFile();
    if (app.expo) {
      if (app.expo.android) {
        app.expo.android.versionCode = newVersionCode;
      } else {
        app.expo.android = { versionCode: newVersionCode };
      }
    } else {
      app.expo = { android: { versionCode: newVersionCode } };
    }
  }

  increaseMinor() {
    const split = this.getExpoVersion();
    split[2] = '0';
    split[1] = Number(split[1]) + 1;
    this.setExpoVersion(split.join('.'));
    this.increaseBuild();
  }

  increasePatch() {
    const split = this.getExpoVersion();
    split[2] = Number(split[2]) + 1;
    this.setExpoVersion(split.join('.'));
    this.increaseBuild();
  }

  increaseMajor() {
    const split = this.getExpoVersion();
    split[0] = Number(split[0]) + 1;
    this.setExpoVersion(split[0] + '.0.0');
    this.increaseBuild();
  }

  setExpoVersion(newVersion) {
    const app = this.appFile.getFile();
    if (app.expo) {
      app.expo.version = newVersion;
    } else {
      app.expo = { version: newVersion };
    }
    const packageFile = this.packageFile.getFile();
    packageFile.version = newVersion;
  }

  getExpoVersion() {
    const app = this.appFile.getFile();
    const expoVersion = app && app.expo && app.expo.version || '0.0.0';
    const split = expoVersion.split('.');
    if (!split || split.length !== 3) {
      throw new Error('Invalid expo version value' + expoVersion);
    }
    return split;
  }

  save() {
    this.appFile.save();
    this.packageFile.save();
  }
}

module.exports = AppFile;

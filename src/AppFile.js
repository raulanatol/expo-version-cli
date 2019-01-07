const Utils = require('./utils.js');
const detectIndent = require('detect-indent');

class AppFile {
  constructor() {
    Utils.verifyFiles();
    const appDataString = Utils.readFile('./app.json');
    this.indent = detectIndent(appDataString).indent;
    this.appData = JSON.parse(appDataString);
  }

  increaseBuild() {
    const iosBuildNumber = '' + (Number(this.appData.expo && this.appData.expo.ios && this.appData.expo.ios.buildNumber || 0) + 1);
    const androidVersionCode = (this.appData.expo && this.appData.expo.android && this.appData.expo.android.versionCode || 0) + 1;
    this.setAndroidVersionCode(androidVersionCode);
    this.setIOSBuildNumber(iosBuildNumber);
  }

  setIOSBuildNumber(newBuildNumber) {
    if (this.appData.expo) {
      if (this.appData.expo.ios) {
        this.appData.expo.ios.buildNumber = newBuildNumber;
      } else {
        this.appData.expo.ios = { buildNumber: newBuildNumber };
      }
    } else {
      this.appData.expo = { ios: { buildNumber: newBuildNumber } };
    }
  }

  setAndroidVersionCode(newVersionCode) {
    if (this.appData.expo) {
      if (this.appData.expo.android) {
        this.appData.expo.android.versionCode = newVersionCode;
      } else {
        this.appData.expo.android = { versionCode: newVersionCode };
      }
    } else {
      this.appData.expo = { android: { versionCode: newVersionCode } };
    }
  }

  increaseMinor() {
    const split = this.getExpoVersion();
    split[2] = '0';
    split[1] = Number(split[1]) + 1;
    this.setExpoVersion(split.join('.'));
  }

  increasePatch() {
    const split = this.getExpoVersion();
    split[2] = Number(split[2]) + 1;
    this.setExpoVersion(split.join('.'));
  }

  increaseMajor() {
    const split = this.getExpoVersion();
    split[0] = Number(split[0]) + 1;
    this.setExpoVersion(split[0] + '.0.0');
  }

  setExpoVersion(newVersion) {
    if (this.appData.expo) {
      this.appData.expo.version = newVersion;
    } else {
      this.appData.expo = { version: newVersion };
    }
    this.setAndroidVersionCode(0);
    this.setIOSBuildNumber("0");
  }

  getExpoVersion() {
    const expoVersion = this.appData && this.appData.expo && this.appData.expo.version || '0.0.0';
    const split = expoVersion.split('.');
    if (!split || split.length !== 3) {
      throw new Error('Invalid expo version value' + expoVersion);
    }
    return split;
  }

  save() {
    Utils.saveFile('./app.json', this.appData, this.indent);
  }
}

module.exports = AppFile;

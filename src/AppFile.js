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
    this.appData = {
      ...this.appData,
      expo: {
        ios: { buildNumber: iosBuildNumber },
        android: { versionCode: androidVersionCode }
      },
    };
  }

  increaseMinor() {
    const split = this.getExpoValues();
    split[2] = 0;
    split[1] = Number(split[1]) + 1;
    this.appData = {
      ...this.appData,
      expo: {
        version: split.join('.')
      }
    };
  }

  increasePatch() {
    const split = this.getExpoValues();
    split[2] = Number(split[2]) + 1;
    this.appData = {
      ...this.appData,
      expo: {
        version: split.join('.')
      }
    };
  }

  increaseMajor() {
    const split = this.getExpoValues();
    split[0] = Number(split[0]) + 1;
    this.appData = {
      ...this.appData,
      expo: {
        version: split[0] + '.0.0'
      }
    };
  }

  getExpoValues() {
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

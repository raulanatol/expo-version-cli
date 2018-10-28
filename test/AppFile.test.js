const Utils = require('../src/utils');
const AppFile = require('../src/AppFile');

function prepareAppFileToCheck(initialFile) {
  const mockVerifyFiles = jest.fn();
  mockVerifyFiles.mockReturnValue(true);
  Utils.verifyFiles = mockVerifyFiles;

  const readFileMock = jest.fn();
  readFileMock.mockReturnValue(initialFile);
  Utils.readFile = readFileMock;

  return new AppFile();
}

describe('AppFile', () => {
  describe('build', () => {
    describe('iosBuildNumber', () => {
      test('Should increase the ios build number if not exists this field', () => {
        const mockVerifyFiles = jest.fn();
        mockVerifyFiles.mockReturnValue(true);
        Utils.verifyFiles = mockVerifyFiles;

        const readFileMock = jest.fn();
        readFileMock.mockReturnValue('{}');
        Utils.readFile = readFileMock;

        const appFile = new AppFile();
        appFile.increaseBuild();

        expect(appFile.appData.expo.ios.buildNumber).toBe("1");
      });

      test('Should increase the ios build number if this field exists', () => {
        const mockVerifyFiles = jest.fn();
        mockVerifyFiles.mockReturnValue(true);
        Utils.verifyFiles = mockVerifyFiles;

        const readFileMock = jest.fn();
        Utils.readFile = readFileMock;
        readFileMock.mockReturnValue('{ "expo": { "ios": { "buildNumber": 15 } } }');

        const appFile = new AppFile();
        appFile.increaseBuild();

        expect(appFile.appData.expo.ios.buildNumber).toBe("16");
      });
    });

    describe('androidBuildNumber', () => {
      test('Should increase the android version code if not exists this field', () => {
        const mockVerifyFiles = jest.fn();
        mockVerifyFiles.mockReturnValue(true);
        Utils.verifyFiles = mockVerifyFiles;

        const readFileMock = jest.fn();
        Utils.readFile = readFileMock;
        readFileMock.mockReturnValue('{ "expo": { "ios": { } } }');

        const appFile = new AppFile();
        appFile.increaseBuild();

        expect(appFile.appData.expo.android.versionCode).toBe(1);
      });

      test('Should increase the android build number if this field exists', () => {
        const mockVerifyFiles = jest.fn();
        mockVerifyFiles.mockReturnValue(true);
        Utils.verifyFiles = mockVerifyFiles;

        const readFileMock = jest.fn();
        Utils.readFile = readFileMock;
        readFileMock.mockReturnValue('{ "expo": { "android": { "versionCode": 15 } } }');

        const appFile = new AppFile();
        appFile.increaseBuild();

        expect(appFile.appData.expo.android.versionCode).toBe(16);
      });
    });
  });

  describe('version', () => {
    describe('major', () => {
      test('Should increase the major version number if not exists this field', () => {
        const appFile = prepareAppFileToCheck('{}');
        appFile.increaseMajor();
        expect(appFile.appData.expo.version).toBe('1.0.0');
      });

      test('Should increase the major version number if this field exists', () => {
        const appFile = prepareAppFileToCheck('{ "expo" : { "version": "0.0.2" } }');
        appFile.increaseMajor();
        expect(appFile.appData.expo.version).toBe('1.0.0');
      });

      test('Should increase the major version number if this field exists - 1.2.3', () => {
        const appFile = prepareAppFileToCheck('{ "expo" : { "version": "1.2.3" } }');
        appFile.increaseMajor();
        expect(appFile.appData.expo.version).toBe('2.0.0');
      });
    });

    describe('minor', () => {
      test('Should increase the minor version number if not exists this field', () => {
        const appFile = prepareAppFileToCheck('{}');
        appFile.increaseMinor();
        expect(appFile.appData.expo.version).toBe('0.1.0');
      });

      test('Should increase the minor version number if this field exists', () => {
        const appFile = prepareAppFileToCheck('{ "expo" : { "version": "0.0.2" } }');
        appFile.increaseMinor();
        expect(appFile.appData.expo.version).toBe('0.1.0');
      });

      test('Should increase the minor version number if this field exists - 1.2.3', () => {
        const appFile = prepareAppFileToCheck('{ "expo" : { "version": "1.2.3" } }');
        appFile.increaseMinor();
        expect(appFile.appData.expo.version).toBe('1.3.0');
      });
    });

    describe('patch', () => {
      test('Should increase the patch version number if not exists this field', () => {
        const appFile = prepareAppFileToCheck('{}');
        appFile.increasePatch();
        expect(appFile.appData.expo.version).toBe('0.0.1');
      });

      test('Should increase the patch version number if this field exists', () => {
        const appFile = prepareAppFileToCheck('{ "expo" : { "version": "0.0.2" } }');
        appFile.increasePatch();
        expect(appFile.appData.expo.version).toBe('0.0.3');
      });

      test('Should increase the patch version number if this field exists - 1.2.3', () => {
        const appFile = prepareAppFileToCheck('{ "expo" : { "version": "1.2.3" } }');
        appFile.increasePatch();
        expect(appFile.appData.expo.version).toBe('1.2.4');
      });
    });
  });
});

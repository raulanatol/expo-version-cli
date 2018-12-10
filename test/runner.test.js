const runner = require('../src/runner.js');

describe('runner', () => {
  describe('setExpoVersion', () => {
    test('Should show the help if not version number is passed', () => {
      showHelp = jest.fn();
      const cli = {
        flags: { set: true },
        showHelp
      };
      runner.run(cli);
      expect(showHelp).toBeCalledTimes(1);
    });
  });
});

const { help, actions } = require('./src/runner');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({ pkg }).notify();

const exit = () => process.exit(0);

const assertValidCommand = command => {
  if (!['patch', 'minor', 'major'].includes(command)) {
    help();
    exit();
  }
}

const processCommand = () => {
  const command = process.argv[2].trim().toLowerCase();
  assertValidCommand(command);
  actions[command]()
};


const assertValidExecution = () => {
  if (process.argv.length < 3) {
    help();
    exit();
  }
};


assertValidExecution();
processCommand();

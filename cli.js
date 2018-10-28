#!/usr/bin/env node
const meow = require('meow');
const updateNotifier = require('update-notifier');
const pkg = require('./package');
const runner = require('./src/runner.js');

updateNotifier({ pkg }).notify();

const cli = meow(`
    Usage
        $ expo-version-cli
    Options
        --build, -b         Increase a build number
        --major, -M         Increase a mayor version number
        --minor, -m         Increase a minor version number
        --patch, -p         Increase a path version number
    Examples
        $ expo-version-cli -b
        $ expo-version-cli -M
`, {
  flags: {
    build: { type: 'boolean', alias: 'b' },
    major: { type: 'boolean', alias: 'M' },
    minor: { type: 'boolean', alias: 'm' },
    patch: { type: 'boolean', alias: 'p' },
  }
});

runner.run(cli);

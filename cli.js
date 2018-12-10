#!/usr/bin/env node
const meow = require('meow');
const updateNotifier = require('update-notifier');
const pkg = require('./package');
const runner = require('./src/runner.js');

updateNotifier({ pkg }).notify({ isGlobal: true });

const cli = meow(`
    Usage
        $ expo-version-cli
    Options
        --build, -b         Increase a build number
        --major, -M         Increase a mayor version number
        --minor, -m         Increase a minor version number
        --patch, -p         Increase a path version number
        --set, -s           Set a version number
    Examples
        $ expo-version-cli -b
        $ expo-version-cli -M
        $ expo-version-cli -s 1.0.2
`, {
  flags: {
    build: { type: 'boolean', alias: 'b' },
    major: { type: 'boolean', alias: 'M' },
    minor: { type: 'boolean', alias: 'm' },
    patch: { type: 'boolean', alias: 'p' },
    set: { type: 'boolean', alias: 's' }
  }
});

runner.run(cli);

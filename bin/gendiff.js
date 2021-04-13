#!/usr/bin/env node
import program from 'commander';
import differ from '../src/index.js';

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<first_config> <second_config>')
  .option('-f, --format <type>', 'output format')
  .action((firstConfig, secondConfig) => {
    console.log(differ(firstConfig, secondConfig));
  })
  .parse(process.argv);

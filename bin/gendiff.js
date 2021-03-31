#!/usr/bin/env node
/* eslint-disable */
import commander from 'commander';

commander
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .option('-f, --format <type>', 'output format');

commander.parse(process.argv);
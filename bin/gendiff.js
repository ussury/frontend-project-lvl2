#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();
program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .argument('<filepach1>')
  .argument('<filepach2>')
  .option('-f, --format <type>', 'output format');

program.parse();

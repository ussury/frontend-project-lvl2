import program from 'commander';
import differ from '../src/index.js';

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<path1> <path2>')
  .option('-f, --format <type>', 'output format')
  .action((path1, path2) => {
    console.log(differ(path1, path2));
  })
  .parse(process.argv);

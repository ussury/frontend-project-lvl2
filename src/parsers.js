import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

export default (filename) => {
  const format = filename.slice(-4);
  const readFile = fs.readFileSync(path.resolve(filename));
  switch (format) {
    case 'json':
      return JSON.parse(readFile);
    case 'yaml':
      return yaml.load(readFile);
    case '.yml':
      return yaml.load(readFile);
    default:
      return null;
  }
};

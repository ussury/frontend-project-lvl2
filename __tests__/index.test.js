import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';
import parser from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) =>
  fs.readFileSync(getFixturePath(filename), 'utf-8');

const dataObject = { timeout: 20, verbose: true, host: 'hexlet.io' };
const dataYamlObject = {
  host: 'hexlet.io',
  timeout: 20,
  proxy: '123.234.53.22',
  follow: false,
};

const data1 = '__fixtures__/file1.json';
const data2 = '__fixtures__/file2.json';
const dataYaml = '__fixtures__/file.yaml';
const dataYml = '__fixtures__/file.yml';

test('Parser', () => {
  expect(parser('__fixtures__/plain.json')).toEqual(dataObject);
  expect(parser('__fixtures__/plain.yaml')).toEqual(dataYamlObject);
});
test('JSON Differ', () => {
  expect(gendiff(data1, data2, 'stylish')).toEqual(readFile('resultStylish.txt'));
  expect(gendiff(data1, data2, 'plain')).toEqual(readFile('resultPlain.txt'));
  expect(gendiff(data1, data2, 'json')).toEqual(readFile('resultJson.txt'));
});
test('YAML Differ', () => {
  expect(gendiff(dataYaml, dataYml, 'stylish')).toEqual(readFile('resultStylish.txt'));
  expect(gendiff(dataYaml, dataYml, 'plain')).toEqual(readFile('resultPlain.txt'));
});

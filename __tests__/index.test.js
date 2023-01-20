import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import { diff } from '../src/index.js';
import parser from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) =>
  fs.readFileSync(getFixturePath(filename), 'utf-8');

const dataObject = { 'timeout': 20, 'verbose': true, 'host': 'hexlet.io'};
const data1 = JSON.parse(readFile('file1.json'));
const data2 = JSON.parse(readFile('file2.json'));
const dataYaml = yaml.load(readFile('file.yaml'));
const dataYml = yaml.load(readFile('file.yml'));

test('Parser', () => {
  expect(parser('__fixtures__/file2.json')).toEqual(dataObject);
  expect(parser('__fixtures__/file.yml')).toEqual(dataObject);
})
test('JSON Differ', () => {
  expect(diff(data1, data2)).toEqual(readFile('resultPlainDiff.txt'));
});
test('YAML Differ', () => {
  expect(diff(dataYaml, dataYml)).toEqual(readFile('resultPlainDiff.txt'));
});

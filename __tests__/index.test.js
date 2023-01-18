import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { diff } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) =>
  fs.readFileSync(getFixturePath(filename), 'utf-8');

const data1 = JSON.parse(readFile('file1.json'));
const data2 = JSON.parse(readFile('file2.json'));

test('JSON Differ', () => {
  expect(diff(data1, data2)).toEqual(readFile('resultPlainDiff.txt'));
});

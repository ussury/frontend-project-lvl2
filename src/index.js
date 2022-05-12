/* eslint-disable no-restricted-syntax */
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parser from './parsers/index.js';

const getIndent = (n) => (n === 0 ? '' : ' '.repeat(n));

const getObj = (data, indentCount = 0) => {
  const indent = getIndent(indentCount);
  const keys = _.keys(data);
  const resultColl = [];

  for (const item of keys) {
    if (_.isObject(data[item])) {
      resultColl.push(`${indent}${item}: ${getObj(data[item], indentCount + 2)}`);
    } else {
      resultColl.push(`${indent}${item}: ${data[item]}`);
    }
  }

  return `{\n${resultColl.join('\n')}\n${indent}}`;
};

const obj = (value) => (_.isObject(value) ? getObj(value, 2) : value);

const differ = (data1, data2, indentCount = 0) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.union(keys1, keys2);
  const deletionKeys = _.difference(keys1, keys2);
  const addedKeys = _.difference(keys2, keys1);
  const countKeys = deletionKeys.concat(addedKeys);
  const remainingKeys = keys.filter((v) => !countKeys.includes(v));
  const indent = getIndent(indentCount);
  const resultColl = [];

  for (const item of remainingKeys) {
    if (_.isObject(data1[item]) && _.isObject(data2[item])) {
      resultColl.push(`${indent}  ${item}: ${differ(data1[item], data2[item], indentCount + 4)}`);
    } else if (data1[item] === data2[item]) {
      resultColl.push(`${indent}  ${item}: ${obj(data1[item])}`);
    } else {
      resultColl.push(`${indent}- ${item}: ${obj(data1[item])}`);
      resultColl.push(`${indent}+ ${item}: ${obj(data2[item])}`);
    }
  }

  for (const item of deletionKeys) {
    resultColl.push(`${indent}- ${item}: ${obj(data1[item])}`);
  }
  for (const item of addedKeys) {
    resultColl.push(`${indent}+ ${item}: ${obj(data2[item])}`);
  }

  return `{\n${resultColl.join('\n')}\n${indent}}`;
};

const getExtension = (filepath) => path.extname(`${filepath}`).replace(/\./g, '');

export default (filepath1, filepath2) => {
  const ext = getExtension(filepath1);
  const data1 = fs.readFileSync(path.resolve(filepath1));
  const data2 = fs.readFileSync(path.resolve(filepath2));
  return differ(parser(ext)(data1), parser(ext)(data2));
};

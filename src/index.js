/* eslint-disable no-restricted-syntax */
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parser from './parsers/index.js';

const differ = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.union(keys1, keys2);
  const deletionKeys = _.difference(keys1, keys2);
  const addedKeys = _.difference(keys2, keys1);
  const countKeys = deletionKeys.concat(addedKeys);
  const remainingKeys = keys.filter((v) => !countKeys.includes(v));
  const resultColl = [];

  for (const item of deletionKeys) {
    resultColl.push(`- ${item}: ${data1[item]}`);
  }
  for (const item of addedKeys) {
    resultColl.push(`+ ${item}: ${data2[item]}`);
  }
  for (const itemKeys1 of remainingKeys) {
    for (const itemKeys2 of keys) {
      if (itemKeys1 === itemKeys2) {
        if (data1[itemKeys1] === data2[itemKeys2]) {
          resultColl.push(`  ${itemKeys1}: ${data1[itemKeys1]}`);
        } else {
          resultColl.push(`- ${itemKeys1}: ${data1[itemKeys1]}`);
          resultColl.push(`+ ${itemKeys1}: ${data2[itemKeys1]}`);
        }
      }
    }
  }
  return `{\n  ${resultColl.join('\n  ')} \n}`;
};

const getExtension = (filepath) => path.extname(`${filepath}`).replace(/\./g, '');

export default (filepath1, filepath2) => {
  const ext = getExtension(filepath1);
  const data1 = fs.readFileSync(path.resolve(filepath1));
  const data2 = fs.readFileSync(path.resolve(filepath2));
  return differ(parser(ext)(data1), parser(ext)(data2));
};

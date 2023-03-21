import _ from 'lodash';
import parser from './parsers.js';
import formatter from './formatters/index.js';

const differ = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.union(keys1, keys2).sort();
  const diff = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    if (
      _.has(data1, key)
      && _.has(data2, key)
      && _.isObject(data1[key])
      && _.isObject(data2[key])
    ) {
      diff[key] = { type: 'nested', children: differ(data1[key], data2[key]) };
    } else if (data1[key] === data2[key]) {
      diff[key] = { type: 'same', children: data1[key] };
    } else if (!_.has(data1, key)) {
      diff[key] = { type: 'added', children: data2[key] };
    } else if (!_.has(data2, key)) {
      diff[key] = { type: 'deleted', children: data1[key] };
    } else {
      diff[key] = { type: 'modified', children: [data1[key], data2[key]] };
    }
  }

  return diff;
};

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const path1 = parser(filepath1);
  const path2 = parser(filepath2);
  const tree = differ(path1, path2);
  return formatter(format, tree);
};

export default gendiff;

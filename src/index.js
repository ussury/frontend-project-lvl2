import _ from 'lodash';
import parser from './parsers.js';
import formatter from './formatters/index.js';

const differ = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const diff = keys.reduce((acc, key) => {
    if (
      _.has(data1, key)
      && _.has(data2, key)
      && _.isObject(data1[key])
      && _.isObject(data2[key])
    ) {
      acc[key] = { type: 'nested', children: differ(data1[key], data2[key]) };
    } else if (data1[key] === data2[key]) {
      acc[key] = { type: 'same', children: data1[key] };
    } else if (!_.has(data1, key)) {
      acc[key] = { type: 'added', children: data2[key] };
    } else if (!_.has(data2, key)) {
      acc[key] = { type: 'deleted', children: data1[key] };
    } else {
      acc[key] = { type: 'modified', children: [data1[key], data2[key]] };
    }
    return acc;
  }, {});

  return diff;
};

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const path1 = parser(filepath1);
  const path2 = parser(filepath2);
  const tree = differ(path1, path2);
  return formatter(format, tree);
};

export default gendiff;

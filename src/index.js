import _ from 'lodash';
import parser from './parsers.js';
import formatter from './formatters/index.js';

const differ = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  const tree = keys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, type: 'nested', value: differ(data1[key], data2[key]) };
    }
    if (!_.has(data2, key)) {
      return { key, type: 'deleted', value: data1[key] };
    }
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (data1[key] !== data2[key]) {
      return {
        key, type: 'changed', value1: data1[key], value2: data2[key],
      };
    }
    return { key, type: 'unchanged', value: data1[key] };
  });
  return tree;
};

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const path1 = parser(filepath1);
  const path2 = parser(filepath2);
  const tree = differ(path1, path2);
  return formatter(format, tree);
};

export default gendiff;

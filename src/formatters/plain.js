import _ from 'lodash';

const getStr = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  if (_.isString(data)) {
    return `'${data}'`;
  }
  return data;
};

const addStr = (path, status, data1, data2 = undefined) => {
  const newData1 = getStr(data1);
  const newData2 = getStr(data2);
  switch (status) {
    case 'added':
      return `Property '${path}' was added with value: ${newData1}\n`;
    case 'deleted':
      return `Property '${path}' was removed\n`;
    case 'modified':
      return `Property '${path}' was updated. From ${newData1} to ${newData2}\n`;
    default:
      return '';
  }
};

const plain = (data) => {
  const iter = (dataIter, fullPath = '') => {
    const keys = _.sortBy(Object.keys(dataIter));
    const resultStr = keys.reduce((acc, key) => {
      const path = `${fullPath}${key}`;
      const diff = dataIter[key];
      if (diff.type === 'nested') {
        return `${acc}${iter(diff.children, `${path}.`)}`;
      }
      if (diff.type === 'modified') {
        const children = addStr(
          path,
          'modified',
          diff.children[0],
          diff.children[1],
        );
        return `${acc}${children}`;
      }
      const children = addStr(path, diff.type, diff.children);
      return `${acc}${children}`;
    }, '');
    return resultStr;
  };

  return iter(data);
};

export default (data) => plain(data).slice(0, -1);

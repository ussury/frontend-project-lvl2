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
    case 'changed':
      return `Property '${path}' was updated. From ${newData1} to ${newData2}\n`;
    default:
      return '';
  }
};

const plain = (data) => {
  const iter = (data_, fullPath = '') => {
    const result = data_.reduce((acc, el) => {
      const path = `${fullPath}${el.key}`;
      if (el.type === 'nested') {
        return `${acc}${iter(el.value, `${path}.`)}`;
      }
      if (el.type === 'changed') {
        const children = addStr(
          path,
          'changed',
          el.value1,
          el.value2,
        );
        return `${acc}${children}`;
      }
      const children = addStr(path, el.type, el.value);
      return `${acc}${children}`;
    }, '');
    return result;
  };
  return iter(data);
};

export default (data) => plain(data).slice(0, -1);

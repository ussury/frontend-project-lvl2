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
  data1 = getStr(data1);
  data2 = getStr(data2);
  switch (status) {
    case 'added':
      return `Property '${path}' was added with value: ${data1}\n`;
    case 'deleted':
      return `Property '${path}' was removed\n`;
    case 'modified':
      return `Property '${path}' was updated. From ${data1} to ${data2}\n`;
    default:
      return '';
  }
};

export default (data) => {
  const iter = (data, fullPath = '') => {
    const keys = Object.keys(data).sort();
    let resultStr = '';
    for (const key of keys) {
      const path = `${fullPath}${key}`;
      const diff = data[key];
      if (diff.type === 'nested') {
        resultStr += iter(diff.children, `${path}.`);
      } else if (diff.type === 'modified') {
        resultStr += addStr(
          path,
          'modified',
          diff.children[0],
          diff.children[1]
        );
      } else {
        resultStr += addStr(path, diff.type, diff.children);
      }
    }
    return resultStr;
  };

  return iter(data);
};

// export default plain;

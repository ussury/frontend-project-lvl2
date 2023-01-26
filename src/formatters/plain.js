const addStr = (path, status, data1, data2 = undefined) => {
  if (status === 'added') {
    return `Property '${path}' was added wich value: ${data1}\n`;
  }
  if (status === 'deleted') {
    return `Property '${path}' was removed\n`;
  }
  if (status === 'modified') {
    return `Property '${path}' was updated. From ${data1} to ${data2}\n`;
  }
  return '';
};

const plain = (data) => {
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

export default plain;

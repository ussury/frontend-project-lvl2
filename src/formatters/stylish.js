import _ from 'lodash';

const getIndent = (n) => (n === 0 ? '' : ' '.repeat(n));

const format = (data) => {
  let formatText = '';
  let resultText = '';
  for (const el of data) {
    const indent = getIndent(el.step);
    formatText += `${indent}${el.status}${el.key}: ${el.children}\n`;
    resultText = `{\n${formatText}${indent}}`;
  }
  return resultText;
};

const isObj = (value, step) =>
  _.isObject(value) ? getObj(value, step) : value;

const getObj = (data, step) => {
  const keys = _.keys(data).sort();
  const resultColl = [];

  for (const key of keys) {
    const children = _.isObject(data[key])
      ? getObj(data[key], step + 4)
      : data[key];
    resultColl.push({
      step,
      key,
      status: '    ',
      children: children,
    });
  }

  return format(resultColl);
};

const stylish = (data, step = 0) => {
  const keys = _.keys(data).sort();
  const newStep = step + 4;
  const result = [];

  for (const key of keys) {
    const tree = { step, key };
    switch (data[key].type) {
      case 'nested':
        result.push({
          ...tree,
          status: '    ',
          children: stylish(data[key].children, newStep),
        });
        break;
      case 'added':
        result.push({
          ...tree,
          status: '  + ',
          children: isObj(data[key].children, newStep),
        });
        break;
      case 'deleted':
        result.push({
          ...tree,
          status: '  - ',
          children: isObj(data[key].children, newStep),
        });
        break;
      case 'same':
        result.push({
          ...tree,
          status: '    ',
          children: isObj(data[key].children, newStep),
        });
        break;
      case 'modified':
        result.push({
          ...tree,
          status: '  - ',
          children: isObj(data[key].children[0], newStep),
        });
        result.push({
          ...tree,
          status: '  + ',
          children: isObj(data[key].children[1], newStep),
        });
        break;
    }
  }
  return format(result);
};

export default stylish;

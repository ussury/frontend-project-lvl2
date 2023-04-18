import _ from 'lodash';

const space = ' ';
const spaceCount = 4;

const getIndent = (step) => space.repeat(step * spaceCount).slice(0, -2);

const stringify = (value, step) => {
  if (!_.isPlainObject(value)) {
    return String(value);
  }
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${getIndent(step + 1)}  ${key}: ${stringify(val, (step + 1))}`);
  return `{\n${lines.join('\n')}\n${getIndent(step)}  }`;
};

const iter = (tree, step = 1) => {
  const result = tree
    .flatMap((node) => {
      switch (node.type) {
        case 'nested': {
          return `${getIndent(step)}  ${node.key}: {\n${iter(node.value, step + 1).join('\n')}\n${getIndent(step)}  }`;
        }
        case 'deleted': {
          return `${getIndent(step)}- ${node.key}: ${stringify(node.value, step)}`;
        }
        case 'added': {
          return `${getIndent(step)}+ ${node.key}: ${stringify(node.value, step)}`;
        }
        case 'changed': {
          return `${getIndent(step)}- ${node.key}: ${stringify(node.value1, step)}\n${getIndent(step)}+ ${node.key}: ${stringify(node.value2, step)}`;
        }
        case 'unchanged': {
          return `${getIndent(step)}  ${node.key}: ${stringify(node.value, step)}`;
        }
        default:
          throw new Error(`Error: ${node.type} this type doesn't exist in this file`);
      }
    });
  return result;
};

export default (diff) => `{\n${iter(diff).join('\n')}\n}`;

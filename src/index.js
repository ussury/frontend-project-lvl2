import _ from 'lodash';
import format from './data/formatter.js';
import filePath from './data/filePath.js';

const diff = (data1, data2) => {
  const keysData1 = _.sortBy(Object.keys(data1));
  const keysData2 = _.sortBy(Object.keys(data2));
  const union = _.union(keysData1, keysData2);
  let result = '{\n';

  for (const i of union) {
    if (keysData1.includes(i) && keysData2.includes(i)) {
      if (data1[i] === data2[i]) {
        result = `${result}    ${i}: ${data1[i]}\n`;
      } else {
        result = `${result}  - ${i}: ${data1[i]}\n  + ${i}: ${data2[i]}\n`;
      }
    }
    if (!keysData2.includes(i)) {
      result = `${result}  - ${i}: ${data1[i]}\n`;
    }
    if (!keysData1.includes(i)) {
      result = `${result}  + ${i}: ${data2[i]}\n`;
    }
  }

  return `${result}}`;
};

export default (path1, path2) => (diff(format(filePath(path1)), format(filePath(path2))));

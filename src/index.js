import _ from 'lodash';

const genDiff = (file1, file2) => {
  const allKeys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));

  const diffLines = allKeys.map((key) => {
    if (!_.has(file2, key)) {
      return `  - ${key}: ${file1[key]}`;
    }
    if (!_.has(file1, key)) {
      return `  + ${key}: ${file2[key]}`;
    }
    if (!_.isEqual(file1[key], file2[key])) {
      return [
        `  - ${key}: ${file1[key]}`,
        `  + ${key}: ${file2[key]}`,
      ].join('\n');
    }
    return `    ${key}: ${file1[key]}`;
  });

  return `{\n${diffLines.join('\n')}\n}`;
};

export default genDiff;

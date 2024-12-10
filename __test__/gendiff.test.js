import genDiff from '../src/index.js';
import path from 'path';

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);

test('Comparar archivos JSON', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const expected = `{
    - key1: value1
    + key1: value2
  }`;
  expect(genDiff(filepath1, filepath2)).toBe(expected);
});

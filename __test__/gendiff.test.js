import fs from 'fs';
import getPath from '../src/getFixturePath.js';
import genDiff from '../src/index.js';

const styres = fs.readFileSync(getPath('stylish.txt'), 'utf8');
const result = fs.readFileSync(getPath('result.txt'), 'utf8');
const jsoret = JSON.parse(fs.readFileSync(getPath('js.json'), 'utf8'));

const generateFilePaths = (filename1, filename2, extens) => [
  getPath(`${filename1}.${extens}`),
  getPath(`${filename2}.${extens}`),
];

const testGenDiff = (filepath1, filepath2, format, expectedResult) => {
  expect(genDiff(filepath1, filepath2, format)).toBe(expectedResult);
};

const testGenDiffJSON = (filepath1, filepath2, expectedResult) => {
  expect(JSON.parse(genDiff(filepath1, filepath2, 'json'))).toEqual(expectedResult);
};

test('Format for stylish Result - YAML File', () => {
  const [filepath1, filepath2] = generateFilePaths('file1-y', 'file2-y', 'yaml');
  testGenDiff(filepath1, filepath2, 'stylish', styres);
});

test('Format for Result - YAML File', () => {
  const [filepath1, filepath2] = generateFilePaths('file1-y', 'file2-y', 'yaml');
  testGenDiff(filepath1, filepath2, 'plain', result);
});

test('Format for JSON Result - JSON File', () => {
  const [filepath1, filepath2] = generateFilePaths('file1', 'file2', 'json');
  testGenDiffJSON(filepath1, filepath2, jsoret);
});
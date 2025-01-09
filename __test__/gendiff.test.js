import fs from 'fs';
import genDiff from '../src/index.js';
import getFixturePath from '../src/getFixturePath.js';

const styres = fs.readFileSync(getFixturePath('stylish.txt'), 'utf8');
const result = fs.readFileSync(getFixturePath('result.txt'), 'utf8');
const jsoret = JSON.parse(fs.readFileSync(getFixturePath('js.json'), 'utf8'));

const generateFilePaths = (filename1, filename2, extens) => [
  getFixturePath(`${filename1}.${extens}`),
  getFixturePath(`${filename2}.${extens}`),
];
const testGenDiff = (filepath1, filepath2, format) => {
  expect(genDiff(filepath1, filepath2, format));
};

const testGenDiffJSON = (filepath1, filepath2, expectedResult) => {
  expect(JSON.parse(genDiff(filepath1, filepath2, 'json'))).toEqual(expectedResult);
};

test('Format for stylish Result - YAML File', () => {
  const filepath1 = getFixturePath('file1.yaml');
  const filepath2 = getFixturePath('file2.yaml');
  expect(genDiff(filepath1, filepath2, 'stylish', styres));
});

test('Format for Result - YAML File', () => {
  const [filepath1, filepath2] = generateFilePaths('file1', 'file2', 'yaml');
  testGenDiff(filepath1, filepath2, 'plain', result);
});

test('Format for JSON Result - JSON File', () => {
  const [filepath1, filepath2] = generateFilePaths('file1', 'file2', 'json');
  testGenDiffJSON(filepath1, filepath2, jsoret);
});
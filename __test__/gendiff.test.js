import fs from 'fs';
import genDiff from '../src/index.js';
import getFixturePath from '../src/getFixturePath.js';

const stylishExpected = fs.readFileSync(getFixturePath('stylish.txt'), 'utf8');
const plainExpected = fs.readFileSync(getFixturePath('plain.txt'), 'utf8');
const jsonExpected = JSON.parse(fs.readFileSync(getFixturePath('js.json'), 'utf8'));

const generateFilePaths = (filename1, filename2, extens) => [
  getFixturePath(`${filename1}.${extens}`),
  getFixturePath(`${filename2}.${extens}`),
];

test('Format for stylish Result - YAML File', () => {
  const filepath1 = getFixturePath('file1.yaml');
  const filepath2 = getFixturePath('file2.yaml');
  const result = genDiff(filepath1, filepath2, 'stylish');
  expect(result).toEqual(stylishExpected);
});

test('Format for Result - YAML File', () => {
  const [filepath1, filepath2] = generateFilePaths('file1', 'file2', 'yaml');
  const result = genDiff(filepath1, filepath2, 'plain');
  expect(result).toEqual(plainExpected);
});

test('Format for JSON Result - JSON File', () => {
  const [filepath1, filepath2] = generateFilePaths('file1', 'file2', 'json');
  const result = genDiff(filepath1, filepath2, 'json');
  expect(JSON.parse(result)).toEqual(jsonExpected);
});
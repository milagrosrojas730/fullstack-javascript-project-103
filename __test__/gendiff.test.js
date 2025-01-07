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
// const testGenDiff = (filepath1, filepath2, format, expectedResult) => {
  // expect(genDiff(filepath1, filepath2, format)).toEqual(expectedResult);
// };

// const testGenDiffJSON = (filepath1, filepath2, expectedResult) => {
// expect(JSON.parse(genDiff(filepath1, filepath2, 'json'))).toEqual(expectedResult);
// };

// const validateFileContent = (content, format) => {
// try {
// if (format === 'json') {
// JSON.parse(content);
// }
// return true;
// } catch (error) {
// console.error(`Invalid content for format ${format}:`, error.message);
// return false;
// }
// };

test('Format for stylish Result - YAML File', () => {
  const [filepath1, filepath2] = generateFilePaths('file1-y', 'file2-y', 'yaml');
  const output = genDiff(filepath1, filepath2, 'stylish');
  expect(output).toEqual(styres);
  // console.log('Stylish output:', output);
  // expect(validateFileContent(output, 'stylish')).toBe(true);
  // testGenDiff(filepath1, filepath2, 'stylish', styres);
});

test('Format for Result - YAML File', () => {
  const [filepath1, filepath2] = generateFilePaths('file1-y', 'file2-y', 'yaml');
  const output = genDiff(filepath1, filepath2, 'plain');
  expect(output).toEqual(result);
  // console.log('Plain Output:', output);
  // expect(validateFileContent(output, 'plain')).toBe(true);
  // testGenDiff(filepath1, filepath2, 'plain', result);
});

test('Format for JSON Result - JSON File', () => {
  const [filepath1, filepath2] = generateFilePaths('file1', 'file2', 'json');
  const output = genDiff(filepath1, filepath2, 'json');
  expect(JSON.parse(output)).toEqual(jsoret);
  // console.log('JSON Output:', output)
  // expect(validateFileContent(output, 'json')).toBe(true);
  // testGenDiffJSON(filepath1, filepath2, jsoret);
});

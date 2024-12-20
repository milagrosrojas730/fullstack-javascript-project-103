import path from 'path';
import getFixturePath from '../src/getFixturePath.js';

test('getFixturePath should return the correct path', () => {
  const filename = 'file1.json';
  const expectedPath = path.join('__fixtures__', filename);
  expect(getFixturePath(filename)).toBe(expectedPath);
});

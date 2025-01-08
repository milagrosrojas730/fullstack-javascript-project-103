import path from 'path';
import getPath from '../src/getFixturePath.js';

test('getFixturePath should return the correct path', () => {
  const filename = 'file1.json';
  const expectedPath = path.join('__fixtures__', filename);

  expect(getPath(filename)).toBe(expectedPath);
});

import path from 'path';
import { getFixturePath } from '../src/utils.js';

test('getFixturePath should return the correct path', () => {
  const filename = 'file1.json';
  const expectedPath = path.resolve('__fixtures__', filename);

  expect(getFixturePath(filename)).toBe(expectedPath);
});
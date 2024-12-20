import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);

test('Comparar archivos YAML planos', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const expected = `{
    host: codica.io
    timeout: 50
    proxy: 123.234.53.22
    follow: false
}`;
  expect(genDiff(file1, file2)).toBe(expected);
});

test('Archivos con claves adicionales en YAML', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const expected = `{
- follow: false
    host: codica.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
}`;
  expect(genDiff(file1, file2)).toBe(expected);
});

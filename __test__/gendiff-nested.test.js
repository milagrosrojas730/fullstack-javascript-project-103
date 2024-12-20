import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.resolve('__fixtures__', filename);

test('Comparar JSON anidados', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = `{
common: {
+ follow: false
setting1: Value 1
- setting2: 200
- setting3: true
+ setting3: null
+ setting4: blah blah
+ setting5: {
key5: value5
}
setting6: {
            doge: { 
            - wow: 
+ wow: so much
            }
            key: value
        + ops: vops
        }
    }
    group1: { 
    - baz: bas
    + baz: bars
        foo: bar
    - nest: {
            key: value
        }
    + nest: str
    }
- group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
+ group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;
  expect(genDiff(file1, file2)).toBe(expected);
});

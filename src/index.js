import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import yaml from 'js-yaml';

const genDiff = (filepath1, filepath2) => {
const readFile = (filepath) => {
    const ext = path.extname(filepath);
    if( ext === '.json') {
        return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    }
    if(ext === '.yml'|| ext === '.yaml') {
        return yaml.load(fs.readFileSync(filepath, 'utf-8'));
    }
    throw new Error('Unsupported file format');
}
const file1 = readFile(filepath1);
const file2 = readFile(filepath2);
const allKeys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));

const diffLines = allKeys.map((key) => {
    if (!_.has(file2, key)) {
    return `  - ${key}: ${file1[key]}`;
    }
    if (!_.has(file1, key)) {
    return `  + ${key}: ${file2[key]}`;
    }
    if (!_.isEqual(file1[key], file2[key])) {
    return [
        `  - ${key}: ${file1[key]}`,
        `  + ${key}: ${file2[key]}`,
    ].join('\n');
    }
    return `    ${key}: ${file1[key]}`;
});


return `{\n${diffLines.join('\n')}\n}`;
};

export default genDiff;

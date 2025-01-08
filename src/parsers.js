import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseFile = (filepath) => {
  const absolutePath = path.resolve(filepath);
  const extname = path.extname(absolutePath);
  const data = fs.readFileSync(absolutePath, 'utf-8');

  switch (extname) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unsupported file format: ${extname}`);
  }
};

export default parseFile;
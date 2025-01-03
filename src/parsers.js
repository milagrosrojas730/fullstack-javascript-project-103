const fs = require('fs');
const path = require('path');
const yaml =require('js-yaml');

const parsers = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const ext = path.extname(absolutePath);

  const fileContent = fs.readFileSync(absolutePath, 'utf-8');
  if (ext === '.json') {
    return JSON.parse(fileContent);
  }
  if (ext === '.yml' || ext === '.yaml') {
    return yaml.load(fileContent);
  }

  throw new Error(`Unsupported file format: ${ext}`);
};

export default parsers;

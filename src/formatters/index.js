import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatDiff = (diff, format) => {
  const formatters = { stylish, plain, json };
  if (!formatters[format]) {
    throw new Error(`Unknown format: ${format}`);
  }
  return formatters[format](diff);
};

export default formatDiff;
import { stylish } from '../utils.js';

const stylishWithBraces = (diff) => {
  const innerOutput = stylish(diff);
  return innerOutput;
};

export default stylishWithBraces;

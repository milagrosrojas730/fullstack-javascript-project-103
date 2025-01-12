import _ from 'lodash';

const getIndent = (depth, spaces = 4) => ' '.repeat(Math.max(0, depth * spaces - 2));

const stringify = (value, depth) => {
  if (!_.isObject(value)) return String(value);

  const indent = getIndent(depth + 1);
  const closingIndent = getIndent(depth);
  const lines = Object.entries(value)
    .map(([key, val]) => `${indent}  ${key}: ${stringify(val, depth + 1)}`);
  return `{\n${lines.join('\n')}\n${closingIndent}  }`;
};

const stylish = (tree, depth = 1) => {
  const indent = getIndent(depth);
  const closingIndent = getIndent(depth - 1);

  const lines = tree.map((node) => {
    switch (node.type) {
      case 'added':
        return `${indent}+ ${node.key}: ${stringify(node.value, depth)}`;
      case 'deleted':
        return `${indent}- ${node.key}: ${stringify(node.value, depth)}`;
      case 'unchanged':
        return `${indent}  ${node.key}: ${stringify(node.value, depth)}`;
      case 'changed':
        return [
          `${indent}- ${node.key}: ${stringify(node.value1, depth)}`,
          `${indent}+ ${node.key}: ${stringify(node.value2, depth)}`,
        ].join('\n');
      case 'nested':
        return `${indent}  ${node.key}: {\n${stylish(node.children, depth + 1)}\n${indent}  }`;
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });

  return `{\n${lines.join('\n')}\n${closingIndent}}`;
};

export { stylish };
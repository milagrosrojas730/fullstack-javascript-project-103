import _ from 'lodash';
const getIndent = (depth, spacesCount = 4) => ' '.repeat(0, depth * spacesCount - 2);

const stylish = (tree, depth = 1) => {
  const indent = getIndent(depth);
  const closingIndent = getIndent(depth - 1);

  if (!Array.isArray(tree)) {
    throw new Error('Input to stylish formatter must be an array');
  }
  
  const lines = tree.map((node) => {  
    switch (node.type) {
      case 'added':
        return `${indent}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'deleted':
        return `${indent}- ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'unchanged':
        return `${indent}  ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'changed':
        return [
          `${indent}- ${node.key}: ${stringify(node.value1, depth + 1)}`,
          `${indent}+ ${node.key}: ${stringify(node.value2, depth + 1)}`,
        ].join('\n');
      case 'nested':
        return `${indent}  ${node.key}: {\n${stylish(node.children, depth + 1)}\n${indent}  }`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });

  return `{\n${lines.join('\n')}\n${closingIndent}}`;
};

export default stylish;
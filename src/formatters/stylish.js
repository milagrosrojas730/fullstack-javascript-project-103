import _ from 'lodash';

const getIndentation = (depth, spacesCount = 4) => ' '.repeat(Math.max(0, depth * spacesCount - 2));

const formatValue = (data, depth) => {
  if (!_.isObject(data)) return String(data);

  const entries = Object.entries(data)
    .map(([key, value]) => `${getIndentation(depth + 1)}  ${key}: ${formatValue(value, depth + 1)}`);

  return `{\n${entries.join('\n')}\n${getIndentation(depth)}  }`;
};
const renderNode = (node, depth, iterate) => {
  const indent = getIndentation(depth);

  switch (node.type) {
    case 'root': {
      const renderedChildren = node.children.flatMap((child) => iterate(child, depth + 1));
      return `{\n${renderedChildren.join('\n')}\n}`;
    }
    case 'nested': {
      const nestedChildren = node.children.flatMap((child) => iterate(child, depth + 1));
      return `${indent}  ${node.key}: {\n${nestedChildren.join('\n')}\n${indent}  }`;
    }
    case 'added':
      return `${indent}+ ${node.key}: ${formatValue(node.value, depth)}`;
    case 'deleted':
      return `${indent}- ${node.key}: ${formatValue(node.value, depth)}`;
    case 'unchanged':
      return `${indent}  ${node.key}: ${formatValue(node.value, depth)}`;
    case 'changed': {
      const formattedValue1 = `${indent}- ${node.key}: ${formatValue(node.value1, depth)}`;
      const formattedValue2 = `${indent}+ ${node.key}: ${formatValue(node.value2, depth)}`;
      return [formattedValue1, formattedValue2].join('\n');
    }
    default:
      throw new Error(`Unknown type: ${node.type}`);
  }
};

const renderAST = (ast) => {
  const iterate = (node, depth) => renderNode(node, depth, iterate);
  return iterate(ast, 0);
};

export default renderAST;

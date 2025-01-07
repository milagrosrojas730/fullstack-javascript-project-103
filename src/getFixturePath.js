import path from 'path';

const getPath = (filename) => path.join(__dirname, '__fixtures__', filename);

export default getPath;

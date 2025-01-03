const path = require('path');
const getFixturePath = (filename) => path.join('__fixtures__', filename);

export default getFixturePath;

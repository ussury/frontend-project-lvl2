import plain from './plain.js';
import stylish from './stylish.js';

const formats = { plain, stylish, json: JSON.stringify };

export default (style, tree) => formats[style](tree);

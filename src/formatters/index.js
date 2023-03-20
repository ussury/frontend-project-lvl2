/*  eslint-disable-next-line */
import _ from 'lodash';
import plain from './plain.js';
import stylish from './stylish.js';

const formats = { plain: plain, stylish: stylish, json: JSON.stringify };

export default (style, tree) => formats[style](tree);

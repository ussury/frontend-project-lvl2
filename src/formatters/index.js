import plain from './plain.js';
import stylish from './stylish.js';

// const formats = { plain, stylish, json: JSON.stringify };
// export default (style, tree) => formats[style](tree);

export default (style, tree) => {
  switch (style) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      return `Something went wrong with ${style} format.`;
  }
};

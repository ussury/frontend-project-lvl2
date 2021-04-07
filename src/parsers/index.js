import json from './jsonParser.js';
import yml from './yamlParser.js';

const parsers = { json, yml };

export default (extension) => parsers[extension];

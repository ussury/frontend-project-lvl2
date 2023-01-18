import path from 'path';
import fs from 'fs';

export default (filename) => fs.readFileSync(path.resolve(filename));

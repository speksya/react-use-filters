import * as exported from 'react-use-filters';
import assert from 'assert';
import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const expected = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './all-exports.json'), 'utf-8'),
);

assert.deepStrictEqual(Object.keys(exported), expected);

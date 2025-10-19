/* eslint-disable @typescript-eslint/no-require-imports */
const exported = require('react-use-filters');
const assert = require('assert');
const fs = require('fs');

const expected = JSON.parse(
  fs.readFileSync(
    require('path').resolve(__dirname, './all-exports.json'),
    'utf-8',
  ),
);

assert.deepStrictEqual(Object.keys(exported), expected);

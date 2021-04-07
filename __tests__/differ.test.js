/* eslint-disable no-undef */
import differ from '../src/index.js';

test('JSON Differ', () => {
  const config1 = '__tests__/__fixtures__/1.json';
  const config2 = '__tests__/__fixtures__/2.json';

  const actual = differ(config1, config2);

  const expected = `{
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
    host: hexlet.io
  - timeout: 50
  + timeout: 20 
}`;
  expect(actual).toBe(expected);
});

test('YAML Differ', () => {
  const config1 = '__tests__/__fixtures__/1.yml';
  const config2 = '__tests__/__fixtures__/2.yml';

  const actual = differ(config1, config2);

  const expected = `{
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
    host: hexlet.io
  - timeout: 50
  + timeout: 20 
}`;
  expect(actual).toBe(expected);
});

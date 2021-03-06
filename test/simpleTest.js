/* globals describe */

const assert = require('assert');

const { test, testError } = require('./helpers');

describe('simple', () => {
  test('empty', '', [[1, '', '']]);
  test('simple', '.class { a: b c d; }', [[1, '.class { a: b c d; }', '']]);
  test('simple2', '.class { a: b c d; }\n.two {}', [
    [1, '.class { a: b c d; }\n.two {}', ''],
  ]);
  test('escaped selector', '.u-m\\+ { a: b c d; }', [
    [1, '.u-m\\+ { a: b c d; }', ''],
  ]);
  test('escaped characters (uppercase)', '.class { content: "\\F10C" }', [
    [1, '.class { content: "\\F10C" }', ''],
  ]);
  // Need uncomment after resolve https://github.com/css-modules/postcss-modules-local-by-default/issues/108
  /* test("escape characters (lowercase)", ".class { content: \"\\f10C\" }", [
    [1, ".class { content: \"\\f10C\" }", ""]
  ]);*/
  // Need uncomment after resolve https://github.com/mathiasbynens/cssesc/issues/10
  /* test("escape characters (two)", ".class { content: \"\\F10C \\F10D\" }", [
    [1, ".class { content: \"\\F10C \\F10D\" }", ""]
  ]);*/
  test('charset directive', '@charset "UTF-8";\n .class { a: b c d; }', [
    [1, '@charset "UTF-8";\n .class { a: b c d; }', ''],
  ]);
  test('custom variables', ':root {--foo: 1px;\n--bar: 2px;}', [
    [1, ':root {--foo: 1px;\n--bar: 2px;}', ''],
  ]);
  testError('error formatting', '.some {\n invalid css;\n}', (err) => {
    assert.equal(
      err.message,
      [
        'Unknown word (2:2)',
        '',
        '  1 | .some {',
        '> 2 |  invalid css;',
        '    |  ^',
        '  3 | }',
        '',
      ].join('\n')
    );
  });
});

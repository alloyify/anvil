# safe-require

[![][build-img]][build]
[![][coverage-img]][coverage]
[![][dependencies-img]][dependencies]
[![][devdependencies-img]][devdependencies]
[![][npm-img]][npm]

A function that acts pretty much like [require](http://nodejs.org/api/globals.html#globals_require) but returns
undefined when the module is not found (instead of throwing an exception).

[build]:               https://travis-ci.org/tallesl/node-safe-require
[build-img]:           https://travis-ci.org/tallesl/node-safe-require.svg
[coverage]:            https://coveralls.io/r/tallesl/node-safe-require?branch=master
[coverage-img]:        https://coveralls.io/repos/tallesl/node-safe-require/badge.svg?branch=master
[dependencies]:        https://david-dm.org/tallesl/node-safe-require
[dependencies-img]:    https://david-dm.org/tallesl/node-safe-require.svg
[devdependencies]:     https://david-dm.org/tallesl/node-safe-require#info=devDependencies
[devdependencies-img]: https://david-dm.org/tallesl/node-safe-require/dev-status.svg
[npm]:                 https://www.npmjs.com/package/safe-require
[npm-img]:             https://badge.fury.io/js/safe-require.svg

## Usage

```
$ npm install safe-require
(...)
$ node
> var safeRequire = require('safe-require')
undefined
> safeRequire('url') // loads any module, local or not, just as require()
{ parse: [Function: urlParse],
  resolve: [Function: urlResolve],
  resolveObject: [Function: urlResolveObject],
  format: [Function: urlFormat],
  Url: [Function: Url] }
> safeRequire('nonexistent') // require('nonexistent') would throw "Cannot find module 'nonexistent'"
undefined
```

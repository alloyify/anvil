'use strict'

const assert = require('assert')
const safeRequire = require('..')

/* global describe, it */

describe('global', () => {
  it('found', () => assert.equal(safeRequire('url'), require('url')))
  it('not found', () => assert.equal(safeRequire('nonexistent'), undefined))
})

describe('local', () => {
  it('found', () => assert.equal(safeRequire('./dir/ok'), require('./dir/ok')))
  it('not found', () => assert.equal(safeRequire('./foo'), undefined))
  it('with error', () => {
    assert.throws(() => safeRequire('./dir/nok.js'), /Cannot find module/)
  })
})

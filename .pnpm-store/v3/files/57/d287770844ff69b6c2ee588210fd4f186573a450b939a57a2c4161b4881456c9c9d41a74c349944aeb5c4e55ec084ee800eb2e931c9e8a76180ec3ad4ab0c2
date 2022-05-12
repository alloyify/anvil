'use strict'

const path = require('path')

module.exports = (p) => {
  if (p.startsWith(`.${path.sep}`) || p.startsWith(`..${path.sep}`)) {
    p = path.resolve(path.dirname(module.parent.filename), p)
  }

  try {
    return require(p)
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      const match = err.message.match(/Cannot find module '(.*?)'/)
      if (match !== null && [p, p.replace(/\\/g, '\\\\')].includes(match[1])) {
        return undefined
      }
    }
    throw err
  }
}

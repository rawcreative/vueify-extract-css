const isRequire = require('is-require')()
const through = require('through2')
const falafel = require('falafel')
const assert = require('assert')
const fs = require('fs')

module.exports = cssExtract

function cssExtract(bundle, opts) {
  opts = opts || {}

  var outFile = opts.out || opts.o || 'bundle.css'

  assert.equal(typeof bundle, 'object', 'bundle should be an object')
  assert.equal(typeof opts, 'object', 'opts should be an object')

  bundle.on('reset', addHooks)
  addHooks()

  function addHooks() {
    // add before pack step as it's the earliest vueify adds the calls to insert css
    bundle.pipeline.get('pack').unshift(through.obj(write, flush))
    const writeStream = (typeof outFile === 'function') ? outFile() : fs.createWriteStream(outFile)

    function write(chunk, enc, cb) {
      const css = extract(chunk)
      writeStream.write(css)
      cb(null, chunk)
    }

    // close stream and signal end
    function flush(cb) {
      writeStream.end()
      cb()
    }
  }
}


function extract(chunk) {

  if (chunk.source.indexOf('__vueify_insert__') === -1) return ''

  const css = []

  const ast = falafel(chunk.source, {
    ecmaVersion: 6
  }, function(node) {

    if(node.type !== 'CallExpression') return

    if(!node.callee.object) return 

    if(!node.callee.object.name || node.callee.object.name !== '__vueify_insert__') return
      
    if (!node.arguments) return

    if (!node.arguments[0]) return
 
    css.push(node.arguments[0].value)
    node.update('0')
  });

  chunk.source = ast.toString()

  return css.join('\n')
}

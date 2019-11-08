
const walkSync = require('walk-sync')
const functionFiles = walkSync('./', { globs: ['**/*.function.js'], ignore: ['node_modules'] })
module.exports = functionFiles.reduce((obj, file) => ({ ...obj, [file.substr(file.lastIndexOf('/') + 1).replace(/\.function\.js$/i, '')]: require('./' + file.substr(file.indexOf('/') + 1)) }), {})

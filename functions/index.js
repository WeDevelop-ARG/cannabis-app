const admin = require('firebase-admin')
const walkSync = require('walk-sync')

admin.initializeApp()
const functionFiles = walkSync('./', { globs: ['**/*.function.js'], ignore: ['node_modules'] })
module.exports = functionFiles.reduce((obj, file) => ({ ...obj, [file.substr(file.lastIndexOf('/') + 1).replace(/\.function\.js$/i, '')]: require('./' + file) }), {})

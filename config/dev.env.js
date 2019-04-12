'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT: '"http://119.29.4.230:9080"'
  API_ROOT: '"http://127.0.0.1:9080"'

})

var gulp = require('gulp')

require('../index.js')(gulp, {
  exclude: ['v', 'ver'],
  require: ['necessary', 'v', 'ver'],
  requireStrict: true
})

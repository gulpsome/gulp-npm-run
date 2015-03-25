"use strict"

var R = require('ramda'),
    path = require('path'),
    help = require('gulp-help'),
    red = require('chalk').red,
    log = require('gulp-util').log,
    run = require('childish-process')

module.exports = function (gulp, opts) {
  gulp = help(gulp)

  var def = R.merge({
    include: [],
    exclude: [],
    require: [],
    requireStrict: false,
    customize: {}
  })
  var o = def(opts || {})
  var theScripts = require(path.join(process.cwd(), 'package.json')).scripts
  var backtick = function (str) { return '`' + str + '`' }
  var includeHelp = R.mapObj(backtick, theScripts)
  if (R.is(Object, o.include)) {
    includeHelp = R.merge(includeHelp, o.include)
    o.include = R.keys(o.include)
  }
  var allScripts = R.keys(theScripts)
  var useScripts = R.difference(allScripts, o.exclude) // the ones to become tasks
  if (o.templates) {
    run = run({childish: {templates: require(path.join(process.cwd(), o.templates))}})
  }

  if (useScripts.length) {
    if(R.intersection(allScripts, o.require).length < o.require.length) {
      // some required script was not in package.json
      log(red("Not all of the required scripts were found in package.json"))
      log(red("Missing:"), R.difference(o.require, allScripts))
      if (o.requireStrict) process.exit(1)
    }
    useScripts.forEach(function (script) {
      gulp.task(script, includeHelp[script], function () {
        var recipe = o.customize[script] || o.default || 'default'
        if (typeof recipe === "string") {
          recipe = {template: recipe}
        }
        run('npm run ' + script, {childish: recipe})
      })
    })
  }

  return gulp
}

var R = require('ramda'),
    path = require('path'),
    help = require('gulp-help'),
    red = require('chalk').red,
    log = require('gulp-util').log
    run = require('childish-process')

module.exports = function (gulp, opts) {
  gulp = help(gulp)

  var def = R.merge({exclude: [], require: [], requireStrict: false, customize: {}})
  var o = def(opts || {})
  var scriptsThe = require(path.join(process.cwd(), 'package.json')).scripts
  var scriptsAll = R.keys(scriptsThe)
  var scripts = R.difference(scriptsAll, o.exclude) // the ones to become tasks
  if (o.templates) {
    run = run({childish: {templates: require(path.join(process.cwd(), o.templates))}})
  }

  if (scripts.length) {
    if(R.intersection(scriptsAll, o.require).length < o.require.length) {
      // some required script was not in package.json
      log(red("Not all of the required scripts were found in package.json"))
      log(red("Missing:"), R.difference(o.require, scriptsAll))
      if (o.requireStrict) process.exit(1)
    }
    scripts.forEach(function (script) {
      var help = '`' + scriptsThe[script] + '`'
      gulp.task(script, help, function () {
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

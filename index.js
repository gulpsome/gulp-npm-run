var R = require('ramda'),
    path = require('path'),
    red = require('chalk').red,
    log = require('gulp-util').log
    run = require('childish-process')

module.exports = function (gulp, opts) {
  var def = R.merge({exclude: [], require: [], requireStrict: false, customize: {}})
  var o = def(opts || {})
  var scriptsAll = R.keys(require(path.join(process.cwd(), 'package.json')).scripts)
  var scripts = R.difference(scriptsAll, o.exclude)
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
      gulp.task(script, function () {
        var recipe = o.customize[script] || o.default || 'default'
        if (typeof recipe === "string") {
          recipe = {template: recipe}
        }
        run('npm run ' + script, {childish: recipe})
      })
    })
  }
}

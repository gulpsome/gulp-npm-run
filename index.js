var _ = require('lodash')
var path = require('path')
var run = require('childish-process')

module.exports = function (gulp, opts) {
  var o = opts || {}
  _.defaults(o, {exclude: [], require: [], requireStrict: false, customize: {}})
  var scripts = _.keys(require(path.join(process.cwd(), 'package.json')).scripts)
  scripts = _.difference(scripts, o.exclude)
  if (o.templates) {
    run = run({childish: {templates: require(path.join(process.cwd(), o.templates))}})
  }

  if (scripts.length) {
    if(_.intersection(scripts, o.require).length < o.require.length) {
      // some required script was not in package.json
      console.error("Not all of the required scripts were found in package.json")
      console.error("Missing:", _.difference(o.require, scripts))
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

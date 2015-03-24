# gulp-npm-run

Creates gulp tasks for your npm scripts.
Notifies if a task fails, using node-notifier via childish-process.
Notifications can be customized.

## Use

[![NPM](https://nodei.co/npm/gulp-npm-run.png?mini=true)](https://www.npmjs.org/package/gulp-npm-run)

As simple as it gets:

```javascript
var gulp = require('gulp')
require('gulp-npm-run')(gulp)
```

It can take configuration options, here are a couple of them:

```javascript
var gulp = require('gulp')
require('gulp-npm-run')(gulp, {
  exclude: ['test'],
  require: ['necessary']
})
```

By `require` we insist there must be corresponding scripts in `package.json` -
it's a declaration of assumptions or dependencies to insist on being satisfied.

The `test` script / task is good to `exclude` in favor of
[gulp-npm-test](https://github.com/orlin/gulp-npm-test),
which does the same, only better.
Or, perhaps because you'd like to implement your very own test task.

See [datomiki](https://github.com/datomicon/datomiki) for a practical / more advanced usage example.

See [childish-process](https://github.com/orlin/childish-process)
for further understanding of templates / options / notifications.

## Tests [![Build Status](https://img.shields.io/travis/orlin/gulp-npm-run.svg?style=flat)](http://travis-ci.org/orlin/gulp-npm-run)

```sh
install.sh #once
npm test
```

Though `gulp-npm-test` should work on any platform, its tests probably
need a _*nix_ to run - Linux, Mac, etc.

## License

[MIT](http://orlin.mit-license.org)

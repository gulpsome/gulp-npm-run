# gulp-npm-run

Creates gulp tasks for your npm scripts.
Notifies if a task fails, using node-notifier via childish-process.
Notifications can be customized.

## Use

[![NPM](https://nodei.co/npm/gulp-npm-run.png?mini=true)](https://www.npmjs.org/package/gulp-npm-run)

```javascript
var gulp = require('gulp')
require('gulp-npm-run')(gulp)
```

See [datomiki](https://github.com/datomicon/datomiki)'s gulpfile.js for more advanced usage.


## Tests [![Build Status](https://img.shields.io/travis/orlin/gulp-npm-run.svg?style=flat)](http://travis-ci.org/orlin/gulp-npm-run)

```sh
install.sh #once
npm test
```

Though `gulp-npm-test` should work on any platform, its tests probably
need a _*nix_ to run - Linux, Mac, etc.

## License

[MIT](http://orlin.mit-license.org)

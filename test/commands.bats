load $(which batshit-helpers)

gulp="$(pwd)/test/node_modules/.bin/gulp --gulpfile $(pwd)/test/gulpfile.js"

@test "gulp-npm-run should create a test task for npm test" {
  run $gulp test
  assert_success
}

@test "gulp-npm-run should create a test task for any of the package.json scripts" {
  run $gulp deps
  assert_success
}

@test "except gulp-npm-run shouldn't create tasks for explicitly excluded scripts" {
  run $gulp prune
  assert_failure
}

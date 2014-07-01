'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var boolifyString = require('boolify-string');

var paths = {
  lint: ['./gulpfile.js', './app/index.js'],
  watch: ['./gulpfile.js', './app/index.js', './test/**/*.js', '!test/{temp,temp/**}'],
  tests: ['./test/**/*.js', '!test/{temp,temp/**}'],
  source: ['./app/index.js']
};

gulp.task('lint', function () {
  return gulp.src(paths.lint)
    .pipe($.if(!boolifyString(process.env.CI), $.plumber()))
    .pipe($.jshint('.jshintrc'))
    .pipe($.jscs())
    .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('istanbul', function (cb) {
  gulp.src(paths.source)
    .pipe($.istanbul()) // Covering files
    .on('finish', function () {
      gulp.src(paths.tests, {cwd: __dirname})
        .pipe($.if(!boolifyString(process.env.CI), $.plumber()))
        .pipe($.mocha())
        .pipe($.istanbul.writeReports()) // Creating the reports after tests runned
        .on('finish', function() {
          process.chdir(__dirname);
          cb();
        });
    });
});

gulp.task('watch', ['test'], function () {
  gulp.watch(paths.watch, ['test']);
});

gulp.task('default', ['test']);
gulp.task('test', ['lint', 'istanbul']);

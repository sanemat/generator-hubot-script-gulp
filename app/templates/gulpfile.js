'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');

var paths = {
  lint: ['./gulpfile.js', './lib/**/*.js'],
  watch: ['./gulpfile.js', './lib/**/*.js', './test/**/*.js', '!test/{temp,temp/**}'],
  tests: ['./test/**/*.js', '!test/{temp,temp/**}'],
  source: ['./lib/**/*.js']
};

gulp.task('lint', function(){
  return gulp.src(['./src/**/*.coffee'])
    .pipe($.coffeelint('./coffeelint.json'))
    .pipe($.coffeelint.reporter());
});

gulp.task('clean', del.bind(null, ['./compile']));
gulp.task('clean:coverage', del.bind(null, ['./coverage']));
gulp.task('istanbul', function (cb) {
  gulp.src(paths.source)
    .pipe($.istanbul()) // Covering files
    .on('finish', function () {
      gulp.src(paths.tests, {cwd: __dirname})
        .pipe($.plumber())
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

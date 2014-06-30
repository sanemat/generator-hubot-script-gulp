'use strict'

gulp = require 'gulp'
$ = (require 'gulp-load-plugins') lazy: false
del = require 'del'
es = require 'event-stream'

paths = {
  lint: ['./gulpfile.js', './src/**/*.js'],
  watch: ['./gulpfile.js', './src/**/*.js', './test/**/*.js', '!test/{temp,temp/**}'],
  tests: ['./test/**/*.js', '!test/{temp,temp/**}'],
  source: ['./src/**/*.js']
}

gulp.task 'lint', ->
  gulp.src(['./src/**/*.coffee'])
    .pipe($.coffeelint('./coffeelint.json'))
    .pipe($.coffeelint.reporter())

gulp.task 'clean', del.bind(null, ['./compile'])
gulp.task 'clean:coverage', del.bind(null, ['./coverage'])

gulp.task 'compile', ['lint'], ->
  es.merge(
    gulp.src('./src/**/*.coffee')
      .pipe($.sourcemaps.init())
      .pipe($.coffee({ bare: true }).on('error', $.util.log))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest('./compile/src'))
    gulp.src('./test/**/*.coffee')
      .pipe($.sourcemaps.init())
      .pipe($.coffee({ bare: true }).on('error', $.util.log))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest('./compile/test'))
  )

gulp.task 'istanbul', ['clean:coverage', 'compile'], (cb) ->
  gulp.src(['./compile/src/**/*.js'])
    .pipe($.istanbul()) #Covering files
    .on 'finish', ->
      gulp.src(['./compile/test/**/*.js'], {cwd: __dirname})
        .pipe($.plumber())
        .pipe($.mocha())
        .pipe($.istanbul.writeReports()) #Creating the reports after tests runned
        .on 'finish', ->
          process.chdir(__dirname)
          cb()
  undefined

gulp.task 'watch', ['test'], ->
  gulp.watch(paths.watch, ['test'])

gulp.task 'default', ['test']
gulp.task 'test', ['lint', 'istanbul']

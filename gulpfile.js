const gulp = require('gulp')
const babelify = require('babelify')
const browserify = require('browserify')
const browserSync = require('browser-sync')
const source = require('vinyl-source-stream')
const del = require('del')

var config = {
  src:     __dirname + '/src',
  htmlin:  __dirname + '/src/html/**/*.html',
  cssin:   __dirname + '/src/css/**/*.css',
  jsin:    __dirname + '/src/js/**/*.js',
  jsentry: __dirname + '/src/js/index.js',
  imgin:   __dirname + '/src/img/**/*',
  cssout:  __dirname + '/docs/css/',
  jsout:   __dirname + '/docs/js/',
  imgout:  __dirname + '/docs/img/',
  htmlout: __dirname + '/docs'
}

gulp.task('reload', function () {
  browserSync.reload()
})

gulp.task('serve', ['images', 'scripts', 'css', 'html'], function () {
  browserSync({
    server: config.htmlout
  })

  gulp.watch(config.jsin, ['scripts', 'reload'])
  gulp.watch(config.cssin, ['css', 'reload'])
  gulp.watch(config.imgin, ['images', 'reload'])
  gulp.watch(config.htmlin, ['html', 'reload'])
})

gulp.task('css', function () {
  return gulp.src(config.cssin)
    .pipe(gulp.dest(config.cssout))
})

gulp.task('scripts', function () {
  return browserify({entries: config.jsentry, extensions: ['.js'], debug: true})
    .transform(babelify)
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest(config.jsout))
})

gulp.task('images', function () {
  return gulp.src(config.imgin)
    .pipe(gulp.dest(config.imgout))
})

gulp.task('html', function () {
  return gulp.src(config.htmlin)
    .pipe(gulp.dest(config.htmlout))
})

gulp.task('clean', function () {
  let paths = [
    config.jsout + '/**/*.js',
    config.cssout + '/**/*.css',
    config.imgout + '/**/*',
    config.htmlout + '/**/*.html'
  ]
  return del(paths).then(function () {
  }).catch(function () {
  })
})

gulp.task('build', ['scripts', 'css', 'html'])

gulp.task('default', ['serve'])

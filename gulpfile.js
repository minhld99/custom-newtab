var browserify = require('browserify'),
    gulp = require('gulp'),
    minifyCss = require('gulp-minify-css'),
    minify = require('gulp-minify'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require("vinyl-source-stream"),
    reactify = require('reactify'),
    rm = require('gulp-rimraf');

gulp.task('clean', function() {
  return gulp.src('src/dist/*').pipe(rm());
});

gulp.task('browserify', ['clean'], function(){
  var b = browserify();
  b.transform(reactify);
  b.add('./src/js/app.jsx');
  return b.bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./src/dist'));
});

gulp.task('minify-css', ['browserify'], function() {
	return gulp.src('./src/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/dist'));
});

gulp.task('default', ['minify-css']);

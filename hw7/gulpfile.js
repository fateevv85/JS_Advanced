var gulp = require('gulp'),
    useref = require('gulp-useref'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    gulpif = require('gulp-if'),
    minifyCSS = require('gulp-minify-css');

gulp.task('project', function () {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCSS()))
    .pipe(gulpif('*.css', autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    })))
    .pipe(gulp.dest('dist'))
    .pipe(notify('Done!'));
});

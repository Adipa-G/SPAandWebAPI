/// <binding AfterBuild='copy-templates,sass,copyAppJS' />
var path = require("path");
var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');

gulp.task('copy-libs', function () {
    gulp.src(['./web-src/lib/*.js', '!./web-src/lib/highlight.min.js'])
    .pipe(uglify())
    .pipe(gulp.dest('./web/lib'));

    gulp.src(['./web-src/lib/highlight.js'])
    .pipe(gulp.dest('./web/lib'));

    gulp.src(['./web-src/content/css/*.css'])
    .pipe(cleanCSS())
    .pipe(gulp.dest('./web/content/css'));

    gulp.src(['./web-src/content/fonts/*.*'])
    .pipe(gulp.dest('./web/content/fonts'));

    return gulp.src(['./web-src/content/images/*.*'])
    .pipe(gulp.dest('./web/content/images'));
});

gulp.task('copy-templates', function () {
    return gulp.src('./web-src/app/views/**/*.html')
      .pipe(gulp.dest('./web/app/views'));
});

gulp.task('sass', function () {
    return gulp.src('./web-src/content/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(cleanCSS())
      .pipe(gulp.dest('./web/content/css'));
});

gulp.task('watch', function () {
    gulp.watch('./web-src/app/views/**/*.html', ['copy-templates']);
    gulp.watch('./web-src/app/**/*.js', ['copyAppJS']);
    gulp.watch('./web-src/content/scss/**/*.scss', ['sass']);
});

/// <binding AfterBuild='moveToLibs' />
var gulp = require('gulp');
var rename = require('gulp-rename');

gulp.task('moveToLibs', function (done) {
    gulp.src([
      'node_modules/es6-shim/es6-shim.min.js*',
      'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
      'node_modules/systemjs/dist/*.*',
      'node_modules/jquery/dist/jquery.*js',
      'node_modules/bootstrap/dist/js/bootstrap*.js',
      'node_modules/rxjs/bundles/Rx.js',
      'node_modules/angular-loading-bar/build/loading-bar.js',
      'node_modules/moment/moment.js',
      'scripts/common-scripts.js'
    ]).pipe(gulp.dest('./wwwroot/libs/'));

    gulp.src([
      'node_modules/angular2/bundles/*.*'
    ]).pipe(gulp.dest('./wwwroot/libs/angular2/'));

    gulp.src([
      'node_modules/bootstrap/dist/css/bootstrap.css',
      'node_modules/angular-loading-bar/build/loading-bar.css',
      'node_modules/font-awesome/css/font-awesome.css'
    ]).pipe(gulp.dest('./wwwroot/libs/css'));

    gulp.src('node_modules/font-awesome/fonts/*.*')
    .pipe(gulp.dest('./wwwroot/libs/fonts'));

    gulp.src('scripts/**/*.html')
    .pipe(gulp.dest('./wwwroot/templates'));
});
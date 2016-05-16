/// <binding AfterBuild='copy-libs,copy-templates,sass' />
var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var ts = require('gulp-typescript');

gulp.task('copy-libs', function (done) {
    gulp.src([
      './node_modules/es6-shim/es6-shim.min.js*',
      './node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
      './node_modules/systemjs/dist/*.*',
      './node_modules/jquery/dist/jquery.*js',
      './node_modules/bootstrap/dist/js/bootstrap*.js',
      './node_modules/rxjs/bundles/Rx.js',
      './node_modules/angular-loading-bar/build/loading-bar.js',
      './node_modules/moment/moment.js',
      './scripts/common-scripts.js'
    ]).pipe(gulp.dest('./wwwroot/libs/'));

    gulp.src([
      './node_modules/angular2/bundles/*.*'
    ]).pipe(gulp.dest('./wwwroot/libs/angular2/'));

    gulp.src([
      './node_modules/bootstrap/dist/css/bootstrap.css',
      './node_modules/angular-loading-bar/build/loading-bar.css',
      './node_modules/font-awesome/css/font-awesome.css'
    ]).pipe(gulp.dest('./wwwroot/libs/css'));

    return gulp.src('./node_modules/font-awesome/fonts/*.*')
      .pipe(gulp.dest('./wwwroot/libs/fonts'));
});

gulp.task('copy-templates', function () {
    return gulp.src('./scripts/**/*.html')
      .pipe(gulp.dest('./wwwroot/templates'));
});

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./wwwroot/libs/css'));
});

gulp.task('typescript', function () {
    var tsProject = ts.createProject('./scripts/tsconfig.json');
    var tsResult = tsProject.src()
		.pipe(ts(tsProject));
    return tsResult.js.pipe(gulp.dest('./wwwroot/appScripts'));
});

gulp.task('watch', function () {
    gulp.watch('scripts/**/*.html', ['copy-templates']);
    gulp.watch('scripts/**/*.ts', ['typescript']);
    gulp.watch('./sass/**/*.scss', ['sass']);
});


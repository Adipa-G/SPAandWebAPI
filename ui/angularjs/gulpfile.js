/// <binding AfterBuild='copy-templates,sass,copyAppJS' />
var path = require("path");
var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass')(require('sass'));
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');

var KarmaServer = require('karma').Server;
var templateCache = require('gulp-templatecache');

gulp.task('copy-libs', function () {
    gulp.src(['./web-src/lib/*.js', '!./web-src/lib/highlight.min.js'])
    .pipe(uglify())
    .pipe(gulp.dest('./dist/lib'));

    gulp.src(['./web-src/lib/highlight.min.js'])
    .pipe(gulp.dest('./dist/lib'));

    gulp.src(['./web-src/content/css/*.css'])
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/content/css'));

    gulp.src(['./web-src/content/fonts/*.*'])
    .pipe(gulp.dest('./dist/content/fonts'));

    return gulp.src(['./web-src/content/images/*.*'])
    .pipe(gulp.dest('./dist/content/images'));
});

gulp.task('copy-templates', function () {
    return gulp.src('./web-src/app/views/**/*.html')
      .pipe(gulp.dest('./dist/app/views'));
});

gulp.task('sass', function () {
    return gulp.src('./web-src/content/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(cleanCSS())
      .pipe(gulp.dest('./dist/content/css'));
});

gulp.task('copyAppJS', function () {
    gulp.src([
            './web-src/app/app.js',
            './web-src/app/services/**/*.js',
            './web-src/app/directives/**/*.js',
            './web-src/app/controllers/**/*.js'
        ])
        .pipe(concat('app.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./dist/app/'));
		
	gulp.src([
            './web-src/index.html'
        ])
        .pipe(gulp.dest('./dist/'));

    return gulp.src([
            './web-src/app/common-scripts.js',
            './web-src/app/system-config.js'
        ])
        .pipe(uglify())
        .pipe(gulp.dest('./dist/app/'));
});

gulp.task('test', function () {
    var options = {
        output: 'templates.js',
        strip: 'app',
        prepend: 'app',
        moduleName: 'templates',
        minify: {}
    }

    gulp.src('./web-src/app/views/**/*.html')
        .pipe(templateCache(options))
        .pipe(gulp.dest('./web-test/app'));

    new KarmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }).start();
});

gulp.task('watch', function () {
    gulp.watch('./web-src/app/views/**/*.html', ['copy-templates']);
    gulp.watch('./web-src/app/**/*.js', ['copyAppJS']);
    gulp.watch('./web-src/content/scss/**/*.scss', ['sass']);
});

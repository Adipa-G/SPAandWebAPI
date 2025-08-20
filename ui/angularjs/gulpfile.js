/// <binding AfterBuild='copy-templates,sass,copyAppJS' />
var path = require("path");
var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass')(require('sass'));
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
const { Server } = require('karma');
var templateCache = require('gulp-templatecache');

// Copy libs task
gulp.task('copy-libs', function () {
    return Promise.all([
        gulp.src(['./web-src/lib/*.js', '!./web-src/lib/highlight.min.js'])
            .pipe(uglify())
            .pipe(gulp.dest('./dist/lib')),

        gulp.src(['./web-src/lib/highlight.min.js'])
            .pipe(gulp.dest('./dist/lib')),

        gulp.src(['./web-src/content/css/*.css'])
            .pipe(cleanCSS())
            .pipe(gulp.dest('./dist/content/css')),

        gulp.src(['./web-src/content/fonts/*.*'])
            .pipe(gulp.dest('./dist/content/fonts')),

        gulp.src(['./web-src/content/images/*.*'])
            .pipe(gulp.dest('./dist/content/images'))
    ]);
});

// Copy templates task
gulp.task('copy-templates', function () {
    return gulp.src('./web-src/app/views/**/*.html')
        .pipe(gulp.dest('./dist/app/views'));
});

// Sass compilation task
gulp.task('sass', function () {
    return gulp.src('./web-src/content/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/content/css'));
});

// Copy app JS task
gulp.task('copyAppJS', function () {
    const appJs = gulp.src([
        './web-src/app/app.js',
        './web-src/app/services/**/*.js',
        './web-src/app/directives/**/*.js',
        './web-src/app/controllers/**/*.js'
    ])
        .pipe(concat('app.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./dist/app/'));

    const indexHtml = gulp.src(['./web-src/index.html'])
        .pipe(gulp.dest('./dist/'));

    const commonScripts = gulp.src([
        './web-src/app/common-scripts.js',
        './web-src/app/system-config.js'
    ])
        .pipe(uglify())
        .pipe(gulp.dest('./dist/app/'));

    return Promise.all([appJs, indexHtml, commonScripts]);
});

gulp.task('test', function (done) {
    var options = {
        output: 'templates.js',
        strip: 'app',
        prepend: 'app',
        moduleName: 'templates',
        minify: {}
    };

    return gulp.src('./web-src/app/views/**/*.html')
        .pipe(templateCache(options))
        .pipe(gulp.dest('./web-test/app'))
        .on('end', function() {
            const server = new Server({
                configFile: __dirname + '/karma.conf.js',
                singleRun: true
            }, function(exitCode) {
                done(exitCode);
            });
            server.start();
        });
});

// Watch task
gulp.task('watch', function () {
    gulp.watch('./web-src/app/views/**/*.html', gulp.series('copy-templates'));
    gulp.watch('./web-src/app/**/*.js', gulp.series('copyAppJS'));
    gulp.watch('./web-src/content/scss/**/*.scss', gulp.series('sass'));
});

// Default task
gulp.task('default', gulp.series('copy-libs', 'copy-templates', 'sass', 'copyAppJS'));
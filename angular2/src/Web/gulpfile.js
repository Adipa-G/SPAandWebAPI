"use strict";

const gulp = require("gulp");
const del = require("del");
const tsc = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const sass = require('gulp-sass');

gulp.task('clean', (cb) => {
    return del(["wwwroot"], cb);
});

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./wwwroot/css'));
});

gulp.task('tslint', () => {
    return gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: 'msbuild'
        }))
        .pipe(tslint.report());
});

gulp.task("compile", ["tslint"], () => {
    var tsProject = tsc.createProject("tsconfig.json");
    let tsResult = gulp.src(["./src/**/*.ts","!node_modules/**/*.ts"])
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(sourcemaps.write(".", {sourceRoot: '/src'}))
        .pipe(gulp.dest("wwwroot"));
});

gulp.task("resources", () => {
    return gulp.src(["src/**/*", "!**/*.ts"])
        .pipe(gulp.dest("wwwroot"));
});

gulp.task("libs", () => {
   gulp.src([
            'core-js/client/shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**/*.js',
            'zone.js/dist/**',
            '@angular/**/bundles/**',
            'jquery/dist/jquery.js',
            'bootstrap/dist/js/bootstrap*.js',
            'moment/moment.js'
        ], {cwd: "node_modules/**"}) 
        .pipe(gulp.dest("wwwroot/lib"));

   gulp.src('./node_modules/font-awesome/fonts/*.*')
        .pipe(gulp.dest('./wwwroot/fonts'));

    return gulp.src([
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'node_modules/font-awesome/css/font-awesome.css'
        ])
        .pipe(gulp.dest("wwwroot/css"));
});

gulp.task('watch', function () {
    gulp.watch(["src/**/*.ts"], ['compile']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
    gulp.watch(["src/**/*.html", "src/**/*.css"], ['resources']).on('change', function (e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });
});


gulp.task("build", ['sass','compile', 'resources', 'libs'], () => {
    console.log("Building the project ...");
});
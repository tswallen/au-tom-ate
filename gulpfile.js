var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var styleInject = require("gulp-style-inject");

var src = 'src/';
var dist = 'dist/';

gulp.task('build-pug', function buildHTML() {
    return gulp.src(src + '*.pug')
        .pipe(pug({
        // Your options in here. 
        }))
        .pipe(gulp.dest(dist))
    });

gulp.task('build-sass', function () {
    return gulp.src(src + '*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(dist));
    });

gulp.task('add-styles', function () {
    return gulp.src(dist + "**/*.html")
        .pipe(styleInject())
        .pipe(gulp.dest(dist));
});

gulp.task('watch', function () {
    gulp.watch(src + '*.pug', ['build-pug']);
    gulp.watch(src + '*.sass', ['build-sass', 'build-pug']);
    gulp.watch(dist + '*.html', ['add-styles'])
});

gulp.task('default', ['watch']);

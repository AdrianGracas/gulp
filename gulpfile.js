const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const unglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');
const gulp = require('gulp');

function comprimeImagens() {
    return gulp.src('./source/imagens/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/imagens'));
}

function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
    .pipe(unglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'))
}

function compilaSass () {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

exports.default = function() {
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false} , gulp.series(compilaSass));
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false} , gulp.series(comprimeJavaScript));
    gulp.watch('./source/imagens/*', {ignoreInitial: false} , gulp.series(comprimeImagens));
};

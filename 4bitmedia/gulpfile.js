const gulp = require('gulp'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      csso = require('gulp-csso')
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify');

gulp.task('default', ['sass', 'js']);

gulp.task('sass', () => {
    return gulp.src('./sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('js', () => {
    return gulp.src([
        './node_modules/wowjs/dist/wow.min.js',
        './node_modules/smoothscroll-polyfill/dist/smoothscroll.js',
        './js/*.js'
    ])
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', () => {
    gulp.watch('./sass/**/*.scss', ['sass']);
});
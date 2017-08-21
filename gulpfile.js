var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();



/* Start simple webserver and reload when sources have changed */
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
});


/* Preprocess sass source files into a single css file*/
gulp.task('sass', function () {
    return gulp.src('src/styles/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});


gulp.task('html', function () {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
    return gulp.src('src/scripts/**/*.js')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('assets', function () {
    return gulp.src('src/assets/**/*')
        .pipe(gulp.dest('dist/assets'))
        .pipe(browserSync.stream());
});

gulp.task('watch', ["server"], function() {
    gulp.watch('src/styles/**/*.scss', ['sass']);
    gulp.watch('src/index.html', ['html']);
    gulp.watch('src/assets/**/*', ['assets']);
    gulp.watch('src/scripts/**/*', ['scripts']);
});


gulp.task('default', ["html", "sass", "assets", "scripts"], function() {});

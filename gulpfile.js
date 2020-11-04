var gulp          = require('gulp');
var browserSync   = require('browser-sync');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var concatCSS     = require('gulp-concat-css');

// Static Server + watching scss/html files
gulp.task('serve', function() {

    browserSync.init({
        server: "src/"
    });
    //Следим за изменением файлов
    gulp.watch("src/sass/*.sass", gulp.parallel('sass'));
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Компилируем SASS в CSS и обновляем страницу
gulp.task('sass', function() {
    return gulp.src("src/sass/*.sass")
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(concatCSS("style.css"))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', gulp.parallel('serve', 'sass'));
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

// process JS files and return the stream.
gulp.task('css', function () {
    return gulp.src('css/*css')
});

gulp.task('script', function () {
    return gulp.src('js/*js')
});


// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('css-watch', ['css'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('js-watch', ['script'], function (done) {
    browserSync.reload();
    done();
});

// use default task to launch Browsersync and watch JS files
gulp.task('default', ['css', 'script', 'sass'], function () {

    // Serve files from the root of this project
    browserSync.init(['css-watch', '*.html', 'js-watch','sass:watch'],{
        server: {
            baseDir: "./"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("css/*.css", ['css-watch',]);
    gulp.watch("js/*js", ['js-watch',]);
    gulp.watch('./sass/*.scss', ['sass']);
    gulp.watch("css/*.css").on('change', browserSync.reload());
});

gulp.task('sass', function () {
  gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var pkg = require('./package.json');
var dirs = pkg['h5bp-configs'].directories;
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');



gulp.task('concat:js', function() {
    return gulp.src([dirs.src + '/core.js', dirs.src + '/ajax.js', dirs.src + '/event.js', dirs.src + '/promise.js'])
        .pipe(concat('core.js'))
        .pipe(gulp.dest(dirs.dist))
});
gulp.task('compress:js', function() {
    return gulp.src([dirs.src + '/core.js', dirs.src + '/ajax.js', dirs.src + '/event.js', dirs.src + '/promise.js'])
        .pipe(concat('core.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dirs.dist))
});




gulp.task('jshint', function() {
    return gulp.src([
            'gulpfile.js',
            dirs.src + '/*.js'
        ]).pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
});


// -----------------------------------------------------------------------------
// | Main tasks                                                                |
// -----------------------------------------------------------------------------
gulp.task('clean', function(done) {
    require('del')([
        dirs.dist
    ], done);
});



gulp.task('build', function(done) {
    runSequence(
        ['clean'],
        'concat:js',
        'compress:js',
        done);
});

gulp.task('watch', function() {
    gulp.watch('src/*.js', ['build']);
});



gulp.task('default', ['build']);

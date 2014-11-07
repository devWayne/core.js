var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');    
var pkg = require('./package.json');
var dirs = pkg['h5bp-configs'].directories;
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');



gulp.task('concat:js', function() {
  return gulp.src(dirs.src +'/core.js')
    .pipe(concat('core.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dirs.dist))
});




gulp.task('jshint', function () {
    return gulp.src([
        'gulpfile.js',
         dirs.src+'/*.js'
    ]).pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('jshint-stylish'))
      .pipe(plugins.jshint.reporter('fail'));
});


// -----------------------------------------------------------------------------
// | Main tasks                                                                |
// -----------------------------------------------------------------------------
gulp.task('clean', function (done) {
    require('del')([
        dirs.dist
    ], done);
});



gulp.task('build', function (done) {
    runSequence(
        ['clean'],
	'concat:js',
    done);
});

gulp.task('default', ['build']);

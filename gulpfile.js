var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var path = require('path');
var PATHS = {
  app: path.join(__dirname, 'assets/'),
  js: path.join(__dirname, 'assets/js/'),
  sass: path.join(__dirname, 'assets/sass/'),
  dist: path.join(__dirname, 'assets/dist/')
};

gulp.task('js', function() {
  return gulp.src(PATHS.js + '*.js')
    .pipe(plugins.browserify({
      transform: 'babelify',
      insertGlobals : true,
		  debug : !gulp.env.production
    }))
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(PATHS.dist + 'js/'))
    .pipe(browserSync.stream());
});

gulp.task('sass', function() {
  return gulp.src(PATHS.sass + '*.scss')
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(plugins.cleanCss({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest(PATHS.dist + 'css/'))
    .pipe(browserSync.stream());
});

gulp.task('server', ['js', 'sass'], function() {
  browserSync.init({
    server: {
      baseDir: './assets'
    }
  });
  
  gulp.watch(PATHS.app + '*.html', browserSync.reload);
  gulp.watch(PATHS.js + '*.js', ['js']);
  gulp.watch(PATHS.sass + '**/*.scss', ['sass']);
});

gulp.task('default', ['server']);
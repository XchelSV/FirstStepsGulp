/*
* Dependencias
*/
var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  nodemon = require('gulp-nodemon'),
  notify = require('gulp-notify'),
  livereload = require('gulp-livereload');

/*
* Configuración de la tarea 'minified'
*/
gulp.task('minified', function () {
  gulp.src('public/javascripts/*.js')
  .pipe(concat('todo.js'))
  .pipe(uglify())
  .pipe(gulp.dest('assert/js/'))

});


gulp.task('start', function () {
  nodemon({
    script: 'app.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
});


gulp.task('restart', function() {
	// listen for changes
	livereload.listen();
	// configure nodemon
	nodemon({
		// the script to run the app
		script: 'app.js',
		ext: 'js'
	}).on('restart', function(){
		// when the app has restarted, run livereload.
		gulp.src('app.js')
			.pipe(livereload())
			.pipe(notify('Reloading page, please wait...'));
	})
})

gulp.task('restartinwatch', function() {
	

		gulp.src('app.js')
			.pipe(livereload())
			.pipe(notify('Reloading page, please wait...'));
})

/*
* Gulp Watch
*/
gulp.watch('*.js', ['restartinwatch']);

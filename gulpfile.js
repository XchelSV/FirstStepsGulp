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
* Tareas
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
	// escuchando para cambios
	livereload.listen();
	// configurando nodemon
	nodemon({
		// Server Script
		script: 'app.js',
		ext: 'js'
	}).on('restart', function(){
		// Cuando app.js se reinicia, corre livereload()
		gulp.src('app.js')
			.pipe(livereload())
			.pipe(notify('Reloading page, please wait...'));
	})
})

gulp.task('restartinwatch', function() {
		
		//Accede al App.js
		gulp.src('app.js')
			//Reinicia el app.js
			.pipe(livereload())
			//Envía una Notificacion a nivel de SO
			.pipe(notify('Reloading page, please wait...'));
})


/*
* Gulp Watch (Activa la Tarea al modificarse un archivo con la extensión especificada)
*/
gulp.watch('*.js', ['restartinwatch']);

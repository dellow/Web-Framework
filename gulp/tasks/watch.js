/* ================================================== */
/* Require
/* ================================================== */
var gulp   = require('gulp'),
	watch  = require('gulp-watch'),
	lr     = require('tiny-lr'),
	server = lr();

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('watch', function(){
	var css = ['compass'],
		img = ['imagemin'],
		js  = ['browserify'];

	server.listen(35729, function(err){
		if(err){
			return console.log(err);
		}

		gulp.watch('./dist/css/scss/**/*.scss', css);
		gulp.watch('./dist/images/**/*', img);
		gulp.watch('./dist/js/**/*.js', js);
	});
});
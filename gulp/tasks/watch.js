/* ================================================== */
/* Require
/* ================================================== */
var gulp   = require('gulp'),
	lr     = require('tiny-lr'),
	server = lr();

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('watch', function(){
	server.listen(35729, function(err){
		if(err){
			return console.log(err);
		}

		gulp.watch({glob: GLOBAL.dist_dir + 'css/scss/**/*'}, function(){
			gulp.start('compass');
		});

		gulp.watch({glob: GLOBAL.dist_dir + 'js/**/*'}, function(){
			gulp.start('browserify');
		});
	});
});

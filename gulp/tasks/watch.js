/* ================================================== */
/* Require
/* ================================================== */
var gulp       = require('gulp'),
	watch      = require('gulp-watch'),
	lr         = require('tiny-lr'),
	server     = lr();

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('watch', function(){
	server.listen(35729, function(err){
		if(err){
			return console.log(err);
		}

		watch({glob: GLOBAL.dist_dir + 'css/scss/**/*.scss'}, function(){
			gulp.start('compass');
		});

		watch({glob: GLOBAL.dist_dir + 'images/icons/sprite/*.png'}, function(){
			gulp.start('sprite');
		});

		watch({glob: GLOBAL.dist_dir + 'js/app/*.js'}, function(){
			gulp.start('browserify');
		});
	});
});
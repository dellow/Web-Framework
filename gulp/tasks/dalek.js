/* ================================================== */
/* Require
/* ================================================== */
var gulp  = require('gulp'),
	dalek = require('gulp-dalek'),
	stylish = require('jshint-stylish');

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('dalek', function(){
    // Run on development only
    if(GLOBAL.is_development){
		return gulp.src(GLOBAL.dist_dir + 'js/spec/tests-dalek.js')
			.pipe(
				dalek({
					browser : [
						'phantomjs',
						// 'chrome'
					],
					reporter: [
						'console',
						//'html',
						//'junit'
					]
				})
			);
    }
});
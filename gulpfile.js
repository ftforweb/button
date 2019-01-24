var gulp = require('gulp'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
cssnano = require('gulp-cssnano'),
sourcemaps = require('gulp-sourcemaps'),
rename = require('gulp-rename'),
notify = require('gulp-notify'),
reload = require('gulp-livereload'),
connect = require('gulp-connect'),
uglify = require('gulp-uglify'),
jshint = require('gulp-jshint'),
concat = require('gulp-concat'),
babel = require('gulp-babel'),
watch = require('gulp-watch');

//sass
gulp.task('sass', function() {
	return gulp.src('scss/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(autoprefixer('last 2 version'))
	.pipe(sourcemaps.write())
	.pipe(rename({suffix: '.min'}))
	.pipe(connect.reload())
	.pipe(notify({
		message: 'sass!'
	}))
	.pipe(gulp.dest('css'));
});

//server
gulp.task('server', function() {
	connect.server({
		root: '',
		livereload: true
	});
});

gulp.task('html', function () {
	gulp.src('*.html')
	.pipe(connect.reload())
	.pipe(notify({
		message: 'html!'
	}));
});

//watcher
gulp.task('watch', function () {
	gulp.watch(['*.html'], ['html']);
	gulp.watch(['scss/**/*.scss'], ['sass']);
});

gulp.task('default', ['server', 'watch']);




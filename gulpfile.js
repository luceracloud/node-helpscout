/**
 * Gulpfile.js
 * All automated tasks go here
 *
 * @module  Gulpfile
 * @author  Randy Lebeau
 *
 */


var gulp = require('gulp'),
	exit = require('gulp-exit'),
	mocha = require('gulp-mocha');

gulp.task('test', function() {
	return gulp.src('tests/HelpScout-test.js', {
			read: false
		})
		.pipe(mocha({
			reporter: 'nyan'
		}))
		.pipe(exit());
});

var jsdocOptions = {},
	jsdoc = require('gulp-jsdoc'),
	path = require('path');

gulp.task('jsdoc', function() {
	return gulp.src(path.join('./*.js'))
		.pipe(jsdoc.parser(jsdocOptions, 'jsdoc.json'))
		.pipe(jsdoc.generator('./docs'));
});
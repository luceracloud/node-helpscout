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
	shell = require('gulp-shell');

gulp.task('jsdoc', shell.task(
		'./node_modules/.bin/jsdoc -c jsdoc.json', {cwd: './'}
	)
);

gulp.task('build-docs', shell.task('make html', {cwd: './docs'}));
 
gulp.task('docs', ['jsdoc', 'build-docs'], function() {
  gulp.watch(['./docs/rst/*.rst', './docs/rst/*.py'], ['build-docs'])
});
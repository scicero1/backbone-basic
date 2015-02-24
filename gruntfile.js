module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				//separator: ';',
			},
			dist: {
				src: [
					'js/components/**/model/*.js',
					'js/components/**/collection/*.js',
					'js/components/**/view/*.js'
				],
				dest: 'js/compiled.js',
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');

	// A very basic default task.
	grunt.registerTask('default', [
		'concat'
	]);

};
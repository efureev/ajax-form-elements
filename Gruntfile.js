module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'), // the package file to use

		uglify: {
			main: {
				files: {
					'dist/afe.min.js': [
						'src/js/afe.js',
						'src/js/afe.core.js',
						'src/js/afe.form.js',
						'src/js/afeCheckbox.js',
						'src/js/afeRadiobox.js',
						'src/js/afe.finish.js'
					]
				}
			},
			uncompress: {
				files: {
					'dist/afe.js': [
						'src/js/afe.js',
						'src/js/afe.core.js',
						'src/js/afe.form.js',
						'src/js/afeCheckbox.js',
						'src/js/afeRadiobox.js',
						'src/js/afe.finish.js'
					]
				},
				options: {
					compress: false,
					beautify: true
				}
			}
		},

		less: {
			main: {
				options: {
					compress: true,
					cleancss: true

				},
				src: [
					"src/less/css.less"
				],
				dest: "dist/afe.min.css"
			}
		},

		copy: {
			main: {
				files: [
					{expand: true, cwd: 'dist', src: '*.js', dest: 'example/js/'},
					{expand: true, cwd: 'dist', src: '*.css', dest: 'example/css/'},
					{expand: true, cwd: 'bower_components/jquery/dist', src: 'jquery.min.js', dest: 'example/js/'},
					{expand: true, cwd: 'bower_components/jquery/dist', src: 'jquery.min.map', dest: 'example/js/'}
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['uglify:main', 'uglify:uncompress', 'less', 'copy']);

};

// https://www.npmjs.com/package/grunt-env

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		aws: grunt.file.readJSON('secret.json'),
		shopify: {
			options: {
				api_key: '<%= aws.api_key %>',
				password: '<%= aws.password %>',
				url: '<%= aws.url %>',
				theme: '<%= aws.theme %>'
			}
		},
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: 'assets/scss/',
					src: ['style.scss'],
					dest: 'assets/css/',
					ext: '.css'
				}]
			}
		},
		cssmin: {
			combine: {
				files: {
					'assets/style.min.css': [
						"assets/css/normalize.min.css",
						"assets/css/slick.css",
						"assets/css/style.css",
					]
				}
			}
		},
		uglify: {
			js: {
				files: {
					'assets/main.min.js': [
						'assets/js/lib/jquery.min.js',
						'assets/js/lib/jquery.waypoints.js',
						'assets/js/lib/slick.min.js',
						'assets/js/lib/skrollr.min.js',
						'assets/js/lib/jquery.smoothState.js',
						'assets/js/lib/js.cookie.js',
						'assets/js/*.js'
					]
				}
			}
		},
		env: {
			dev: {
				ENV_MODE: "REG",
				src: "dev.json"
			}
		},
		notify: {
			options: {
				enabled: true,
				max_jshint_notifications: 5, // maximum number of notifications from jshint output
				title: "Project Name", // defaults to the name in package.json, or will use project directory's name
				success: false, // whether successful grunt executions should be notified automatically
				duration: 3 // the duration of notification in seconds, for `notify-send only
			},
			watch: {
				options: {
					title: 'Task Complete', // optional
					message: 'Shopify' //required
				}
			},
			css: {
				options: {
					title: 'Task Complete', // optional
					message: 'css' //required
				}
			},
			js: {
				options: {
					title: 'Task Complete', // optional
					message: 'js' //required
				}
			}
		},
		watch: {
			css: {
				files: ['**/*.scss'],
				tasks: ['sass', 'cssmin', 'notify:css'] //
			},
			js: {
				files: 'assets/js/**/*.js',
				tasks: ['uglify', 'notify:js']
			},
			shopify: {
				files: ['layout/*.liquid', 'templates/*.liquid', 'snippets/*.liquid', 'assets/*.css', 'assets/*.js', 'config/*.json', 'config/*.html'],
				tasks: ['shopify', 'notify:watch']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-shopify');
	grunt.loadNpmTasks('grunt-aws');
	grunt.loadNpmTasks('grunt-notify');
	grunt.registerTask('default', ['watch']);
};
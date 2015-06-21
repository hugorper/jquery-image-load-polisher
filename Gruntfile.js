module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("package.json"),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.license %> License\n" +
				" */\n"
		},

		// Concat definitions
		concat: {
			options: {
				banner: "<%= meta.banner %>"
			},
			dist: {
				src: ["src/jquery.page.load.polisher.js", "bower_components/sonic.js/src/sonic.js"],
				dest: "dist/jquery.page.load.polisher.js"
			}
		},

		// Lint definitions
		jshint: {
			files: ["src/jquery.page.load.polisher.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		// Minify definitions
		uglify: {
			my_target: {
				src: ["dist/jquery.page.load.polisher.js", "bower_components/sonic.js/src/sonic.js"],
				dest: "dist/jquery.page.load.polisher.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		// watch for changes to source
		// Better than calling grunt a million times
		// (call 'grunt watch')
		watch: {
		    files: ['src/*'],
		    tasks: ['default']
		},

		// change log generation tool
		git_changelog: {
			full_changelog: {
				options: {
					app_name : '<%= pkg.title || pkg.name %>',
					//logo : '',
					intro : 'jQuery Page Load Polisher polish page load, the plugin displays a loader until your page load and applies an effect when page appear',
					file: 'CHANGELOG.md',
					repo_url: '<%= pkg.repository.url %>',
					grep_commits: '^fix|^feat|^docs|^refactor|^chore|BREAKING',
					debug: true,
					tag : false // all tags
				}
			}
		}

	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks('git-changelog');

	grunt.registerTask("all", ["jshint", "build", "git_changelog"]);
	grunt.registerTask("build", ["concat", "uglify"]);
	grunt.registerTask("default", ["jshint", "build"]);
	grunt.registerTask("travis", ["default"]);

};

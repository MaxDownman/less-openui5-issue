/*
 * Copyright (c) 2014-2015 SAP SE
 */

(function() {
	'use strict';

	// to prevent any ESLint errors for statements like 'require' etc
	/* eslint-disable no-undef */

	var path = require('path');

	module.exports = function(grunt) {
		// Force unix linefeeds (see https://github.com/gruntjs/grunt/issues/1123)
		grunt.util.linefeed = '\n';

		// Load all custom tasks from grunt/tasks dir
		grunt.loadTasks(path.join(process.cwd(), 'grunt/tasks'));

		var gruntData = {
			allLibraries: [{
				name: 'lib',
				path: 'lib',
			}]
		};

		gruntData.libraries = gruntData.allLibraries;


		// Load all grunt config files (in grunt subfolder) and all tasks installed via npm
		require('load-grunt-config')(grunt, {
			configPath: path.join(process.cwd(), 'grunt/config'),
			// Load grunt plugins just-in-time (faster than using load-grunt-tasks)
			jitGrunt: {
				staticMappings: {
					replace: 'grunt-text-replace',
					configureProxies: 'grunt-connect-proxy',
					configureRewriteRules: 'grunt-connect-rewrite',
					openui5_theme: 'grunt-openui5'
				}
			},

			data: gruntData
		});

		grunt.registerTask("default", [
			"clean",
			//"lint",
			"build"
		]);
	};
}());
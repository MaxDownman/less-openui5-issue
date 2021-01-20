(function() {
	'use strict';
	
	module.exports = function(grunt, config) {
		var copy = {
			options: {
				encoding: 'utf8'
			}
		};
		
		// src-to-target copy of applications and libraries (for build process)
		
		config.libraries.forEach(function(oLibrary) {
			grunt.log.writeln("lib:" + oLibrary.name);
			copy['src-target-' + oLibrary.name] = {
				files: [{
					expand: true,
					dot: true,
					cwd: oLibrary.path + '/src',
					src: [
						'**'
					],
					dest: 'target/' + oLibrary.name + '/resources/',
					rename: function(dest, src) {
						return dest + src.replace(/\.js$/i, "-dbg.js");
					}
				}]
			};
		});
		
		// copy git-hooks (for bootstrap)
		copy['githooks'] = {
			files: [{
				expand: true,
				cwd: 'tools/githooks',
				src: '*',
				dest: '.git/hooks'
			}]
		};
		
		return copy;
	};
}());

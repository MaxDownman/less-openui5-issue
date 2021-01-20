(function() {
	'use strict';
	
	module.exports = function(grunt, config) {
		var tasks = {
			'build': function() {
				var aTasks = [];
				
				// clean the whole target directory
				aTasks.push('clean:all');	
				
				config.libraries.forEach(function(oLibrary) {
					aTasks.push('clean:target-' + oLibrary.name);
					aTasks.push('copy:src-target-' + oLibrary.name);
					
					aTasks.push('sapui5lib_buildpreload:target-' + oLibrary.name);
					
					aTasks.push('openui5_theme:target-' + oLibrary.name);
					aTasks.push('sapui5lib_parameterizecss:target-' + oLibrary.name);
				});
				
				grunt.task.run(aTasks);
			}
		};
	
		return tasks;
	};
}());

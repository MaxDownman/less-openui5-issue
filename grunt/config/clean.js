(function() {
	'use strict';
	
	module.exports = function(grunt, config) {
		var clean = {};
		
		config.libraries.forEach(function(oLibrary) {
			clean['target-' + oLibrary.name] = {
				dot: true,
				src: ['target/' + oLibrary.name]
			}
		});
		
		clean['all'] = {
			dot: true,
			src: ['target']
		};
		
		return clean;
	};
}());

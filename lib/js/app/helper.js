/**
 * helper.js
 * File description goes here.
**/
;(function(global){

	var helper, config;

	helper        = global.helper || {};
	helper.config = helper.config || {};

	/**
	 * helper.init
	 * Init the helper module.
	**/
	helper.init = function(opts){
		var i;

		for(i in opts){
			helper.config[i] = opts[i];
		}

		return helper.config;
	}

	/**
	 * helper.log
	 * Safe console log.
	**/
	helper.log = function(message){
		if(console && console.log){
			console.log(message)
		}
	}

	// Export helper object for use.
	window.helper = helper;

})(window);

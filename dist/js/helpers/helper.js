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
	helper.log = function(message, alertlog){
		alertlog = (typeof alertlog === 'undefined') ? false : true;
		if(typeof console === 'undefined' || typeof console.log === 'undefined'){
			if(alertlog){
				alert(message);
			}
		}
		else {
			console.log(message);
		}
	}

	/**
	 * helper.mobile_mode
	 * Checks if the window size is below a certain breakpoint.
	**/
	helper.mobile_mode = function(breakpoint){
		var ww = window.innerWidth;
		return (ww < breakpoint) ? true : false;
	}

	// Export helper object for use.
	window.helper = helper;

})(window);

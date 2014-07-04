/**
 * helper.js
 * Helpers.
**/

;(function(window, undefined){
	'use strict';

	var helper = helper || {};

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

	window.helper = helper;

})(window);
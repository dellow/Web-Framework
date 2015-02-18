/**
 *
 * Helpers
 *
 * Copyright 2014, Author Name
 * Some information on the license.
 *
 * Various helper functions in vanilla JavaScript.
 *
**/

;(function(Helpers, window, undefined){
	'use strict';

	/**
	 * Helpers.log
	 * Safe console log.
	**/
	Helpers.log = function(message, alertlog){
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
	 * Helpers.mobile_mode
	 * Checks if the window size is below a certain breakpoint.
	**/
	Helpers.mobile_mode = function(breakpoint){
		return (window.innerWidth <= breakpoint) ? true : false;
	}

	// Export
	module.exports = Helpers;

}(window.Helpers = window.Helpers || {}, window));
/**
 *
 * Helpers
 *
 * Copyright 2015, Author Name
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
		if(window.debugging){
			alertlog = (typeof alertlog === 'undefined') ? false : true;
			if(typeof console === 'undefined' || typeof console.log === 'undefined'){
				if(alertlog){
					alert(message);
				}
			}
			else {
				console.log('DEBUG: ------------------------------');
				console.log('DEBUG: ' + message);
				console.log('DEBUG: ------------------------------');
			}
		}
	}

	/**
	 * Helpers.mobile_mode
	 * Checks if the window size is below a certain breakpoint.
	**/
	Helpers.mobile_mode = function(breakpoint){
		return (window.innerWidth <= breakpoint) ? true : false;
	}

	/**
	 * Helpers.debounce
	 * Returns a function, that, as long as it continues to be invoked, will not
	 * be triggered. The function will be called after it stops being called for
	 * N milliseconds. If `immediate` is passed, trigger the function on the
	 * leading edge, instead of the trailing.
	 *
	 * $(window).on('resize', Module.test);
	 *
	 * Module.test = Helpers.debounce(function(){
	 *     console.log('This has been debounced');
	 * }, 250);
	**/
	Helpers.debounce = function(func, wait, immediate){
		var timeout;

		return function(){
			var context = this,
				args = arguments;

			var later = function(){
				timeout = null;
				if(!immediate){
					func.apply(context, args);
				}
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if(callNow){
				func.apply(context, args);
			}
		};
	}

	// Export
	module.exports = Helpers;

}(window.Helpers = window.Helpers || {}, window));
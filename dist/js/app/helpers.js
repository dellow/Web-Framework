/*
 *
 * Helpers
 *
 * Copyright 2014, Author Name
 * Some information on the license.
 *
 * Various helper functions in vanilla JavaScript.
 *
 */

 ;(function(Helpers, $, window, undefined){
	'use strict';

	/**
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
	 * Checks if the window size is below a certain breakpoint.
	**/
	Helpers.mobile_mode = function(breakpoint){
		return (window.innerWidth < breakpoint) ? true : false;
	}

	/**
	 * Apply equal heights to given elements.
	**/
	Helpers.equal_heights = function(el, breakpoint1, breakpoint2){
        // Check the current breakpoint.
        if($(window).width() > breakpoint1 && $(window).width() < breakpoint2){
            // Map all qualifying element heights to an array.
            var heights = $('[data-eh="true"]', el).map(function(){
                return $(this).outerHeight();
            }).get();
            // Get the largest value from the array.
            var large = Math.max.apply(Math, heights);
            // Apply the CSS height to all qualifying elements.
            $('[data-eh="true"]', el).each(function(){
                $(this).outerHeight(large);
            });
        }
        else{
            // Reset the height attribute to `auto` (or nothing).
            $('[data-eh="true"]', el).each(function(){
                $(this).css({'height': 'auto'});
            });
        }
    }

	// Export
	module.exports = Helpers;

}(window.Helpers = window.Helpers || {}, jQuery, window));
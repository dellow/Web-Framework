/**
 *
 * Helpers
 *
 * Copyright 2015, Author Name
 * Some information on the license.
 *
**/

;(function(Helper, $, window, undefined){
	'use strict';

	/**
	 * Helper.log
	 * Customised and cross browser console.log.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Helper.log = function(message, type, alertlog){
		if(window.debugging){
			alertlog = (typeof alertlog === 'undefined') ? false : true;
			if(typeof console === 'undefined' || typeof console.log === 'undefined'){
				if(alertlog){
					alert(message);
				}
			}
			else {
				var color = (type == 'positive') ? '#097809' : (type == 'negative') ? '#c5211d' : (typeof type !== 'undefined') ? type : '#240ad0';
				console.log('%c DEBUG: -----------------------------------------------', 'color: ' + color);
				console.log('%c DEBUG: ' + message, 'color: ' + color);
				console.log('%c DEBUG: -----------------------------------------------', 'color: ' + color);
				console.log('');
			}
		}
	}

	/**
	 * Helper.breakpoint
	 * Checks the window against a certain breakpoint.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Helper.breakpoint = function(breakpoint){
		return (window.innerWidth <= breakpoint) ? true : false;
	}

	/**
	 * Helper.debounce
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
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Helper.debounce = function(func, wait, immediate){
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

	/**
	 * Helper.preloader
	 * Generates a preloader.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Helper.preloader = function(el, destroy){
		destroy = (typeof destroy === 'undefined') ? false : true;
		el      = (typeof el === 'undefined') ? $('body') : el;
		var loader = $('<div class="spinner-wrapper"><svg class="spinner" width="35px" height="35px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg></div>');

		if(!destroy){
			if(!$('.spinner-wrapper', el).length){
				el.css({'position': 'relative'}).prepend(loader);
			}
		}
		else{
			$('.spinner-wrapper', el).fadeOut(500, function(){
				$(this).remove();
			})
		}
	}

    /**
     * Helper.ajax
     * Returns a simple Ajax request. Should use the result with a promise.
     *
     * @since 1.0.0
     * @version 1.0.0
     */
    Helper.ajax = function(url, request, type, preloader_el){
    	// Set type.
		type = (typeof type === 'undefined') ? 'POST' : type;
		// Request.
        return $.ajax({
            url     : url,
            type    : type,
            dataType: 'JSON',
            data    : {
                'ajaxrequest': true,
                'request': request
            },
            beforeSend: function(jqXHR, settings){
            	// Log full URL.
            	Helpers.log(settings.url + '?' + settings.data);
                // Add preloader.
                Helper.preloader(preloader_el);
            },
            success: function(jqXHR){
                // Destroy preloader.
                Helper.preloader(preloader_el, true);
            }
        });
    }

	// Export
	module.exports = Helpers;

}(window.Helpers = window.Helpers || {}, jQuery, window));

/**
 *
 * Module
 *
 * Copyright 2015, Author Name
 * Some information on the license.
 *
**/

;(function(Module, window, undefined){
    'use strict';

    /**
     * Module
     * Constructor for this module.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module = function(){
    }

	/**
	 * init
	 * Init method for this module.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.init = function(el){
		// Check Wiselinks is enabled.
		if(window.wiselinks_enabled){
			// Init WiseLinks
			window.wiselinks = new Wiselinks(el, {
				html4_normalize_path: false
			});
			// Do page events
			return this.wiselinks_binds();
		}
	}

	/**
	 * wiselinks_binds
	 * Wiselinks page events.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.wiselinks_binds = function(){
		var _this = this;

		// Every page load.
		$(document).off('page:always').on('page:always', function(event, xhr, settings){
			// Log it.
	        Helpers.log("Wiselinks page loading completed", "positive");
	    });
		// Page loading.
		$(document).off('page:loading').on('page:loading', function(event, $target, render, url){
			// Log it.
	        Helpers.log("Loading: " + url + " to " + $target.selector + " within " + render, "positive");
	    });
		// Page redirected.
		$(document).off('page:redirected').on('page:redirected', function(event, $target, render, url){
			// Log it.
	        Helpers.log("Redirected to: " + url, "positive");
	    });
		// Page done loading.
		$(document).off('page:done').on('page:done', function(event, $target, status, url, data){
			// Log it.
	        Helpers.log("Wiselinks status: " + status, "positive");
	        // Check for Google Analytics.
			if(window.ga_active){
				// Register Analytics Page View.
				ga('send', 'pageview', {
					'page'      : url,
					'dimension1': WURFL.complete_device_name,
					'dimension2': WURFL.form_factor,
					'dimension3': WURFL.is_mobile
				});
				// Log it.
		        Helpers.log("Analytics page view sent", "positive");
			}
	    });
		// Page can't be found.
		$(document).off('page:fail').on('page:fail', function(event, $target, status, url, error, code){
			// Log it.
	        Helpers.log("Wiselinks status: " + status, "negative");
	        // Redirect to 404.
	        window.location.replace(window.config.base_url + '404');
	    });
	}

    // Export
    module.exports = new Module();

}(window.M = window.M || function(){}, window));

/**
 *
 * PageController
 *
 * Copyright 2015, Author Name
 * Some information on the license.
 *
 * Loads pages via Ajax thanks to WiseLinks.
 *
 * Just add '<a href="link.php" data-push="true">Page 2</a>'
 * to any link that needs to be loaded with Ajax.
 *
**/

;(function(Controller, $, window, undefined){
	'use strict';

    /**
     * Controller
     * Constructor for this controller.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
	Controller = function(){
		// Require :: Modules
		this.Menu = require('./module.mobile-menu-side');
		this.Binds = require('./module.binds');
    }

	/**
	 * init
	 * Init method for this module.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Controller.prototype.init = function(el){
		var _this = this;

		// Check Wiselinks is enabled.
		if(window.wiselinks_enabled){
			// Init WiseLinks
			window.wiselinks = new Wiselinks(el, {
				html4_normalize_path: false
			});
			// Do page events
			_this.wiselinks_binds();
		}

		return _this.page_load();
	}

	/**
	 * page_load
	 * Run on page load.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Controller.prototype.page_load = function(){
		// Init menus.
		this.Menu.init();
		// Init binds.
		this.Binds.init();
	}

	/**
	 * wiselinks_binds
	 * Wiselinks page events.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Controller.prototype.wiselinks_binds = function(){
		var _this = this;

		// Every page load.
		$(document).off('page:always').on('page:always', function(event, xhr, settings){
			// Log it.
	        Helpers.log("Wiselinks page loading completed", "positive");
	    	// Run page load events.
			_this.page_load();
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
	module.exports = new Controller();

}(window.PageController = window.PageController || function(){}, jQuery, window));

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

	// Require
	require('../controllers/wiselinks');
	require('./module.menu');
	require('./module.binds');

	/**
	 * Controller.init
	 * Init method for this module
	**/
	Controller.init = function(el){
		$(function(){
            // Run page load events.
			Controller.page_load();
			// Check Wiselinks is enabled.
			if(window.wiselinks_enabled){
				// Init WiseLinks
				window.wiselinks = new Wiselinks(el, {
					html4_normalize_path: false
				});
				// Do page events
				Controller.wiselinks_events();
			}
	    });
	}

	/**
	 * Controller.page_load
	 * Run on page load.
	**/
	Controller.page_load = function(){
		Menu.init(window.mobile_breakpoint);
		Binds.init();
	}

	/**
	 * Controller.wiselinks_events
	 * Wiselinks page events.
	**/
	Controller.wiselinks_events = function(){
		// Every page load.
		$(document).off('page:always').on('page:always', function(event, xhr, settings){
			// Log it.
	        Helpers.log("Wiselinks page loading completed", "positive");
	    	// Run page load events.
			Controller.page_load();
	    });
		// Page loading.
		$(document).off('page:loading').on('page:loading', function(event, $target, render, url){
			// Log it.
	        Helpers.log("Loading: " + url + " to " + $target.selector + " within '" + render, "positive");
	    });
		// Page redirected.
		$(document).off('page:redirected').on('page:redirected', function(event, $target, render, url){
			// Log it.
	        Helpers.log("Redirected to: " + url, "positive");
	    });
		// Page done loading.
		$(document).off('page:done').on('page:done', function(event, $target, status, url, data){
			// Log it.
	        Helpers.log("Wiselinks status: '" + status, "positive");
	        // Check for Google Analytics.
			if(window.ga_active){
				// Register Analytics Page View.
				ga('send', 'pageview', {
					'page'      : url,
					'dimension1': WURFL.complete_device_name,
					'dimension2': WURFL.form_factor,
					'dimension3': WURFL.is_mobile
				});
			}
	    });
		// Page can't be found.
		$(document).off('page:fail').on('page:fail', function(event, $target, status, url, error, code){
			// Log it.
	        Helpers.log("Wiselinks status: '" + status, "negative");
	        // Redirect to 404.
	        window.location.replace(window.config.base_url + '404');
	    });
	}

	// Export
	Controller.exports = PageController;

}(window.PageController = window.PageController || {}, jQuery, window));

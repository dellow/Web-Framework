/**
 *
 * PageController
 *
 * Copyright 2014, Author Name
 * Some information on the license.
 *
 * Loads pages via Ajax thanks to WiseLinks.
 *
 * Just add '<a href="link.php" data-push="true">Page 2</a>'
 * to any link that needs to be loaded with Ajax.
 *
**/

;(function(Module, $, window, undefined){
	'use strict';

	// Require
	require('../controllers/wiselinks');
	require('./module.menu');
	require('./module.binds');

	/**
	 * Module.init
	 * Init method for this module
	**/
	Module.init = function(el){
		$(function(){
            // Run page load events.
			Module.page_load();
			// Init WiseLinks
			window.wiselinks = new Wiselinks(el);
			// WiseLinks events
			$(document).off('page:loading').on('page:loading', function(event, $target, render, url){
	            Helpers.log("Loading: " + url + " to " + $target.selector + " within '" + render);
		    });

			$(document).off('page:redirected').on('page:redirected', function(event, $target, render, url){
	            Helpers.log("Redirected to: " + url);
		    });

			$(document).off('page:always').on('page:always', function(event, xhr, settings){
	            Helpers.log("Wiselinks page loading completed");
            	// Run page load events.
				Module.page_load();
		    });

			$(document).off('page:done').on('page:done', function(event, $target, status, url, data){
	            Helpers.log("Wiselinks status: '" + status);

	            // Check for Google Analytics.
				if(typeof window.ga !== "undefined"){
					// Register Analytics Page View.
					ga('send', 'pageview', {
						'page'      : url,
						'dimension1': WURFL.complete_device_name,
						'dimension2': WURFL.form_factor,
						'dimension3': WURFL.is_mobile
					});
				}
		    });

			$(document).off('page:fail').on('page:fail', function(event, $target, status, url, error, code){
	            Helpers.log("Wiselinks status: '" + status);
	            window.location.replace(window.base_url + '404');
		    });
	    });
	}

	/**
	 * Module.page_load
	 * Run on page load.
	**/
	Module.page_load = function(){
		Menu.init(window.mobile_breakpoint);
		Binds.init();
	}

	// Export
	module.exports = PageController;

}(window.PageController = window.PageController || {}, jQuery, window));
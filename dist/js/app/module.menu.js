/**
 *
 * Module
 *
 * Copyright 2014, Author Name
 * Some information on the license.
 *
**/

;(function(Module, $, window, undefined){
	'use strict';

	/**
	 * Module.init
	 * Init method for this module.
	**/
	Module.init = function(breakpoint){
		$(window).on('resize load', function(){
			Module.binds(breakpoint);
		});
	}

	/**
	 * Module.binds
	 * Binds related to this module.
	**/
	Module.binds = function(breakpoint){
		var primary    = $('.nav-primary'),
			navigation = $('.navigation');

		// Apply classes
		if(Helpers.mobile_mode(breakpoint)){
			primary.addClass('mobile-animate');
		}
		else{
			primary.removeClass('mobile-animate');
		}

		// Mobile menu button
		$('.mobile-menu').on('click', function(){
			Module.menu_reveal($(this), primary);
		});
	}

	/**
	 * Module.menu_reveal
	 * Adds class to menu.
	**/
	Module.menu_reveal = function(el, primary){
		if(primary.outerHeight() < 5){
			// Toggle class to button
			el.addClass('active-menu');
			// Slide down with CSS animation
			primary.addClass('slide-down');
		}
		else{
			// Toggle class to button
			el.removeClass('active-menu');
			// Slide down with CSS animation
			primary.removeClass('slide-down');
			// If hidden remove the `display: block`
			if(primary.is(':hidden')){
				primary.removeAttr('style');
			}
		}
	}

	// Export
	module.exports = Menu;

}(window.Menu = window.Menu || {}, jQuery, window));
/**
 *
 * Module
 *
 * Copyright 2015, Author Name
 * Some information on the license.
 *
**/

;(function(Module, $, window, undefined){
	'use strict';

    /**
     * Module
     * Constructor for this module.
    **/
    Module = function(){
		this.primary    = $('.nav-primary');
		this.navigation = $('.navigation');
		this.height     = this.primary.outerHeight();
    }

	/**
	 * init
	 * Init method for this module.
	**/
	Module.prototype.init = function(breakpoint){
		var _this = this;

		// Start binds on window load / resize.
		$(window).on('load resize',function(){
			_this.binds(breakpoint);
		});
	}

	/**
	 * binds
	 * jQuery event binds for this module.
	**/
	Module.prototype.binds = Helpers.debounce(function(breakpoint){
		var _this = this;

		// Apply classes
		if(Helpers.breakpoint(breakpoint)){
			_this.primary.addClass('mobile-animate');
		}
		else{
			_this.primary.removeClass('mobile-animate');
		}

		// Sub menu buttons.
		if(Helpers.breakpoint(breakpoint)){
			// Remove max-height
			// Mobile menu button.
			$('.mobile-menu').on('click', function(){
				_this.menu_reveal($(this), primary);
			});
			// Sub menu item.
			$('a', primary).on('click', function(e){
				// Cache this link.
				var anchor = $(this);
				// Check menu exists and isn't already active.
				if(anchor.next('.sub-menu').length && !anchor.next('.sub-menu').hasClass('active-sub-menu')){
					e.preventDefault();

					$('.active-sub-menu', primary).slideUp(400).removeClass('active-sub-menu');
					anchor.next('.sub-menu').addClass('active-sub-menu').slideDown(400);
				}
			});
		}
	}, 250);

	/**
	 * menu_reveal
	 * Adds class to menu.
	**/
	Module.prototype.menu_reveal = function(el){
		var _this = this;

		// Check height of primary menu.
		if(_this.primary.height() < 5){
			// Toggle class to button
			el.addClass('active-menu');
			// Slide down with CSS animation
			_this.primary.addClass('slide-down').css({'max-height': height + 'px'});
		}
		else{
			// Toggle class to button
			el.removeClass('active-menu');
			// Slide down with CSS animation
			_this.primary.removeClass('slide-down').css({'max-height': ''});
			// If hidden remove the `display: block`
			if(_this.primary.is(':hidden')){
				_this.primary.css({'display': ''});
			}
		}
	}

	// Export
	module.exports = Module;

}(window.Menu = window.Menu || function(){}, jQuery, window));

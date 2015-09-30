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
		var _this = this;

		// Cache the primary menu.
    	this.primary = $('.nav-primary');

		// Start binds on window load / resize.
		$(window).on('load resize', $.proxy(_this.binds, _this));
    }

	/**
	 * binds
	 * jQuery event binds for this module.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.binds = Helpers.debounce(function(){
		var _this = this;

        // Check screen is below mobile breakpoint.
		if(Helpers.breakpoint(window.mobile_breakpoint)){
			// Add 'page__mobile-animate' class to primary menu.
			_this.primary.addClass('page__mobile-animate');

			// Mobile menu button.
			$('.js-mobile-button').on('click', function(){
				_this.reveal_menu($(this), _this.primary);
			});

			// Sub menu item.
			$('a', _this.primary).on('click', function(e){
				// Cache DOM element.
				var anchor = $(this);
				// Check menu exists and isn't already active.
				if(anchor.next('.sub-menu').length && !anchor.next('.sub-menu').hasClass('active-sub-menu')){
					e.preventDefault();

					// Reveal sub menu.
					_this.show_sub_menu(anchor);
				}
			});
		}
		else{
			// Remove 'page__mobile-animate' class to primary menu.
			_this.primary.removeClass('page__mobile-animate');
		}
	}, 250);

	/**
	 * reveal_menu
	 * Adds class to menu.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.reveal_menu = function(el){
		var _this = this;

		return (_this.primary.height() < 5) ? _this.show_primary_menu(el) : _this.hide_primary_menu(el);
	}

	/**
	 * show_primary_menu
	 * Show menu.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.show_primary_menu = function(el){
		var _this = this;

		// Get menu height.
		var menu_height = Helpers.mhi(_this.primary);
		// Toggle class to button
		el.addClass('active-menu');
		// Slide down with CSS animation
		_this.primary.addClass('slide-down').css({'max-height': menu_height + 'px'});
	}

	/**
	 * hide_primary_menu
	 * Hide menu.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.hide_primary_menu = function(el){
		var _this = this;

		// Toggle class to button
		el.removeClass('active-menu');
		// Hide any open sub-menus.
		_this.hide_sub_menu();
		// Hide primary menu.
		_this.primary.removeClass('slide-down').css({'max-height': ''});
		// If hidden remove the `display: block`
		if(_this.primary.is(':hidden')){
			_this.primary.css({'display': ''});
		}
	}

	/**
	 * show_sub_menu
	 * Show menu.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.show_sub_menu = function(el){
		var _this = this;

		// Extend primary menu max-height indefinitely.
		_this.primary.css({'max-height': '9999px'});
		// Hide any open sub-menus.
		_this.hide_sub_menu();
		// Add active class to parent li.
		el.parent().addClass('active-menu-item');
		// Show requested sub menu.
		el.next('.sub-menu').addClass('active-sub-menu').slideDown(400);
	}

	/**
	 * hide_sub_menu
	 * Hide menu.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.hide_sub_menu = function(){
		var _this = this;

		// Remove active menu item.
		$('.active-menu-item', _this.primary).removeClass('active-menu-item');
		// Hide any open sub-menus.
		$('.active-sub-menu', _this.primary).slideUp(400).removeClass('active-sub-menu');
	}

	// Export
	module.exports = new Module();

}(window.M = window.M || function(){}, window));

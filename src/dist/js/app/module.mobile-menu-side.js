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
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module = function(){
		// Set active flag.
		this.menu_active = false;
    }

	/**
	 * init
	 * Init method for this module.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.init = function(){
		var _this = this;

		// Start binds on window load / resize.
		$(window).on('load resize',function(){
			// Vars.
			_this.$button  = $('.js-mobile-button');
			_this.$menu    = $('.js-mobile-menu');
			_this.$content = $('.js-mobile-content');
        	// Check screen is below mobile breakpoint.
			if(Helpers.breakpoint(window.mobile_breakpoint)){
            	return _this.binds();
            }
            else{
				// Reset flag.
				_this.set_menu_flag(false);
            	// Reset any menus.
            	return _this.hide_primary_menu();
            }
		});
	}

	/**
	 * binds
	 * jQuery event binds for this module.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.binds = function(){
		var _this = this;

		// Click on the mobile menu.
		this.$button.on('click', function(){
			var _self = $(this);

			// Run hide operations.
			if(this.menu_active){
				// Hide mobile menu.
				_this.hide_primary_menu(_self);
				// Set flag.
				_this.set_menu_flag(false);
			}
			// Run show operations.
			else{
				// Show mobile menu.
				_this.show_primary_menu(_self);
				// Set flag.
				_this.set_menu_flag(true);
			}
		});

		// Escape key pressed.
		$(document).on('keyup', function(e){
			// Check key type & menu is active.
			if(e.keyCode == 27 && _this.menu_active){
				// Hide mobile menu.
				_this.hide_primary_menu();
			}
		});

		// Close menu.
		$('.js-close-mobile-menu').on('click', function(){
			// Check menu is active.
			if(_this.menu_active){
				// Hide mobile menu.
				_this.hide_primary_menu();
				// Set flag.
				_this.set_menu_flag(false);
			}
		});

		// Close menu.
		this.$content.on('click', function(){
			// Check menu is active.
			if(_this.menu_active){
				// Hide mobile menu.
				_this.hide_primary_menu();
				// Set flag.
				_this.set_menu_flag(false);
			}
		});
	}

	/**
	 * show_primary_menu
	 * Show menu.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.show_primary_menu = function(){
		// Vars.
		var doc_width = $(document).width(),
			doc_85    = (doc_width / 100) * 85;

		// Add 85% width to menu.
		this.$menu.css({'width': doc_85});
		// Move page content 85% left.
		this.$content.addClass('active-menu').css({'left': doc_85});
		// Add active class to menu button.
		this.$button.addClass('active-menu');
	}

	/**
	 * hide_primary_menu
	 * Hide menu.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.hide_primary_menu = function(){
		var _this = this;

		// Remove 90% width to menu.
		this.$menu.css({'width': ''});
		// Move page content back to 0 left.
		this.$content.css({'left': ''});
		// Wait 10ms.
		setTimeout(function(){
			// Remove the active class.
			_this.$content.removeClass('active-menu');
			// Remove active class from menu button.
			_this.$button.removeClass('active-menu');
		}, 200);
	}

	/**
	 * set_menu_flag
	 * Set flag after 10ms
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.set_menu_flag = function(state){
		var _this = this;

		// Wait 10ms.
		setTimeout(function(){
			// Set flag.
			_this.menu_active = state;
		}, 100);
	}

	// Export
	module.exports = new Module();

}(window.Menu = window.Menu || function(){}, jQuery, window));

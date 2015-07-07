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
		this.button  = $('.js-mobile-button');
		this.menu    = $('.js-mobile-menu');
		this.content = $('.js-mobile-content');

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

        // Document ready.
        $(function(){
        	// Check screen is below mobile breakpoint.
			if(Helpers.breakpoint(window.mobile_breakpoint)){
            	return _this.binds();
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
		$('.js-mobile-button').on('click', function(){
			var _self = $(this);

			// Run hide operations.
			if(this.menu_active){
				// Hide mobile menu.
				_this.hide_primary_menu(_self);
				// Wait 10ms.
				setTimeout(function(){
					// Set flag.
					_this.menu_active = false;
				}, 100);
			}
			// Run show operations.
			else{
				// Show mobile menu.
				_this.show_primary_menu(_self);
				// Wait 10ms.
				setTimeout(function(){
					// Set flag.
					_this.menu_active = true;
				}, 100);
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
				// Wait 10ms.
				setTimeout(function(){
					// Set flag.
					_this.menu_active = false;
				}, 100);
			}
		});

		// Close menu.
		$('.js-mobile-content').on('click', function(){
			// Check menu is active.
			if(_this.menu_active){
				// Hide mobile menu.
				_this.hide_primary_menu();
				// Wait 10ms.
				setTimeout(function(){
					// Set flag.
					_this.menu_active = false;
				}, 100);
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
			doc_90    = (doc_width / 100) * 90;

		// Add 90% width to menu.
		this.menu.css({'width': doc_90});
		// Move page content 90% left.
		this.content.addClass('active-menu').css({'left': doc_90});
		// Add active class to menu button.
		this.button.addClass('active-menu');
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
		_this.menu.css({'width': ''});
		// Move page content back to 0 left.
		_this.content.css({'left': ''});
		// Wait 10ms.
		setTimeout(function(){
			// Remove the active class.
			_this.content.removeClass('active-menu');
			// Remove active class from menu button.
			_this.button.removeClass('active-menu');
		}, 200);
	}

	// Export
	module.exports = new Module();

}(window.Menu = window.Menu || function(){}, jQuery, window));

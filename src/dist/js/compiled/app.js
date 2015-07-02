(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
		this.Menu = require('./module.menu');
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
	module.exports = new Controller();

}(window.PageController = window.PageController || function(){}, jQuery, window));

},{"./module.binds":3,"./module.menu":4}],2:[function(require,module,exports){
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
		if(window.helper_log){
			alertlog = (typeof alertlog === 'undefined') ? true : false;
			if(typeof console === 'undefined' || typeof console.log === 'undefined'){
				if(alertlog){
					alert(message);
				}
			}
			else {
				if(message instanceof Array || message instanceof Object){
					console.log(message);
				}
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
	 * Helper.mhi
	 * Measures a hidden element.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Helper.mhi = function(el){
		// Clone element.
		var clone = el.clone();
		// Place above viewport and measure height.
		var height = clone.css({'position': 'absolute', 'top': '-100%', 'display': 'block', 'max-height': 'none', 'height': 'auto'}).prependTo(el.parent()).outerHeight();
		// Destroy the clone.
		clone.remove();

		return height;
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
			var _this = this,
				args  = arguments;

			var later = function(){
				timeout = null;
				if(!immediate){
					func.apply(_this, args);
				}
			};
			var call_now = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if(call_now){
				func.apply(_this, args);
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
    Helper.ajax = function(url, request, type, dataType, preloader_el){
		// Set datatype.
		dataType = (typeof dataType === 'undefined') ? 'JSON' : dataType;
    	// Set type.
		type = (typeof type === 'undefined') ? 'POST' : type;
    	// Set preloader.
		preloader_el = (typeof preloader_el === 'undefined') ? $('body') : preloader_el;
		// Request.
        return $.ajax({
            url     : url,
            type    : type,
            dataType: dataType,
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

},{}],3:[function(require,module,exports){
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
        // Require :: NPM
        // require('fancybox');
        // Require :: Plugins
        // require('../plugins/jquery.equal-heights');
        // require('../plugins/jquery.googlemap');
        // require('../plugins/jquery.modals');
        // require('../plugins/jquery.validation');
        // Require :: Vendor
        // require('../plugins/vendor/jquery.slider');
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
            // Call methods here.
        });
        // Window ready (images loaded).
        $(window).on('load', function(){
            // Call methods here.
        });
    }

    /**
     * equal_heights
     * Equal height elements.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module.prototype.equal_heights = function(){
        // DOM check.
        if($('.js-eh').length){
            // Init plugin.
            $('.js-eh').equalHeights();
        };
    }

    /**
     * google_map
     * Map events.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module.prototype.google_map = function(){
        // DOM check.
        if($('.js-google-map').length){
            // Init plugin.
            $('.js-google-map').googlemap({
                locations: [
                    'United Kingdom'
                ]
            });
        };
    }

    /**
     * lightboxes
     * Lightbox events.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module.prototype.lightboxes = function(){
        // DOM check.
        if($('.js-lightbox').length){
            // Init plugin.
            $('.js-lightbox').fancybox({
                autoWidth    : true,
                autoHeight   : true,
                autoScale    : true,
                transitionIn : 'fade'
            });
        };
    }

    /**
     * modals
     * Modal events.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module.prototype.modals = function(){
        // DOM check.
        if($('.js-modal').length){
            // Init plugin.
            $('.js-modal').modal();
            // Init plugin on load (or function call).
            $(window).modal({
                type   : 'modal-slide-left',
                content: 'Some content here.'
            });
            // // Destroy created modal.
            $(window).destroyModal();
        };
    }

    /**
     * sliders
     * Slider events.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module.prototype.sliders = function(){
        // DOM check.
        if($('.js-slider').length){
            // Init plugin.
            $('.js-slider').bxSlider({
                auto        : true,
                controls    : true,
                pager       : false,
                autoReload  : true,
                infiniteLoop: true,
                moveSlides  : 1,
                breaks      : [
                    {screen: 0, slides: 1, pager: false},
                    {screen: 460, slides: 2},
                    {screen: 768, slides: 3}
                ]
            });
        };
    }

    /**
     * validation
     * Form validation events.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module.prototype.validation = function(){
        // Check captcha.
        if($('#c_a_p_t_c_h_a').length){
            $('#c_a_p_t_c_h_a').prop('checked', true);
        }

        // DOM check.
        if($('.js-validate').length){
            // Init plugin.
            $('.js-validate').validation({
                serverValidation        : false,
                appendErrorToPlaceholder: true
            });
        };
    }

    // Export
    module.exports = new Module();

}(window.Binds = window.Binds || function(){}, jQuery, window));

},{}],4:[function(require,module,exports){
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
    	this.primary = null;
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
			_this.primary = $('.nav-primary');

			return _this.binds();
		});
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

		// Check window size.
		if(Helpers.breakpoint(window.mobile_breakpoint)){
			// Add 'mobile-animate' class to primary menu.
			_this.primary.addClass('mobile-animate');

			// Mobile menu button.
			$('.mobile-menu').on('click', function(){
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
			// Remove 'mobile-animate' class to primary menu.
			_this.primary.removeClass('mobile-animate');
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

	// Export
	module.exports = new Module();

}(window.Menu = window.Menu || function(){}, jQuery, window));

},{}],5:[function(require,module,exports){
/**
 *
 * Application or Website name
 *
 * Copyright 2015, Author Name
 * Some information on the license.
 *
**/

// Global settings.
window.mobile_breakpoint = 768;
window.wiselinks_enabled = true;
window.helper_log        = (typeof window.gulp_env == "undefined" || window.gulp_env == 'development') ? true : false;
window.ga_active         = (typeof window.ga !== "undefined") ? true : false;

/* ======================================================== */
/* Index
/* ======================================================== */
;(function($, window, undefined){
    'use strict';

	// Require helpers globally.
	require('./helpers');

	// Require the page controller.
	var Page = require('./controller.page');

	// Init new instance of page controller.
	Page.init($('.main'));

}(jQuery, window));

},{"./controller.page":1,"./helpers":2}]},{},[5]);

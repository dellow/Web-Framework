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
		require('./module.mobile-menu-side');
		require('./module.binds');
    }

	/**
	 * init
	 * Init method for this module.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Controller.prototype.init = function(el){
		// Check Wiselinks is enabled.
		if(window.wiselinks_enabled){
			// Init WiseLinks
			window.wiselinks = new Wiselinks(el, {
				html4_normalize_path: false
			});
			// Do page events
			return _this.wiselinks_binds();
		}
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

}(window.C = window.C || function(){}, jQuery, window));

},{"./module.binds":3,"./module.mobile-menu-side":4}],2:[function(require,module,exports){
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
			});
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
            complete: function(jqXHR){
                // Destroy preloader.
                Helper.preloader(preloader_el, true);
            }
        });
    }

    /**
     * Helper.decode_entities
     * Decodes HTML entities.
     *
     * @since 1.0.0
     * @version 1.0.0
     */
    Helper.decode_entities = function(string){
    	// Create pseudo element.
	    var pseudo = document.createElement('textarea');
	    // Decode.
	    pseudo.innerHTML = string;

	    return pseudo.value;
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
        var _this = this;

        // Require :: NPM
        // require('fancybox')($);
        // Require :: Plugins
        // require('../plugins/jquery.equal-heights');
        // require('../plugins/jquery.googlemap');
        // require('../plugins/jquery.modals');
        // require('../plugins/vendor/jquery.tooltipster');
        // require('../plugins/jquery.validation');
        // Require :: Vendor
        // require('../plugins/vendor/jquery.slider');

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
     * reveal_dom_element
     * Reveals a DOM element.
     *
     * Usage: <button class="js-reveal" data-reveal-target=".target" data-reveal-alt="Alternative Text" data-reveal-status="hidden">Click Me</button>
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module.prototype.reveal_dom_element = function(){
        // Button click.
        $(document).on('click', '.js-reveal', function(){
            var _self   = $(this),
                target  = _self.data('reveal-target'),
                modify1 = _self.text(),
                modify2 = _self.data('reveal-alt'),
                status  = _self.data('reveal-status');

            // Check we have a target & status.
            if(target && status){
                if(status == 'visible'){
                    // Check for modifier.
                    if(modify2){
                        // Change text.
                        _self.text(modify2);
                        // Update modifier.
                        _self.data('reveal-alt', modify1);
                    }
                    // Hide element.
                    $(target).addClass('u-hidden').removeClass('u-show');
                    // Update all elements status.
                    $('[data-reveal-target="' + target + '"]').data('reveal-status', 'hidden');
                }
                else{
                    // Check for modifier.
                    if(modify2){
                        // Change text.
                        _self.text(modify2);
                        // Update modifier.
                        _self.data('reveal-alt', modify1);
                    }
                    // Show element.
                    $(target).addClass('u-show').removeClass('u-hidden');
                    // Update all elements status.
                    $('[data-reveal-target="' + target + '"]').data('reveal-status', 'visible');
                }
            }
        });
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
     * tooltips
     * Tooltip events.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module.prototype.tooltips = function(){
        // DOM check.
        if($('.js-tooltip').length){
            // Init plugin.
            $('.js-tooltip').tooltipster({
                delay    : 100,
                animation: 'fade',
                trigger  : 'hover'
            });
            // Prevent click. This is for tooltips used in forms where
            // we might use an anchor instead of a button. We do this
            // so the button doesn't submit the form and trigger the
            // validation script.
            $('.js-tooltip').on('click', function(e){
                e.preventDefault();
            })
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
            // Set the captcha field value and check the box.
            $('#c_a_p_t_c_h_a').prop('checked', true).val('c_a_p_t_c_h_a');
        }

        // DOM check.
        if($('.js-validate').length){
            // Init plugin.
            $('.js-validate').validation({
                serverValidation        : false,
                appendErrorToPlaceholder: true,
                successCallback: function(){
                    // Check for Google Analytics.
                    if(window.ga_active){
                        // Set a virtual page for GA.
                        ga('send', 'pageview', '/contact-success.virtual');
                    }
                }
            });
        };
    }

    // Export
    module.exports = new Module();

}(window.M = window.M || function(){}, jQuery, window));

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
		// Set active flag.
		this.menu_active = false;
		this.sub_menu_active = false;

		// Vars.
		_this.$button    = $('.js-mobile-button');
		_this.$menu      = $('.js-mobile-menu');
		_this.$content   = $('.js-mobile-content');
		_this.$close     = $('.js-close-mobile-menu');
		_this.$sub_close = $('.js-sub-menu-close');

		// Start binds on window load / resize.
		$(window).on('load resize', $.proxy(_this.init, _this));
    }

	/**
	 * init
	 * Init method for this module.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.init = function(){
    	// Check screen is below mobile breakpoint.
		if(Helpers.breakpoint(window.mobile_breakpoint)){
        	return this.binds();
        }
        else{
			// Reset flag.
			this.set_menu_flag(false);
        	// Reset any menus.
        	return this.hide_primary_menu();
        }
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

			// Check sub menu is active first.
			if(_this.sub_menu_active){
				// Hide mobile menu.
				_this.hide_sub_menu();
				// Set flag.
				_this.sub_menu_active = false;
			}
			// Run hide operations.
			else if(_this.menu_active){
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

		// Sub Menu Close.
		_this.$sub_close.on('click', function(){
			// Check sub menu is active first.
			if(_this.sub_menu_active){
				// Hide mobile menu.
				_this.hide_sub_menu();
				// Set flag.
				_this.sub_menu_active = false;
			}
		});

		// Sub Menu Click.
		$('a', _this.$menu).on('click', function(e){
			var _self = $(this);

			if(_self.next('.sub-menu').length){
				e.preventDefault();
				// Init sub menu.
				_this.show_sub_menu(_self.next('.sub-menu'));
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
		this.$close.on('click', function(){
			// Check sub menu is active first.
			if(_this.sub_menu_active){
				// Hide mobile menu.
				_this.hide_sub_menu();
				// Set flag.
				_this.sub_menu_active = false;
			}
			// Check menu is active.
			else if(_this.menu_active){
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
		var doc_width  = $(document).width(),
			doc_height = $(document).height(),
			doc_85     = (doc_width / 100) * 85;

		// Add 85% width to menu.
		this.$menu.css({'width': doc_85});
		// Move page content 85% left.
		this.$content.addClass('active-menu').css({'left': doc_85});
		// Add active class to menu button.
		this.$button.addClass('active-menu');
		// Restrict body height.
		$('body').css({'height': doc_height, 'overflow': 'hidden'});
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

		// Remove the active class.
		_this.$content.removeClass('active-menu');
		// Remove active class from menu button.
		_this.$button.removeClass('active-menu');
		// Remove the active class.
		_this.$content.css({'left': ''});

		// Wait 10ms.
		setTimeout(function(){
			// Remove 90% width to menu.
			_this.$menu.css({'width': ''});
			// Restrict body height.
			$('body').css({'height': '', 'overflow': ''});
		}, 500); // Needs to be the same as the animation speed in the CSS.
	}

	/**
	 * show_sub_menu
	 * Show sub menu.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.show_sub_menu = function(el){
		var _this = this;

		// Vars.
		var menu_width = _this.$menu.width(),
			menu_95    = (menu_width / 100) * 95;

		// Add 95% width to sub menu.
		el.addClass('active-sub-menu').css({'width': menu_95});
		// Wait 10ms.
		setTimeout(function(){
			_this.$menu.addClass('sub-menu-active');
			_this.sub_menu_active = true;
		}, 100);
	}

	/**
	 * hide_sub_menu
	 * Hides sub menu.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.hide_sub_menu = function(el){
		var _this = this;

		// Set close button text.
		this.$close.html('<i class="icon icon--menu--close"></i> Close Menu');
		// Remove 80% width from sub menus.
		$('.active-sub-menu').css({'width': ''});
		// Wait 10ms.
		setTimeout(function(){
			_this.sub_menu_active = false;
		}, 100);
		// Wait 20ms.
		setTimeout(function(){
			_this.$menu.removeClass('sub-menu-active');
			// Remove active class from sub menus.
			$('.active-sub-menu').removeClass('active-sub-menu');
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

}(window.M = window.M || function(){}, jQuery, window));

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

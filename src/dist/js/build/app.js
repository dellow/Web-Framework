/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 38);
/******/ })
/************************************************************************/
/******/ ({

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mobile = __webpack_require__(37);

var _mobile2 = _interopRequireDefault(_mobile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (Module, window) {
  /**
   * Module
   * Constructor for this module.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Module = function Module() {};

  /**
   * _settings
   * Settings for this module.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  Module.prototype._settings = {};

  /**
   * _dom
   * DOM elements for this module.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  Module.prototype._dom = {
    form: $('.js--validate-form')

    /**
     * init
     * NULLED.
     *
     * @since 1.0.0
     * @version 1.0.0
     * @access public
    **/
  };Module.prototype.init = function () {
    _mobile2.default.init();
    this.formValidation();
  };

  /**
   * formValidation
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  Module.prototype.formValidation = function () {
    // Init plugin.
    window.App.plugins.validation(this._dom.form, {
      serverValidation: false,
      appendErrorToPlaceholder: true,
      msgSep: '',
      successCallback: function successCallback() {
        // Check for Google Analytics.
        if (window.config.ga_active) {
          // Log it.
          window.Helpers.log('Setting virtual page view: /form-success.virtual'
          // Set a virtual page for GA.
          );window.ga('send', 'pageview', '/form-success.virtual');
        }
      }
    });
  };

  // Export
  module.exports = new Module();
})(function () {}, window); /**
                             *
                             * Route
                             *
                             * Copyright 2017, Author Name
                             * Some information on the license.
                             *
                            **/

/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 *
 * Equal Heights
 * jquery.equal-heights.js
 *
 * Copyright 2014, Stewart Dellow
 * Some information on the license.
 *
 * $('.js-eh').equalHeights();
 *
**/

;(function ($, window, undefined) {
    'use strict';

    // Set helpers.

    var helpers = {};

    /**
     * Plugin
     * Return a unique plugin instance.
    **/
    var Plugin = function Plugin(elem, options) {
        this.elem = elem;
        this.$elem = $(elem);
        this.options = options;
        this.metadata = this.$elem.data('plugin-options');
    };

    /**
     * $.fn.equalHeights
     * Return a unique plugin instance.
    **/
    $.fn.equalHeights = function (options) {
        return this.each(function () {
            new Plugin(this, options).init();
        });
    };

    /**
     * $.fn.equalHeights.defaults
     * Default options.
    **/
    $.fn.equalHeights.defaults = {
        widths: false

        /**
         * Plugin.prototype
         * Init.
        **/
    };Plugin.prototype = {
        init: function init() {
            // this
            var _self = this;

            // Global settings.
            _self.settings = $.extend({}, $.fn.equalHeights.defaults, _self.options);
            // Run the plugin.
            _self.run();

            return _self;
        },
        run: function run() {
            // Set the breakpoints
            var breakpoints = this.$elem.data('eh-breakpoints') ? this.$elem.data('eh-breakpoints').split('|') : [320, 9999];
            // Go!
            this.watch_window(this.$elem, breakpoints[0], breakpoints[1]);
        },
        calculate: function calculate(el) {
            var _self = this;

            var boxes = $('[data-eh="true"]', el);
            // Reset the height attribute to `auto` (or nothing).
            this.reset_sizes(el);
            // Map all qualifying element heights to an array.
            var heights = boxes.map(function () {
                return $(this).height();
            }).get();
            // Map all qualifying element heights to an array.
            var widths = boxes.map(function () {
                return $(this).outerWidth() + $(this).css('margin-left');
            }).get();
            // Get the largest value from the array.
            var large_height = Math.max.apply(Math, heights);
            var large_width = Math.max.apply(Math, widths);
            // Apply the CSS height to all qualifying elements.
            boxes.each(function () {
                $(this).height(large_height);
                // Are we doing widths?
                if (_self.settings.widths) {
                    $(this).css({ 'min-width': large_width });
                }
            });
        },
        watch_window: function watch_window(el, breakpoint1, breakpoint2) {
            var _self = this;

            $(function () {
                _self.run_sizes(el, breakpoint1, breakpoint2);
            });
            $(window).on('resize', function () {
                _self.run_sizes(el, breakpoint1, breakpoint2);
            });
        },
        run_sizes: function run_sizes(el, breakpoint1, breakpoint2) {
            var _self = this;

            return $(window).width() >= breakpoint1 && $(window).width() <= breakpoint2 ? _self.calculate(el) : _self.reset_sizes(el);
        },
        reset_sizes: function reset_sizes(el) {
            var _self = this;

            var boxes = $('[data-eh="true"]', el);
            // Reset the height attribute to `auto` (or nothing).
            boxes.each(function () {
                $(this).css({ 'height': 'auto' });
                // Are we doing widths?
                if (_self.settings.widths) {
                    $(this).css({ 'min-width': 'none' });
                }
            });
        }
    };
})(jQuery, window);

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 *
 * Modal
 * jquery.modal.js
 *
 * Copyright 2017, Stewart Dellow
 * Some information on the license.
 *
 * $('.js--modal').modal()
 *
 * setting: Type. Description.
 *
**/

;(function (window) {
  'use strict';

  // Set helpers.

  var helpers = {};

  /**
   * Plugin
   * Return a unique plugin instance.
  **/
  var Plugin = function Plugin(elem, options) {
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;
    this.metadata = this.$elem.data('plugin-options');
  };

  /**
   * $.fn.modal
   * Return a unique plugin instance.
  **/
  $.fn.modal = function (options) {
    return this.each(function () {
      new Plugin(this, options).init();
    });
  };

  /**
   * $.fn.destroyAllModals
   * Destroy all active modal windows.
  **/
  $.fn.destroyAllModals = function () {
    new Plugin().destroyAll();
  };

  /**
   * $.fn.modal.defaults
   * Default options.
  **/
  $.fn.modal.defaults = {
    template: '<div class="modal-window"><div class="modal-window__content"></div></div>',
    type: 'modal-slide-left',
    content: '',
    overlayColor: 'rgba(0, 0, 0, 0.75)',
    backgroundColor: '#FFFFFF',
    width: '50%',
    maxWidth: '650px',
    minWidth: '350px',
    minHeight: '0',
    shadow: 'none',
    appendTarget: $('body'),
    closeCallback: false

    /**
     * Plugin.prototype
     * Init.
    **/
  };Plugin.prototype = {
    init: function init() {
      // Flag to see if modal is active.
      this.modalActive = false;
      // Extend & cache settings.
      this.s = $.extend({}, $.fn.modal.defaults, this.options
      // Set the initial modal template.
      );this.$tpl = $(this.s.template
      // Set the initial overlay template.
      );this.$overlay = $('<div class="modal-overlay"></div>').css({ 'background-color': this.s.overlayColor }
      // Hide any open modals.
      );this.destroyAll
      // Create modal.
      ();this.createModal
      // Create overlay.
      ();this.createOverlay();

      return this;
    },
    registerEventListeners: function registerEventListeners() {
      var _this = this;

      // Event :: Click close button.
      $(document).on('click', '.js--modal-close', function (e) {
        e.preventDefault
        // Destroy modal.
        ();_this.destroyAll
        // Check for a callback.
        ();if (_this.s.closeCallback) {
          // Run callback.
          _this.s.closeCallback();
        }
      }
      // Event :: Click anywhere outside modal.
      );$(document).on('click', function (e) {
        if ($(e.target).closest('.modal').length === 0 && _this.modalActive) {
          e.preventDefault
          // Destroy modal.
          ();_this.destroyAll
          // Check for a callback.
          ();if (_this.s.closeCallback) {
            // Run callback.
            _this.s.closeCallback();
          }
        }
      }
      // Event :: Esc button.
      );$(document).on('keyup', function (e) {
        if (e.keyCode == 27) {
          e.preventDefault
          // Destroy modal.
          ();_this.destroyAll
          // Check for a callback.
          ();if (_this.s.closeCallback) {
            // Run callback.
            _this.s.closeCallback();
          }
        }
      });
    },
    createModal: function createModal() {
      // Get 10% of document height.
      var docHeight = $(window).height() / 100 * 10;
      // Add classes.
      this.$tpl.addClass(this.s.type).find('.modal-window__content').show().addClass(this.getModalClasses()
      // Add inline styles.
      );this.$tpl.css({
        'width': this.s.width,
        'maxWidth': this.s.maxWidth,
        'minWidth': this.s.minWidth
      }).find('.modal-window__content').css({
        'maxHeight': $(window).height() - docHeight,
        'box-shadow': this.s.shadow,
        'minHeight': this.s.minHeight,
        'background-color': this.s.backgroundColor
      }
      // Apply content.
      );$('.modal-window__content', this.$tpl).prepend(this.getModalContent()
      // Apply modal to DOM.
      );this.applyModal
      // Show modal.
      ();this.showModal();
    },
    getModalContent: function getModalContent() {
      return typeof this.s.content !== 'string' ? this.s.content.html() : this.s.content;
    },
    getModalClasses: function getModalClasses() {
      return typeof this.s.content !== 'string' ? this.s.content.attr('class') : '';
    },
    applyModal: function applyModal() {
      return this.s.appendTarget.prepend(this.$tpl);
    },
    showModal: function showModal() {
      var _this = this;

      setTimeout(function () {
        _this.$tpl.addClass('active');
        setTimeout(function () {
          $('.modal-window__content', this.$tpl).css({
            'overflow': 'hidden',
            'overflow-y': 'scroll'
          });
          _this.modalActive = true;
          // Register event listeners.
          _this.registerEventListeners();
        }, 200);
      }, 50);
    },
    destroyModal: function destroyModal() {
      return $('.modal-window').remove();
    },
    createOverlay: function createOverlay() {
      // Apply overlay to DOM.
      this.applyOverlay();
    },
    applyOverlay: function applyOverlay() {
      return this.$tpl.after(this.$overlay);
    },
    destroyOverlay: function destroyOverlay() {
      return $('.modal-overlay').remove();
    },
    destroyAll: function destroyAll() {
      this.modalActive = false;
      this.destroyModal();
      this.destroyOverlay();
    }
  };
})(window);

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 *
 * jQuery Form Validation
 * jquery.validation.js
 *
 * Copyright 2017, Stewart Dellow
 * Some information on the license.
 *
 * $('.form').validation();
 *
 * Setting Error Messages:
 * If no error message is set a generic one will be used (this can be changed in options). You can set an error message by
 * one of two ways. Either by using the `data-validation-message` HTML attribute on the field in question or by entering
 * a validation message in a hidden HTML element. You must pass the class of this HTML element in the options. The default
 * element is: $('.error-message').
 *
 * Callback:
 * You can supply a callback function which is called on success in the options like so:
 *    $('.js-validate').validation({
 *      ...
 *      successCallback: function (parameters) {
 *        console.log(parameters);
 *      }
 *    });
 * If you are using server validation, the `parameters` argument will supply the results of the validation.
 *
 *
 * domains                 : Array. Adds to default array of top level domains for the email checker to spell check against.
 * serverData              : Object. Data to send with the XHR request (if using server validation).
 * localStorage            : Boolean. Whether to use localStorage to save the field values if the page gets refreshed.
 * serverValidation        : Boolean. Whether to use server validation or not.
 * disableAjax             : Boolean. Disables AJAX. serverValidation must be false.
 * onlyVisibleFields       : Boolean. Whether to only validate against visible fields or not.
 * appendErrorToPlaceholder: Boolean. Append the error message to the form field placeholder.
 * disableButtons          : Boolean. Disable the form buttons while processing.
 * scrollToError           : Boolean. If enabled animates a scroll to the first field with an error.
 * fadeOutAnimationSpeed   : Integer. Speed to fade out the form on success.
 * serverURL               : String. A valid URL for the server validation.
 * serverID                : String. Post var to send to server side to identify AJAX response.
 * emailRegEx              : String. RegEx to check email addresses against.
 * passRegEx               : String. RegEx to check passwords against.
 * urlRegEx                : String. RegEx to check URLs against.
 * errorBoxClass           : String. Class to apply to the error box.
 * errorClass              : String. Class to apply to fields with an error.
 * msgSep                  : String. Used to separate the field label and the error message.
 * defaultErrorMsg         : String. Field error message if one isn't supplied in the HTML.
 * defaultSuccessMsg       : String. Form success message if one isn't supplied in the HTML.
 * defaultSuggestText      : String. Email suggestion text.
 * errorBoxElement         : String. HTML element type that wraps the error message.
 * preloaderTemplate       : String. HTML template for the preloader. Can include inline styles or use in external stylesheet.
 * validateElement         : jQuery Element. A valid jQuery element to specify fields that aren't required but should be validated if entered.
 * successElement          : jQuery Element. A valid jQuery element that holds the success message.
 * customValidationMethod  : Function. Function containing any custom methods to validate against. Must return the element.
 * successCallback         : Function. Function to be called on success of validation. Provides array of fields as parameter if using server validation.
 *
**/

;(function ($, window, undefined) {

  // Email suggester object.
  var suggester = {};
  // Set helpers object.
  var helpers = {};

  /**
  * Plugin
  * Return a unique plugin instance.
  **/
  var Plugin = function Plugin(elem, options) {
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;
    this.metadata = this.$elem.data('plugin-options');
  };

  /**
  * $.fn.validation
  * Return a unique plugin instance.
  **/
  $.fn.validation = function (options) {
    return this.each(function () {
      new Plugin(this, options).init();
    });
  };

  /**
  * $.fn.validation.defaults
  * Default options.
  **/
  $.fn.validation.defaults = {
    domains: [],
    localStorage: true,
    serverValidation: false,
    serverURL: false,
    serverData: {},
    disableAjax: false,
    onlyVisibleFields: false,
    appendErrorToPlaceholder: false,
    disableButtons: false,
    scrollToError: false,
    fadeOutAnimationSpeed: 500,
    serverID: 'ajaxrequest',
    emailRegEx: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    passRegEx: /^.*(?=.{8,})(?=.*[0-9])[a-zA-Z0-9]+$/,
    urlRegEx: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
    errorBoxClass: 'js--validation-error',
    errorClass: 'js--validation-field-error',
    msgSep: ' -',
    defaultErrorMsg: 'Please enter a value',
    defaultSuccessMsg: 'The form has been successfully submitted.',
    defaultSuggestText: 'Did you mean',
    errorBoxElement: '<span/>',
    preloaderTemplate: '<div class="loader" title="1"><svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 50 50" style="display:block; enable-background:new 0 0 50 50;" xml:space="preserve"><path fill="#FFFFFF" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/></path></svg></div>',
    validateElement: $('.js--validation-validate'),
    successElement: $('.js--validation-form-success'),
    customValidationMethod: null,
    successCallback: function successCallback(parameters) {}

    /**
    * Plugin.prototype
    * Init.
    **/
  };Plugin.prototype = {
    init: function init() {
      // Global settings.
      this.settings = $.extend({}, $.fn.validation.defaults, this.options
      // Cache fields.
      );this.fields = $('input, select, textarea', this.$elem
      // Cache the reset button element.
      );this.reset = $('button[type="reset"], input[type="reset"]', this.$elem
      // Cache the submit button element.
      );this.button = $('button[type="submit"], input[type="submit"]', this.$elem
      // Success element.
      );this.successElement = this.settings.successElement.length ? this.settings.successElement : this.$elem.before($('<div class="js--validation-form-success">' + this.settings.defaultSuccessMsg + '</div>')
      // Empty array for elements. Set once the form is submitted.
      );this.$elementArray = [];
      // Do jQuery events.
      this.events
      // Run the plugin.
      ();this.run();

      return this;
    },
    events: function events() {
      var _this = this;

      // On submit.
      this.$elem.on('submit', function (e) {
        e.preventDefault();

        _this.setFields();
        _this.process();
      }
      // On reset.
      );this.reset.on('click', function (e) {
        _this.validationReset(e);
      }
      // On field change.
      );this.fields.change(function () {
        _this.saveToLocalStorage($(this));
      });
    },
    run: function run() {
      // Add 'novalidate' attribute to form.
      this.$elem.attr('novalidate', 'true'
      // Process fields.
      );this.processFields
      // Get localStorage.
      ();this.getLocalStorage();
    },
    setFields: function setFields() {
      var _this = this;

      // Put all required fields into array.
      var fieldsArray = $('[required]', this.$elem).map(function () {
        if (_this.settings.onlyVisibleFields) {
          if ($(this).is(':visible')) {
            return $(this).attr('name');
          }
        } else {
          return $(this).attr('name');
        }
      }
      // Remove duplicates (jQuery.unique only works on DOM elements, we can't use DOM elements because they are ALL unique despite the same name).
      );fieldsArray = helpers.removeDuplicates(fieldsArray
      // Reverts the fieldsArray into an array of DOM elements.
      );this.$elementArray = $.map(fieldsArray, function (field, i) {
        return $('[name="' + field + '"]', _this.$elem);
      });
    },
    processFields: function processFields() {
      var _this = this;

      // Put all required fields into array.
      var fieldsArray = $('[required]', this.$elem).map(function () {
        if (_this.settings.onlyVisibleFields) {
          if ($(this).is(':visible')) {
            return $(this).attr('name');
          }
        } else {
          return $(this).attr('name');
        }
      }
      // Remove duplicates (jQuery.unique only works on DOM elements, we can't use DOM elements because they are ALL unique despite the same name).
      );fieldsArray = helpers.removeDuplicates(fieldsArray
      // Reverts the fieldsArray into an array of DOM elements.
      );this.$elementArray = $.map(fieldsArray, function (field, i) {
        return $('[name="' + field + '"]', _this.$elem);
      });

      $.each(this.$elementArray, function () {
        // Field type specific actions.
        switch ($(this).attr('type')) {
          case 'email':
            _this.setupEmailField($(this));
            break;
          case 'url':
            _this.setupURLField($(this));
            break;
        }
      });
    },
    setup: function setup() {
      // Global error array.
      this.errorArray = [];
      // Create an array for checkboxes and radio inputs.
      this.groupArray = [];
      // Create an array for messages that have no fields.
      this.leftovers = [];
    },
    ajaxRequest: function ajaxRequest(url, data) {
      return $.ajax({
        type: 'POST',
        url: url,
        data: $.extend({}, { ajaxrequest: true }, helpers.parseURLParams(data), this.settings.serverData || {}),
        dataType: 'JSON',
        beforeSend: function beforeSend(jqXHR, settings) {
          // Log full URL.
          helpers.log(settings.data ? settings.url + '?' + settings.data : settings.url);
        }
      });
    },
    applyPreloader: function applyPreloader(el) {
      // Guard :: Check element exists.
      if (!el.length) return;

      // Content.
      var content = JSON.stringify(el.html()
      // Loader.
      );var loader = $(this.settings.preloaderTemplate).hide
      // Apply preloader.
      ();el.css({
        'width': el.outerWidth(),
        'height': el.outerHeight(),
        'position': 'relative'
      }).html(loader).attr('data-loader-content', content).addClass('loading');
      loader.css({
        'position': 'absolute',
        'top': '50%',
        'left': '50%',
        'margin-left': -loader.outerWidth() / 2,
        'margin-top': -loader.outerHeight() / 2
      }).show();
    },
    destroyPreloader: function destroyPreloader(el) {
      // Guard :: Check element exists.
      if (!el.length) return;

      // Content.
      var content = JSON.parse(el.data('loader-content')
      // Remove preloader
      );el.removeClass('loading').html(content).removeAttr('data-loader-content').css({
        'width': '',
        'height': '',
        'position': ''
      });
    },
    disableButton: function disableButton(disable) {
      if (this.settings.disableButtons) {
        // Disable
        if (disable) {
          // Disable the submit button.
          this.button.prop('disabled', true);
        } else {
          // Enable the submit button.
          this.button.prop('disabled', false);
        }
      }
    },
    clearLocalStorage: function clearLocalStorage() {
      this.fields.each(function () {
        localStorage.removeItem($(this).attr('name'));
      });
    },
    getLocalStorage: function getLocalStorage() {
      if (this.settings.localStorage && typeof Storage !== 'undefined') {
        this.fields.each(function () {
          // Vars
          var inputName = $(this).attr('name');

          if (localStorage[inputName]) {
            if ($(this).is('select')) {
              $('option[selected="selected"]', this).removeAttr('selected');
              $('option[value="' + localStorage[inputName] + '"]', this).prop('selected', true);
            } else if ($(this).is('input[type="radio"]')) {
              if ($(this).val() == localStorage[inputName]) {
                $(this).prop('checked', true);
              }
            } else if ($(this).is('input[type="checkbox"]')) {
              var checkboxes = localStorage[inputName].split(',');
              $('input[name="' + inputName + '"]').each(function (i) {
                if (checkboxes[i] != '' && $(this).val() == checkboxes[i]) {
                  $(this).prop('checked', true);
                }
              });
            } else {
              $(this).val(localStorage[inputName]);
            }
          }
        });
      }
    },
    saveToLocalStorage: function saveToLocalStorage(el) {
      // Guard :: Check element exists.
      if (!el.length) return;

      if (this.settings.localStorage && typeof Storage !== 'undefined') {
        // Vars
        var inputName = el.attr('name');

        if (el.is('input[type="checkbox"]')) {
          // Vars
          var checkboxArray = [];

          $('input[name="' + inputName + '"]').each(function (i) {
            if ($(this).is(':checked')) {
              checkboxArray.push($(this).val());
            } else {
              checkboxArray.push('');
            }
          });
          localStorage[inputName] = checkboxArray;
        } else {
          localStorage[inputName] = el.val();
        }
      }
    },
    setupEmailField: function setupEmailField(el) {
      var _this = this;

      // Guard :: Check element exists.
      if (!el.length) return;

      el.after($('<div class="js--validation-suggestion">' + this.settings.defaultSuggestText + ' <a href="#" class="js--validation-alternative-email"><span class="js--validation-address">address</span>@<span class="js--validation-domain">domain.com</span></a>?</div>'));

      el.on('blur', function () {
        suggester.init(_this, el, _this.settings.domains);
      });
    },
    setupURLField: function setupURLField(el) {
      // Guard :: Check element exists.
      if (!el.length) return;

      el.on('blur', function () {
        var value = el.val();
        if (value !== '' && !value.match(/^http([s]?):\/\/.*/)) {
          el.val('http://' + value);
        }
      });
    },
    resetErrors: function resetErrors(form) {
      // Set form.
      form = typeof form !== 'undefined' ? form : this;
      // Remove error class from form.
      form.$elem.removeClass('js--validation-form-has-errors'
      // Remove generic form messages.
      );$('.js--validation-form-messages').empty
      // Remove error class from fields.
      ();$('.js--validation-field-has-errors', form.$elem).removeClass('js--validation-field-has-errors'
      // Remove error class from fieldsets.
      );$('.js--validation-fieldset-has-errors', form.$elem).removeClass('js--validation-fieldset-has-errors'
      // Remove error class from inputs with placeholder error..
      );$('.js--validation-field--placeholder', form.$elem).removeClass('js--validation-field--placeholder');
      $('.js--validation-field--placeholder--span', form.$elem).remove
      // Hide email suggester.
      ();$('.js--validation-suggestion', form.$elem).hide
      // Remove current classes.
      ();$('.' + form.settings.errorClass, form.$elem).removeClass(form.settings.errorClass);
      $('.' + form.settings.errorBoxClass, form.$elem).remove();
    },
    attachErrors: function attachErrors(arr) {
      var _this = this;

      // Remove empty elements.
      arr = jQuery.grep(arr, function (n, i) {
        return n !== "" && n != null;
      }
      // Remove previous errors.
      );this.resetErrors
      // Un-disable stuff.
      ();this.disableButton(false
      // Add error class to form.
      );this.$elem.addClass('js--validation-form-has-errors'
      // Add new ones.
      );$.each(arr, function (index) {
        if ($(this) == undefined) {
          return;
        }
        var a = $(this),
            el = a[0].input;

        // Get error message.
        var error = a[0].msg !== '' ? a[0].msg : _this.settings.defaultErrorMsg;
        // Separator.
        var message = _this.settings.msgSep ? error ? _this.settings.msgSep + ' <span class="js--validation-msg">' + error + '</span>' : '' : '<span class="js--validation-msg">' + error + '</span>';

        // Check element exists in the DOM.
        if (el.length && el.is(':input') && el.attr('type') !== 'hidden') {
          // Apply error class to field.
          el.addClass(_this.settings.errorClass).parent().addClass('js--validation-field-has-errors'
          // Field specific actions.
          );if (el.attr('type') === 'checkbox' || el.attr('type') === 'radio') {
            // Add error element to field.
            el.parent().find('label, .label').first().append($(_this.settings.errorBoxElement).addClass(_this.settings.errorBoxClass).html(message)
            // Apply to nearest label if checkbox or radio.
            );el.closest('label').addClass(_this.settings.errorClass);
          } else {
            if (_this.settings.appendErrorToPlaceholder) {
              // Find label.
              el.parent().find('label, .label').addClass(_this.settings.errorClass
              // Check value length.
              );if (el.val().length > 0) {
                // Add error class to placeholder.
                el.parent().addClass('js--validation-field--placeholder'
                // Add a span to the field.
                );el.before('<span class="js--validation-field--placeholder--span">' + error + '</span>');
              } else {
                // Add error to placeholder.
                el.attr('placeholder', error);
              }
            } else {
              // Add error element to field.
              el.parent().find('label, .label').append($(_this.settings.errorBoxElement).addClass(_this.settings.errorBoxClass).html(message));
            }
          }
          // Set errors on fieldset.
          el.closest('fieldset').addClass('js--validation-fieldset-has-errors'
          // Scroll to first error field.
          );if (index == 0 && _this.settings.scrollToError) {
            // Determine fieldset.
            var fieldset = el.parentsUntil('fieldset').parent
            // Check if el has parent fieldset.
            ();if (fieldset.length) {
              $('html, body').animate({
                scrollTop: fieldset.offset().top - 25
              }, 500);
            } else {
              $('html, body').animate({
                scrollTop: el.offset().top - 25
              }, 500);
            }
          }
        } else if (!el.is(':input')) {
          el.prepend('<p>' + error + '</p>').show();
        } else {
          _this.leftovers.push(error);
        }
      });
    },
    fieldChecker: function fieldChecker(field) {
      var obj;
      var msg = field.data('validation-message') || '';

      // Checkboxes and radio.
      if ((field.attr('type') === 'checkbox' || field.attr('type') === 'radio') && field.serializeArray().length == 0) {
        return obj = {
          input: field,
          msg: msg
        };
      }
      // Email fields.
      else if (field.attr('type') === 'email' && !this.settings.emailRegEx.test(field.val())) {
          return obj = {
            input: field,
            msg: msg
          };
        }
        // URL fields.
        else if (field.attr('type') === 'url' && !this.settings.urlRegEx.test(field.val())) {
            return obj = {
              input: field,
              msg: msg
            };
          }
          // Check for existence.
          else if (field.val() === '' || field.val() === 'undefined' || field.val() === undefined || field.val() === '-') {
              return obj = {
                input: field,
                msg: msg
              };
            }
    },
    jsValidateFields: function jsValidateFields() {
      var _this = this;

      // Put all empty fields into array.
      this.errorArray = $.map(this.$elementArray, function (field, i) {
        return _this.fieldChecker(field);
      }
      // Custom validation method.
      );if ($.isFunction(this.settings.customValidationMethod)) {
        _this.errorArray.push(_this.settings.customValidationMethod());
      }
      // Validate non required fields with length.
      this.$elem.find(this.settings.validateElement).each(function () {
        if ($(this).val() !== '') {
          _this.errorArray.push(_this.fieldChecker($(this)));
        }
      });

      return _this.errorArray.length === 0 ? _this.success('js', null) : _this.validationFailure();
    },
    serverValidateFields: function serverValidateFields() {
      var _this = this;

      // Check for a form action.
      if (_this.settings.serverURL) {
        // Set flag.
        var fatalerror = false;
        // Ajax request.
        var ajaxPromise = _this.ajaxRequest(_this.settings.serverURL, _this.$elem.serialize()
        // Process promise.
        );ajaxPromise.done(function (res) {
          // If error.
          if (res.type == 'error') {
            if (_typeof(res.response) == 'object') {
              // Loops through the response and adds them to the errorArray.
              for (var i = 0, ii = res.response.length; i < ii; i++) {
                var obj = {
                  input: res.response[i].field.indexOf('.') === 0 ? $(res.response[i].field) : $('[name="' + res.response[i].field + '"]', _this.$elem),
                  msg: res.response[i].msg
                };
                _this.errorArray.push(obj);
              }
            }
          }
          // Array of elements for the callback.
          var formEntries = _this.$elem.serializeArray();

          return _this.errorArray.length === 0 && !fatalerror ? _this.success('server', formEntries, res) : _this.validationFailure();
        }).fail(function (res, ajaxOptions, thrownError) {
          // Log it.
          helpers.log(thrownError
          // Set error.
          );fatalerror = true;
        });
      } else {
        // Error message.
        helpers.log("You must supply a valid URL with the serverURL option in order to use server validation.");

        return this.validationFailure();
      }
    },
    success: function success(type, callbackParameters, formResponse) {
      var _this = this;

      // Clear localStorage.
      this.clearLocalStorage
      // If we have a custom post function.
      ();if (type == 'server') {
        this.$elem.fadeOut(this.settings.fadeOutAnimationSpeed, function () {
          // Validation Complete.
          _this.validateSuccess
          // Fade in success element.
          ();_this.$elem.parent().find(_this.successElement).fadeIn(_this.settings.fadeOutAnimationSpeed / 2
          // Callback
          );_this.settings.successCallback.call(this, callbackParameters, formResponse);
        });
      } else if (!this.settings.disableAjax && type == 'js') {
        // Ajax request.
        var ajaxPromise = this.ajaxRequest(this.settings.serverURL, this.$elem.serialize() + '&' + this.settings.serverID + '=true'

        // Process promise.
        );ajaxPromise.always(function (response) {
          _this.$elem.fadeOut(_this.settings.fadeOutAnimationSpeed, function () {
            // Validation Complete.
            _this.validateSuccess
            // Fade in success element.
            ();_this.$elem.parent().find(_this.successElement).fadeIn(_this.settings.fadeOutAnimationSpeed / 2
            // Callback
            );_this.settings.successCallback.call(_this, callbackParameters);
          });
        });
      } else {
        // Unbind submit.
        this.$elem.unbind('submit'
        // Validation Complete.
        );this.validateSuccess
        // Callback
        ();this.settings.successCallback.call(this, callbackParameters
        // Trigger submit after unbind.
        );this.$elem.trigger('submit');
      }
    },
    process: function process() {
      // Apply preloader.
      this.applyPreloader(this.button
      // Disable stuff.
      );this.disableButton(true
      // Run setup this.
      );this.setup
      // Check validation type.
      ();if (this.settings.serverValidation) {
        // If we are doing server validation.
        this.serverValidateFields();
      } else {
        // If we are not doing server validation.
        this.jsValidateFields();
      }
    },
    validateSuccess: function validateSuccess() {
      // Destroy preloader.
      this.destroyPreloader(this.button
      // Reset validation.
      );this.validationReset();
    },
    validationFailure: function validationFailure() {
      var _this = this;

      // Process for 0.5 second.
      setTimeout(function () {
        // Set errors
        _this.attachErrors(_this.errorArray, _this.$elem
        // Destroy preloader.
        );_this.destroyPreloader(_this.button);
      }, 500);
    },
    validationReset: function validationReset() {
      // Destroy preloader.
      this.destroyPreloader(this.button
      // Un-disable stuff.
      );this.disableButton(false
      // Remove errors.
      );this.resetErrors
      // Clear localStorage.
      ();this.clearLocalStorage
      // Reset all field values.
      ();this.$elem.find('input[type="text"], input[type="email"], input[type="url"], textarea, select').val('');
    }

    /**
     *
     * init
     * NULLED.
     *
    **/
  };suggester.init = function (form, el, pluginDomains) {
    // Default domains
    var defaultDomains = ['aol.com', 'bellsouth.net', 'btinternet.com', 'btopenworld.com', 'blueyonder.co.uk', 'comcast.net', 'cox.net', 'gmail.com', 'google.com', 'googlemail.com', 'hotmail.co.uk', 'hotmail.com', 'hotmail.fr', 'hotmail.it', 'icloud.com', 'live.com', 'mac.com', 'mail.com', 'me.com', 'msn.com', 'o2.co.uk', 'orange.co.uk', 'outlook.com', 'outlook.co.uk', 'sbcglobal.net', 'verizon.net', 'virginmedia.com', 'yahoo.com', 'yahoo.co.uk', 'yahoo.com.tw', 'yahoo.es', 'yahoo.fr'];
    // Extend the domains array with those from the plugin settings.
    this.domains = $.extend(true, defaultDomains, pluginDomains);

    var emailVal = el.val();
    var matchVal = suggester.getMatch(emailVal);

    this.suggestion = el.next('.js--validation-suggestion');
    this.reveal(form, el, matchVal);
  };

  /**
   *
   * getMatch
   * NULLED.
   *
  **/
  suggester.getMatch = function (query) {
    var limit = 99;
    var query = query.split('@');

    for (var i = 0, ii = this.domains.length; i < ii; i++) {
      var distance = suggester.levenshteinDistance(this.domains[i], query[1]);
      if (distance < limit) {
        limit = distance;
        var domain = this.domains[i];
      }
    }
    if (limit <= 2 && domain !== null && domain !== query[1]) {
      return {
        address: query[0],
        domain: domain
      };
    } else {
      return false;
    }
  };

  /**
   *
   * levenshteinDistance
   * NULLED.
   *
  **/
  suggester.levenshteinDistance = function (a, b) {
    var c = 0;
    var d = 0;
    var e = 0;
    var f = 0;
    var g = 5;

    if (a == null || a.length === 0) {
      if (b == null || b.length === 0) {
        return 0;
      } else {
        return b.length;
      }
    }
    if (b == null || b.length === 0) {
      return a.length;
    }

    while (c + d < a.length && c + e < b.length) {
      if (a[c + d] == b[c + e]) {
        f++;
      } else {
        d = 0;
        e = 0;
        for (var h = 0; h < g; h++) {
          if (c + h < a.length && a[c + h] == b[c]) {
            d = h;
            break;
          }
          if (c + h < b.length && a[c] == b[c + h]) {
            e = h;
            break;
          }
        }
      }
      c++;
    }
    return (a.length + b.length) / 2 - f;
  };

  /**
   *
   * reveal
   * NULLED.
   *
  **/
  suggester.reveal = function (form, el, result) {
    if (result) {
      Plugin.prototype.resetErrors(form
      // Set email address.
      );$('.js--validation-address', this.suggestion).text(result.address
      // Set email domain.
      );$('.js--validation-domain', this.suggestion).text(result.domain
      // Reveal suggestion.
      );this.suggestion.stop(true, false).slideDown(350
      // Click event.
      );$('.js--validation-alternative-email').on('click', function (e) {
        e.preventDefault

        // Apply suggestion.
        ();el.val(result.address + '@' + result.domain
        // Hide suggestion.
        );suggester.suggestion.stop(true, false).slideUp(350);
      });
    }
  };

  /**
   *
   * removeDuplicates
   * Remove duplicates from an array.
   *
  **/
  helpers.removeDuplicates = function (array) {
    var result = [];
    $.each(array, function (i, e) {
      if ($.inArray(e, result) == -1) {
        result.push(e);
      }
    });

    return result;
  };

  /**
   *
   * log
   * Returns a cross-browser safe message in the console.
   *
  **/
  helpers.log = function (message, alertlog) {
    alertlog = typeof alertlog === 'undefined' ? false : true;
    if (typeof console === 'undefined' || typeof console.log === 'undefined') {
      if (alertlog) {
        alert(message);
      }
    } else {
      console.log('%c-- jQuery Form Validation ---------------------------------------------------------', 'color:#c5211d;font-weight:bold;');
      console.log('%c' + message, 'color:#c5211d;');
      console.log('%c-- jQuery Form Validation ---------------------------------------------------------', 'color:#c5211d;font-weight:bold;');
      console.log('');
    }
  };

  /**
   *
   * parseURLParams
   * Converts the URL parameters into an object.
   *
  **/
  helpers.parseURLParams = function (str) {
    return JSON.parse('{"' + decodeURI(str).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
  };
})(jQuery, window);

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Navigo", [], factory);
	else if(typeof exports === 'object')
		exports["Navigo"] = factory();
	else
		root["Navigo"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function isPushStateAvailable() {
	  return !!(typeof window !== 'undefined' && window.history && window.history.pushState);
	}
	
	function Navigo(r, useHash, hash) {
	  this.root = null;
	  this._routes = [];
	  this._useHash = useHash;
	  this._hash = typeof hash === 'undefined' ? '#' : hash;
	  this._paused = false;
	  this._destroyed = false;
	  this._lastRouteResolved = null;
	  this._notFoundHandler = null;
	  this._defaultHandler = null;
	  this._usePushState = !useHash && isPushStateAvailable();
	  this._onLocationChange = this._onLocationChange.bind(this);
	  this._genericHooks = null;
	
	  if (r) {
	    this.root = useHash ? r.replace(/\/$/, '/' + this._hash) : r.replace(/\/$/, '');
	  } else if (useHash) {
	    this.root = this._cLoc().split(this._hash)[0].replace(/\/$/, '/' + this._hash);
	  }
	
	  this._listen();
	  this.updatePageLinks();
	}
	
	function clean(s) {
	  if (s instanceof RegExp) return s;
	  return s.replace(/\/+$/, '').replace(/^\/+/, '^/');
	}
	
	function regExpResultToParams(match, names) {
	  if (names.length === 0) return null;
	  if (!match) return null;
	  return match.slice(1, match.length).reduce(function (params, value, index) {
	    if (params === null) params = {};
	    params[names[index]] = decodeURIComponent(value);
	    return params;
	  }, null);
	}
	
	function replaceDynamicURLParts(route) {
	  var paramNames = [],
	      regexp;
	
	  if (route instanceof RegExp) {
	    regexp = route;
	  } else {
	    regexp = new RegExp(route.replace(Navigo.PARAMETER_REGEXP, function (full, dots, name) {
	      paramNames.push(name);
	      return Navigo.REPLACE_VARIABLE_REGEXP;
	    }).replace(Navigo.WILDCARD_REGEXP, Navigo.REPLACE_WILDCARD) + Navigo.FOLLOWED_BY_SLASH_REGEXP, Navigo.MATCH_REGEXP_FLAGS);
	  }
	  return { regexp: regexp, paramNames: paramNames };
	}
	
	function getUrlDepth(url) {
	  return url.replace(/\/$/, '').split('/').length;
	}
	
	function compareUrlDepth(urlA, urlB) {
	  return getUrlDepth(urlB) - getUrlDepth(urlA);
	}
	
	function findMatchedRoutes(url) {
	  var routes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	
	  return routes.map(function (route) {
	    var _replaceDynamicURLPar = replaceDynamicURLParts(clean(route.route)),
	        regexp = _replaceDynamicURLPar.regexp,
	        paramNames = _replaceDynamicURLPar.paramNames;
	
	    var match = url.replace(/^\/+/, '/').match(regexp);
	    var params = regExpResultToParams(match, paramNames);
	
	    return match ? { match: match, route: route, params: params } : false;
	  }).filter(function (m) {
	    return m;
	  });
	}
	
	function match(url, routes) {
	  return findMatchedRoutes(url, routes)[0] || false;
	}
	
	function root(url, routes) {
	  var matched = routes.map(function (route) {
	    return route.route === '' || route.route === '*' ? url : url.split(new RegExp(route.route + '($|\/)'))[0];
	  });
	  var fallbackURL = clean(url);
	
	  if (matched.length > 1) {
	    return matched.reduce(function (result, url) {
	      if (result.length > url.length) result = url;
	      return result;
	    }, matched[0]);
	  } else if (matched.length === 1) {
	    return matched[0];
	  }
	  return fallbackURL;
	}
	
	function isHashChangeAPIAvailable() {
	  return !!(typeof window !== 'undefined' && 'onhashchange' in window);
	}
	
	function extractGETParameters(url) {
	  return url.split(/\?(.*)?$/).slice(1).join('');
	}
	
	function getOnlyURL(url, useHash, hash) {
	  var onlyURL = url.split(/\?(.*)?$/)[0],
	      split;
	
	  if (typeof hash === 'undefined') {
	    // To preserve BC
	    hash = '#';
	  }
	
	  if (isPushStateAvailable() && !useHash) {
	    onlyURL = onlyURL.split(hash)[0];
	  } else {
	    split = onlyURL.split(hash);
	    onlyURL = split.length > 1 ? onlyURL.split(hash)[1] : split[0];
	  }
	
	  return onlyURL;
	}
	
	function manageHooks(handler, hooks, params) {
	  if (hooks && (typeof hooks === 'undefined' ? 'undefined' : _typeof(hooks)) === 'object') {
	    if (hooks.before) {
	      hooks.before(function () {
	        var shouldRoute = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	        if (!shouldRoute) return;
	        handler();
	        hooks.after && hooks.after(params);
	      }, params);
	    } else if (hooks.after) {
	      handler();
	      hooks.after && hooks.after(params);
	    }
	    return;
	  }
	  handler();
	};
	
	function isHashedRoot(url, useHash, hash) {
	  if (isPushStateAvailable() && !useHash) {
	    return false;
	  }
	
	  if (!url.match(hash)) {
	    return false;
	  }
	
	  var split = url.split(hash);
	
	  if (split.length < 2 || split[1] === '') {
	    return true;
	  }
	
	  return false;
	};
	
	Navigo.prototype = {
	  helpers: {
	    match: match,
	    root: root,
	    clean: clean
	  },
	  navigate: function navigate(path, absolute) {
	    var to;
	
	    path = path || '';
	    if (this._usePushState) {
	      to = (!absolute ? this._getRoot() + '/' : '') + path.replace(/^\/+/, '/');
	      to = to.replace(/([^:])(\/{2,})/g, '$1/');
	      history[this._paused ? 'replaceState' : 'pushState']({}, '', to);
	      this.resolve();
	    } else if (typeof window !== 'undefined') {
	      path = path.replace(new RegExp('^' + this._hash), '');
	      window.location.href = window.location.href.replace(/#$/, '').replace(new RegExp(this._hash + '.*$'), '') + this._hash + path;
	    }
	    return this;
	  },
	  on: function on() {
	    var _this = this;
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    if (typeof args[0] === 'function') {
	      this._defaultHandler = { handler: args[0], hooks: args[1] };
	    } else if (args.length >= 2) {
	      if (args[0] === '/') {
	        var func = args[1];
	
	        if (_typeof(args[1]) === 'object') {
	          func = args[1].uses;
	        }
	
	        this._defaultHandler = { handler: func, hooks: args[2] };
	      } else {
	        this._add(args[0], args[1], args[2]);
	      }
	    } else if (_typeof(args[0]) === 'object') {
	      var orderedRoutes = Object.keys(args[0]).sort(compareUrlDepth);
	
	      orderedRoutes.forEach(function (route) {
	        _this.on(route, args[0][route]);
	      });
	    }
	    return this;
	  },
	  off: function off(handler) {
	    if (this._defaultHandler !== null && handler === this._defaultHandler.handler) {
	      this._defaultHandler = null;
	    } else if (this._notFoundHandler !== null && handler === this._notFoundHandler.handler) {
	      this._notFoundHandler = null;
	    }
	    this._routes = this._routes.reduce(function (result, r) {
	      if (r.handler !== handler) result.push(r);
	      return result;
	    }, []);
	    return this;
	  },
	  notFound: function notFound(handler, hooks) {
	    this._notFoundHandler = { handler: handler, hooks: hooks };
	    return this;
	  },
	  resolve: function resolve(current) {
	    var _this2 = this;
	
	    var handler, m;
	    var url = (current || this._cLoc()).replace(this._getRoot(), '');
	
	    if (this._useHash) {
	      url = url.replace(new RegExp('^\/' + this._hash), '/');
	    }
	
	    var GETParameters = extractGETParameters(current || this._cLoc());
	    var onlyURL = getOnlyURL(url, this._useHash, this._hash);
	
	    if (this._paused || this._lastRouteResolved && onlyURL === this._lastRouteResolved.url && GETParameters === this._lastRouteResolved.query) {
	      return false;
	    }
	
	    m = match(onlyURL, this._routes);
	
	    if (m) {
	      this._callLeave();
	      this._lastRouteResolved = { url: onlyURL, query: GETParameters, hooks: m.route.hooks };
	      handler = m.route.handler;
	      manageHooks(function () {
	        manageHooks(function () {
	          m.route.route instanceof RegExp ? handler.apply(undefined, _toConsumableArray(m.match.slice(1, m.match.length))) : handler(m.params, GETParameters);
	        }, m.route.hooks, m.params, _this2._genericHooks);
	      }, this._genericHooks);
	      return m;
	    } else if (this._defaultHandler && (onlyURL === '' || onlyURL === '/' || onlyURL === this._hash || isHashedRoot(onlyURL, this._useHash, this._hash))) {
	      manageHooks(function () {
	        manageHooks(function () {
	          _this2._callLeave();
	          _this2._lastRouteResolved = { url: onlyURL, query: GETParameters, hooks: _this2._defaultHandler.hooks };
	          _this2._defaultHandler.handler(GETParameters);
	        }, _this2._defaultHandler.hooks);
	      }, this._genericHooks);
	      return true;
	    } else if (this._notFoundHandler) {
	      manageHooks(function () {
	        manageHooks(function () {
	          _this2._callLeave();
	          _this2._lastRouteResolved = { url: onlyURL, query: GETParameters, hooks: _this2._notFoundHandler.hooks };
	          _this2._notFoundHandler.handler(GETParameters);
	        }, _this2._notFoundHandler.hooks);
	      }, this._genericHooks);
	    }
	    return false;
	  },
	  destroy: function destroy() {
	    this._routes = [];
	    this._destroyed = true;
	    clearTimeout(this._listenningInterval);
	    if (typeof window !== 'undefined') {
	      window.removeEventListener('popstate', this._onLocationChange);
	      window.removeEventListener('hashchange', this._onLocationChange);
	    }
	  },
	  updatePageLinks: function updatePageLinks() {
	    var self = this;
	
	    if (typeof document === 'undefined') return;
	
	    this._findLinks().forEach(function (link) {
	      if (!link.hasListenerAttached) {
	        link.addEventListener('click', function (e) {
	          var location = self.getLinkPath(link);
	
	          if (!self._destroyed) {
	            e.preventDefault();
	            self.navigate(location.replace(/\/+$/, '').replace(/^\/+/, '/'));
	          }
	        });
	        link.hasListenerAttached = true;
	      }
	    });
	  },
	  generate: function generate(name) {
	    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    var result = this._routes.reduce(function (result, route) {
	      var key;
	
	      if (route.name === name) {
	        result = route.route;
	        for (key in data) {
	          result = result.toString().replace(':' + key, data[key]);
	        }
	      }
	      return result;
	    }, '');
	
	    return this._useHash ? this._hash + result : result;
	  },
	  link: function link(path) {
	    return this._getRoot() + path;
	  },
	  pause: function pause() {
	    var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	    this._paused = status;
	  },
	  resume: function resume() {
	    this.pause(false);
	  },
	  disableIfAPINotAvailable: function disableIfAPINotAvailable() {
	    if (!isPushStateAvailable()) {
	      this.destroy();
	    }
	  },
	  lastRouteResolved: function lastRouteResolved() {
	    return this._lastRouteResolved;
	  },
	  getLinkPath: function getLinkPath(link) {
	    return link.pathname || link.getAttribute('href');
	  },
	  hooks: function hooks(_hooks) {
	    this._genericHooks = _hooks;
	  },
	
	  _add: function _add(route) {
	    var handler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	    var hooks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	
	    if (typeof route === 'string') {
	      route = encodeURI(route);
	    }
	    if ((typeof handler === 'undefined' ? 'undefined' : _typeof(handler)) === 'object') {
	      this._routes.push({
	        route: route,
	        handler: handler.uses,
	        name: handler.as,
	        hooks: hooks || handler.hooks
	      });
	    } else {
	      this._routes.push({ route: route, handler: handler, hooks: hooks });
	    }
	    return this._add;
	  },
	  _getRoot: function _getRoot() {
	    if (this.root !== null) return this.root;
	    this.root = root(this._cLoc().split('?')[0], this._routes);
	    return this.root;
	  },
	  _listen: function _listen() {
	    var _this3 = this;
	
	    if (this._usePushState) {
	      window.addEventListener('popstate', this._onLocationChange);
	    } else if (isHashChangeAPIAvailable()) {
	      window.addEventListener('hashchange', this._onLocationChange);
	    } else {
	      var cached = this._cLoc(),
	          current = void 0,
	          _check = void 0;
	
	      _check = function check() {
	        current = _this3._cLoc();
	        if (cached !== current) {
	          cached = current;
	          _this3.resolve();
	        }
	        _this3._listenningInterval = setTimeout(_check, 200);
	      };
	      _check();
	    }
	  },
	  _cLoc: function _cLoc() {
	    if (typeof window !== 'undefined') {
	      if (typeof window.__NAVIGO_WINDOW_LOCATION_MOCK__ !== 'undefined') {
	        return window.__NAVIGO_WINDOW_LOCATION_MOCK__;
	      }
	      return clean(window.location.href);
	    }
	    return '';
	  },
	  _findLinks: function _findLinks() {
	    return [].slice.call(document.querySelectorAll('[data-navigo]'));
	  },
	  _onLocationChange: function _onLocationChange() {
	    this.resolve();
	  },
	  _callLeave: function _callLeave() {
	    if (this._lastRouteResolved && this._lastRouteResolved.hooks && this._lastRouteResolved.hooks.leave) {
	      this._lastRouteResolved.hooks.leave();
	    }
	  }
	};
	
	Navigo.PARAMETER_REGEXP = /([:*])(\w+)/g;
	Navigo.WILDCARD_REGEXP = /\*/g;
	Navigo.REPLACE_VARIABLE_REGEXP = '([^\/]+)';
	Navigo.REPLACE_WILDCARD = '(?:.*)';
	Navigo.FOLLOWED_BY_SLASH_REGEXP = '(?:\/$|$)';
	Navigo.MATCH_REGEXP_FLAGS = '';
	
	exports.default = Navigo;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=navigo.js.map

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
Turbolinks 5.0.3
Copyright © 2017 Basecamp, LLC
 */
(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame&&null!=window.addEventListener}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r,n=[].slice;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.throttle=function(t){var e;return e=null,function(){var r;return r=1<=arguments.length?n.call(arguments,0):[],null!=e?e:e=requestAnimationFrame(function(n){return function(){return e=null,t.apply(n,r)}}(this))}},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.History=function(){function r(t){this.delegate=t,this.onPageLoad=e(this.onPageLoad,this),this.onPopState=e(this.onPopState,this)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),addEventListener("load",this.onPageLoad,!1),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),removeEventListener("load",this.onPageLoad,!1),this.started=!1):void 0},r.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},r.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},r.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},r.prototype.onPageLoad=function(e){return t.defer(function(t){return function(){return t.pageLoaded=!0}}(this))},r.prototype.shouldHandlePopState=function(){return this.pageIsLoaded()},r.prototype.pageIsLoaded=function(){return this.pageLoaded||"complete"===document.readyState},r.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},r}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,l;for(this.element=t,this.elements={},l=this.element.childNodes,s=0,u=l.length;u>s;s++)i=l[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function r(r){this.delegate=r,this.onScroll=e(this.onScroll,this),this.onScroll=t.throttle(this.onScroll)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},r.prototype.scrollToElement=function(t){return t.scrollIntoView()},r.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},r.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},r.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},r}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){
return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target]):not([download])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"=="function"&&__webpack_require__(48)&&!(__WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))}).call(this);

/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 * Module
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

var MobileMenu = function () {

  /**
   * constructor
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  function MobileMenu() {
    _classCallCheck(this, MobileMenu);

    // Set flag.
    this.mainMenuOpen = false;
    this.subMenuOpen = false;

    this._settings = {
      menuSize: '100',
      moveContent: false
    };

    this._dom = {
      menu: $('[data-js-target="mobile-menu"]'),
      open: $('[data-js-event="menu-open"]'),
      header: $('[data-js-target="mobile-menu-header"]'),
      content: $('[data-js-target="mobile-menu-content"]'),
      bodyMenu: $('.page-mobile-menu__body__menuwrapper__main'),
      bodySubMenu: $('.page-mobile-menu__body__menuwrapper__sub')
    };
  }

  /**
   * init
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/


  _createClass(MobileMenu, [{
    key: 'init',
    value: function init() {
      this.events();
    }

    /**
     * events
     * NULLED.
     *
     * @since 1.0.0
     * @version 1.0.0
     * @access public
    **/

  }, {
    key: 'events',
    value: function events() {
      var _this = this;

      // Extend the events system.
      window.Events.extend({
        events: {
          'click [data-js-event="menu-open"]': 'toggleMenu',
          'click [data-js-event="menu-close"]': 'hideMainMenu',
          'click [data-js-target="mobile-menu"] .has_sub_menu': 'toggleSubMenu'
        },
        toggleMenu: function toggleMenu(e) {
          return _this.subMenuOpen ? _this.startMenuChild('hide') : _this.startMenuParent(!_this.mainMenuOpen ? 'show' : 'hide');
        },
        hideMainMenu: function hideMainMenu(e) {
          return _this.subMenuOpen ? _this.startMenuChild('hide') : _this.startMenuParent('hide');
        },
        toggleSubMenu: function toggleSubMenu(e) {
          e[0].preventDefault();

          return _this.startMenuChild('show', $(e[0].currentTarget));
        }
      });
    }

    /**
     * startMenuParent
     * NULLED.
     *
     * @since 1.0.0
     * @version 1.0.0
     * @access public
    **/

  }, {
    key: 'startMenuParent',
    value: function startMenuParent(action) {
      // Set the mobile menu header height to
      // match the page mobile header height.
      this.setHeaderHeight();

      return action === 'show' ? this.showMainMenu() : this.hideMainMenu();
    }

    /**
     * startMenuChild
     * NULLED.
     *
     * @since 1.0.0
     * @version 1.0.0
     * @access public
    **/

  }, {
    key: 'startMenuChild',
    value: function startMenuChild(action, el) {
      return action === 'show' ? this.showSubMenu(el) : this.hideSubMenu();
    }

    /**
     * showMainMenu
     * NULLED.
     *
     * @since 1.0.0
     * @version 1.0.0
     * @access public
    **/

  }, {
    key: 'showMainMenu',
    value: function showMainMenu() {
      // Toggle the mobile menu visibility.
      this.style(this._dom.menu, { 'left': -(100 - this._settings.menuSize) + '%', 'opacity': '1' }
      // Add no-scroll class.
      );$('body').addClass('u-noscroll'
      // Add active class to button.
      );this._dom.open.addClass('active'
      // Toggle the content position.
      );if (this._settings.moveContent) {
        this.style(this._dom.content, { 'left': this._settings.menuSize + '%' });
      }
      // Set flag.
      this.mainMenuOpen = true;
    }

    /**
     * hideMainMenu
     * NULLED.
     *
     * @since 1.0.0
     * @version 1.0.0
     * @access public
    **/

  }, {
    key: 'hideMainMenu',
    value: function hideMainMenu() {
      // Toggle the mobile menu visibility.
      this.style(this._dom.menu, { 'left': '-100%', 'opacity': '0' }
      // Remove no-scroll class.
      );$('body').removeClass('u-noscroll'
      // Add active class to button.
      );this._dom.open.removeClass('active'
      // Toggle the content position.
      );if (this._settings.moveContent) {
        this.style(this._dom.content, { 'left': '' });
      }
      // Reset flag.
      this.mainMenuOpen = false;
    }

    /**
     * showSubMenu
     * NULLED.
     *
     * @since 1.0.0
     * @version 1.0.0
     * @access public
    **/

  }, {
    key: 'showSubMenu',
    value: function showSubMenu(el) {
      // Cache sub menu.
      var subMenu = $('.sub-menu', el
      // Check sub menu exists.
      );if (subMenu.length) {
        // Add active class to button.
        this._dom.open.removeClass('active').addClass('half'
        // Inject sub menu into the DOM.
        );this.injectSubMenu(subMenu
        // Toggle the main menu visibility.
        );this.style(this._dom.bodyMenu, { 'left': '100%' }
        // Toggle the sub menu visibility.
        );this.style(this._dom.bodySubMenu, { 'left': '0' }
        // Set flag.
        );this.subMenuOpen = true;
      }
    }

    /**
     * hideSubMenu
     * NULLED.
     *
     * @since 1.0.0
     * @version 1.0.0
     * @access public
    **/

  }, {
    key: 'hideSubMenu',
    value: function hideSubMenu() {
      // Add active class to button.
      this._dom.open.addClass('active').removeClass('half'
      // Clear sub menu holder.
      );this.clearSubMenuHolder
      // Toggle the main menu visibility.
      ();this.style(this._dom.bodyMenu, { 'left': '0' }
      // Toggle the sub menu visibility.
      );this.style(this._dom.bodySubMenu, { 'left': '-100%' }
      // Reset flag.
      );this.subMenuOpen = false;
    }

    /**
     * setHeaderHeight
     * NULLED.
     *
     * @since 1.0.0
     * @version 1.0.0
     * @access public
    **/

  }, {
    key: 'setHeaderHeight',
    value: function setHeaderHeight() {
      return $('.page-mobile-menu').css({ 'top': this.calculateHeight(this._dom.header) });
    }

    /**
     * calculateHeight
     * NULLED.
     *
     * @since 1.0.0
     * @version 1.0.0
     * @access public
    **/

  }, {
    key: 'calculateHeight',
    value: function calculateHeight(el) {
      return el.outerHeight() - 1;
    }

    /**
     * style
     * NULLED.
     *
     * @since 1.0.0
     * @version 1.0.0
     * @access public
    **/

  }, {
    key: 'style',
    value: function style(el, css) {
      return el.css(css);
    }

    /**
     * injectSubMenu
     * NULLED.
     *
     * @since 1.0.0
     * @version 1.0.0
     * @access public
    **/

  }, {
    key: 'injectSubMenu',
    value: function injectSubMenu(el) {
      // Clone menu.
      var menuClone = el.clone
      // Append sub menu.
      ();this._dom.bodySubMenu.empty().append(menuClone);
    }

    /**
     * clearSubMenuHolder
     * NULLED.
     *
     * @since 1.0.0
     * @version 1.0.0
     * @access public
    **/

  }, {
    key: 'clearSubMenuHolder',
    value: function clearSubMenuHolder() {
      // Append sub menu.
      this._dom.bodySubMenu.empty();
    }
  }]);

  return MobileMenu;
}();

var MobileMenuClass = new MobileMenu();

// Export
exports.default = MobileMenuClass;

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _navigo = __webpack_require__(24);

var _navigo2 = _interopRequireDefault(_navigo);

var _turbolinks = __webpack_require__(25);

var _turbolinks2 = _interopRequireDefault(_turbolinks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * App Entry Point
 *
 * Copyright 2017, Author Name
 * Some information on the license.
 *
**/

(function (App, window) {
  /**
   * App
   * Constructor for App.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  App = function App() {};

  /**
   * init
   * Module init method.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  App.prototype.init = function () {
    // Start TurboLinks.
    _turbolinks2.default.start
    // Reset routes when TurboLinks loads.
    ();document.addEventListener('turbolinks:load', this.routes.bind(this));
  };

  /**
   * plugins
   * Module plugins method.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  App.prototype.plugins = {
    equalElementHeights: function equalElementHeights(el) {
      // DOM check.
      if (!el.length) return;

      // Get plugin.
      __webpack_require__(20
      // Init plugin.
      );return el.equalHeights();
    },
    modal: function modal(options) {
      // Get plugin.
      __webpack_require__(21
      // Init plugin.
      );return $(window).modal(options);
    },
    sliders: function sliders(el, options) {
      // DOM check.
      if (!el.length) return;

      // Get plugin.
      __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"script!slick-carousel\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())
      // Init plugin.
      );return el.slick(options);
    },
    validation: function validation(el, options) {
      // DOM check.
      if (!el.length) return;

      // Check captcha.
      if ($('#c_a_p_t_c_h_a', el).length) {
        // Set the captcha field value and check the box.
        $('#c_a_p_t_c_h_a', el).prop('checked', true).val('c_a_p_t_c_h_a');
      }
      // Get plugin.
      __webpack_require__(22
      // Init plugin.
      );return el.validation(options);
    }

    /**
     * routes
     * Module routes method.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
  };App.prototype.routes = function () {
    // Init Routing.
    var Router = new _navigo2.default(null, false);
    // Get global route controller.
    __webpack_require__(15).init
    // Router.
    ();Router.on({
      '/page': function page() {
        // Log it.
        window.Helpers.log('Route Loaded: page', '#E19F12'
        // Get route controller.
        );var c = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./routes/page\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())
        // Check for an init method.
        );if (typeof c.init === 'function') c.init
        // Check for an events method.
        ();if (typeof c.events === 'function') c.events();
      }
    }).resolve();
  };

  // Export
  window.App = new App();
})(window.App = window.App || function () {}, window);

// Start.
window.App.init();

/***/ }),

/***/ 48:
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ })

/******/ });
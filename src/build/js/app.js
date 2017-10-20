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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _navigo = __webpack_require__(15);

var _navigo2 = _interopRequireDefault(_navigo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
   * _settings
   * Settings for this module.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  App.prototype._settings = {
    usePjax: true

    /**
     * init
     * Module init method.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
  };App.prototype.init = function () {
    if (this._settings.usePjax) {
      // Get plugin.
      __webpack_require__(16);
      // Start Pjax.
      $(document).pjax('a', '.page-main');
      // Run routes on update.
      $('.page-main').on('pjax:end', this.routes.bind(this));
    }
    // Run routes.
    this.routes();
  };

  /**
   * plugins
   * Module plugins method.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  App.prototype.plugins = {
    modal: function modal(title, body, btn) {
      // Guard :: Check for a modal.
      if ($('.obj-modal').length) return;

      // Define modal
      var tpl = '<div class="obj-modal">\n        <div class="obj-modal__window">\n          <div class="obj-modal__window__header">' + title + '</div>\n          <div class="obj-modal__window__main">\n            <div class="page__content">' + body + '</div>\n          </div>\n          <div class="obj-modal__window__footer">\n            <button class="btn btn--common btn--medium" data-js-event="closeModal">' + btn + '</button>\n          </div>\n        </div>\n      </div>';
      // Get 10% of document height.
      var docHeight = $(window).height() / 100 * 10;
      // Add to body.
      $('body').append(tpl);
      // Set maxium height.
      $('.obj-modal__window').css({ 'maxHeight': $(window).height() - docHeight });
      // Wait and show modal.
      setTimeout(function () {
        $('.obj-modal').addClass('active');
      }, 50);
      // Click events.
      $('[data-js-event="closeModal"]').on('click', function () {
        $('.obj-modal').remove();
      });
    },
    sliders: function sliders(el, options) {
      // DOM check.
      if (!el.length) return;

      // Get plugin.
      __webpack_require__(17);
      // Init plugin.
      return el.slick(options);
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
      __webpack_require__(20);
      // Init plugin.
      return el.validation(options);
    }

    /**
     * preloaders
     * Preloader methods.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
  };App.prototype.preloaders = {
    button: function button($el, destroy) {
      // Guard :: Check element exists.
      if ($el.length) {
        if (!destroy) {
          if (!$el.hasClass('active')) {
            // Disable the button.
            $el.addClass('active btn--disabled');
            // Content.
            var content = JSON.stringify($el.html());
            // Loader.
            var loader = $('<div><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 50 50" style="display:block; enable-background:new 0 0 50 50;" xml:space="preserve"><path d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/></path></svg></div>').css({
              'fill': '#FFFFFF'
            }).hide();
            // Apply preloader.
            $el.css({
              'width': $el.outerWidth(),
              'height': $el.outerHeight(),
              'position': 'relative'
            }).html(loader).attr('data-loader-content', content).addClass('loading');
            // Add CSS.
            loader.css({
              'position': 'absolute',
              'top': '50%',
              'left': '50%',
              'margin-left': -loader.outerWidth() / 2,
              'margin-top': -loader.outerHeight() / 2
            }).show();
            // Simulate button click.
            $el.click();
          }
        } else {
          // Renable the button.
          $el.removeClass('btn--disabled');
          // Remove preloader
          $el.removeClass('loading').html(JSON.parse($el.data('loader-content'))).removeAttr('data-loader-content').css({ 'width': '', 'height': '', 'position': '' });
        }
      }
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
    window.Router = new _navigo2.default(null, false);
    // Get global route controller.
    __webpack_require__(21).init();
    // Router.
    window.Router.on({
      // '/page': () => {
      //   // Log it.
      //   window.Helpers.log('Route Loaded: page', '#E19F12')
      //   // Get route controller.
      //   let c = require('./routes/page')
      //   // Check for an init method.
      //   if (typeof c.init === 'function') c.init()
      //   // Check for an events method.
      //   if (typeof c.events === 'function') c.events()
      // }
    }).resolve();
  };

  // Export
  window.App = new App();
})(window.App = window.App || function () {}, window);

// Start.
/**
 *
 * App Entry Point
 *
 * Copyright 2017, Author Name
 * Some information on the license.
 *
**/

window.App.init();

/***/ }),
/* 15 */
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
	  this._historyAPIUpdateMethod = 'pushState';
	
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
	  var onlyURL = url,
	      split;
	  var cleanGETParam = function cleanGETParam(str) {
	    return str.split(/\?(.*)?$/)[0];
	  };
	
	  if (typeof hash === 'undefined') {
	    // To preserve BC
	    hash = '#';
	  }
	
	  if (isPushStateAvailable() && !useHash) {
	    onlyURL = cleanGETParam(url).split(hash)[0];
	  } else {
	    split = url.split(hash);
	    onlyURL = split.length > 1 ? cleanGETParam(split[1]) : cleanGETParam(split[0]);
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
	    clean: clean,
	    getOnlyURL: getOnlyURL
	  },
	  navigate: function navigate(path, absolute) {
	    var to;
	
	    path = path || '';
	    if (this._usePushState) {
	      to = (!absolute ? this._getRoot() + '/' : '') + path.replace(/^\/+/, '/');
	      to = to.replace(/([^:])(\/{2,})/g, '$1/');
	      history[this._historyAPIUpdateMethod]({}, '', to);
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
	
	    if (this._paused) return false;
	
	    if (this._lastRouteResolved && onlyURL === this._lastRouteResolved.url && GETParameters === this._lastRouteResolved.query) {
	      if (this._lastRouteResolved.hooks && this._lastRouteResolved.hooks.already) {
	        this._lastRouteResolved.hooks.already(this._lastRouteResolved.params);
	      }
	      return false;
	    }
	
	    m = match(onlyURL, this._routes);
	
	    if (m) {
	      this._callLeave();
	      this._lastRouteResolved = {
	        url: onlyURL,
	        query: GETParameters,
	        hooks: m.route.hooks,
	        params: m.params,
	        name: m.route.name
	      };
	      handler = m.route.handler;
	      manageHooks(function () {
	        manageHooks(function () {
	          m.route.route instanceof RegExp ? handler.apply(undefined, _toConsumableArray(m.match.slice(1, m.match.length))) : handler(m.params, GETParameters);
	        }, m.route.hooks, m.params, _this2._genericHooks);
	      }, this._genericHooks, m.params);
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
	    clearTimeout(this._listeningInterval);
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
	    if (status) {
	      this._historyAPIUpdateMethod = 'replaceState';
	    } else {
	      this._historyAPIUpdateMethod = 'pushState';
	    }
	  },
	  resume: function resume() {
	    this.pause(false);
	  },
	  historyAPIUpdateMethod: function historyAPIUpdateMethod(value) {
	    if (typeof value === 'undefined') return this._historyAPIUpdateMethod;
	    this._historyAPIUpdateMethod = value;
	    return value;
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
	        _this3._listeningInterval = setTimeout(_check, 200);
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
/* 16 */
/***/ (function(module, exports) {

/*!
 * Copyright 2012, Chris Wanstrath
 * Released under the MIT License
 * https://github.com/defunkt/jquery-pjax
 */

(function($){

// When called on a container with a selector, fetches the href with
// ajax into the container or with the data-pjax attribute on the link
// itself.
//
// Tries to make sure the back button and ctrl+click work the way
// you'd expect.
//
// Exported as $.fn.pjax
//
// Accepts a jQuery ajax options object that may include these
// pjax specific options:
//
//
// container - String selector for the element where to place the response body.
//      push - Whether to pushState the URL. Defaults to true (of course).
//   replace - Want to use replaceState instead? That's cool.
//
// For convenience the second parameter can be either the container or
// the options object.
//
// Returns the jQuery object
function fnPjax(selector, container, options) {
  options = optionsFor(container, options)
  return this.on('click.pjax', selector, function(event) {
    var opts = options
    if (!opts.container) {
      opts = $.extend({}, options)
      opts.container = $(this).attr('data-pjax')
    }
    handleClick(event, opts)
  })
}

// Public: pjax on click handler
//
// Exported as $.pjax.click.
//
// event   - "click" jQuery.Event
// options - pjax options
//
// Examples
//
//   $(document).on('click', 'a', $.pjax.click)
//   // is the same as
//   $(document).pjax('a')
//
// Returns nothing.
function handleClick(event, container, options) {
  options = optionsFor(container, options)

  var link = event.currentTarget
  var $link = $(link)

  if (link.tagName.toUpperCase() !== 'A')
    throw "$.fn.pjax or $.pjax.click requires an anchor element"

  // Middle click, cmd click, and ctrl click should open
  // links in a new tab as normal.
  if ( event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey )
    return

  // Ignore cross origin links
  if ( location.protocol !== link.protocol || location.hostname !== link.hostname )
    return

  // Ignore case when a hash is being tacked on the current URL
  if ( link.href.indexOf('#') > -1 && stripHash(link) == stripHash(location) )
    return

  // Ignore event with default prevented
  if (event.isDefaultPrevented())
    return

  var defaults = {
    url: link.href,
    container: $link.attr('data-pjax'),
    target: link
  }

  var opts = $.extend({}, defaults, options)
  var clickEvent = $.Event('pjax:click')
  $link.trigger(clickEvent, [opts])

  if (!clickEvent.isDefaultPrevented()) {
    pjax(opts)
    event.preventDefault()
    $link.trigger('pjax:clicked', [opts])
  }
}

// Public: pjax on form submit handler
//
// Exported as $.pjax.submit
//
// event   - "click" jQuery.Event
// options - pjax options
//
// Examples
//
//  $(document).on('submit', 'form', function(event) {
//    $.pjax.submit(event, '[data-pjax-container]')
//  })
//
// Returns nothing.
function handleSubmit(event, container, options) {
  options = optionsFor(container, options)

  var form = event.currentTarget
  var $form = $(form)

  if (form.tagName.toUpperCase() !== 'FORM')
    throw "$.pjax.submit requires a form element"

  var defaults = {
    type: ($form.attr('method') || 'GET').toUpperCase(),
    url: $form.attr('action'),
    container: $form.attr('data-pjax'),
    target: form
  }

  if (defaults.type !== 'GET' && window.FormData !== undefined) {
    defaults.data = new FormData(form)
    defaults.processData = false
    defaults.contentType = false
  } else {
    // Can't handle file uploads, exit
    if ($form.find(':file').length) {
      return
    }

    // Fallback to manually serializing the fields
    defaults.data = $form.serializeArray()
  }

  pjax($.extend({}, defaults, options))

  event.preventDefault()
}

// Loads a URL with ajax, puts the response body inside a container,
// then pushState()'s the loaded URL.
//
// Works just like $.ajax in that it accepts a jQuery ajax
// settings object (with keys like url, type, data, etc).
//
// Accepts these extra keys:
//
// container - String selector for where to stick the response body.
//      push - Whether to pushState the URL. Defaults to true (of course).
//   replace - Want to use replaceState instead? That's cool.
//
// Use it just like $.ajax:
//
//   var xhr = $.pjax({ url: this.href, container: '#main' })
//   console.log( xhr.readyState )
//
// Returns whatever $.ajax returns.
function pjax(options) {
  options = $.extend(true, {}, $.ajaxSettings, pjax.defaults, options)

  if ($.isFunction(options.url)) {
    options.url = options.url()
  }

  var hash = parseURL(options.url).hash

  var containerType = $.type(options.container)
  if (containerType !== 'string') {
    throw "expected string value for 'container' option; got " + containerType
  }
  var context = options.context = $(options.container)
  if (!context.length) {
    throw "the container selector '" + options.container + "' did not match anything"
  }

  // We want the browser to maintain two separate internal caches: one
  // for pjax'd partial page loads and one for normal page loads.
  // Without adding this secret parameter, some browsers will often
  // confuse the two.
  if (!options.data) options.data = {}
  if ($.isArray(options.data)) {
    options.data.push({name: '_pjax', value: options.container})
  } else {
    options.data._pjax = options.container
  }

  function fire(type, args, props) {
    if (!props) props = {}
    props.relatedTarget = options.target
    var event = $.Event(type, props)
    context.trigger(event, args)
    return !event.isDefaultPrevented()
  }

  var timeoutTimer

  options.beforeSend = function(xhr, settings) {
    // No timeout for non-GET requests
    // Its not safe to request the resource again with a fallback method.
    if (settings.type !== 'GET') {
      settings.timeout = 0
    }

    xhr.setRequestHeader('X-PJAX', 'true')
    xhr.setRequestHeader('X-PJAX-Container', options.container)

    if (!fire('pjax:beforeSend', [xhr, settings]))
      return false

    if (settings.timeout > 0) {
      timeoutTimer = setTimeout(function() {
        if (fire('pjax:timeout', [xhr, options]))
          xhr.abort('timeout')
      }, settings.timeout)

      // Clear timeout setting so jquerys internal timeout isn't invoked
      settings.timeout = 0
    }

    var url = parseURL(settings.url)
    if (hash) url.hash = hash
    options.requestUrl = stripInternalParams(url)
  }

  options.complete = function(xhr, textStatus) {
    if (timeoutTimer)
      clearTimeout(timeoutTimer)

    fire('pjax:complete', [xhr, textStatus, options])

    fire('pjax:end', [xhr, options])
  }

  options.error = function(xhr, textStatus, errorThrown) {
    var container = extractContainer("", xhr, options)

    var allowed = fire('pjax:error', [xhr, textStatus, errorThrown, options])
    if (options.type == 'GET' && textStatus !== 'abort' && allowed) {
      locationReplace(container.url)
    }
  }

  options.success = function(data, status, xhr) {
    var previousState = pjax.state

    // If $.pjax.defaults.version is a function, invoke it first.
    // Otherwise it can be a static string.
    var currentVersion = typeof $.pjax.defaults.version === 'function' ?
      $.pjax.defaults.version() :
      $.pjax.defaults.version

    var latestVersion = xhr.getResponseHeader('X-PJAX-Version')

    var container = extractContainer(data, xhr, options)

    var url = parseURL(container.url)
    if (hash) {
      url.hash = hash
      container.url = url.href
    }

    // If there is a layout version mismatch, hard load the new url
    if (currentVersion && latestVersion && currentVersion !== latestVersion) {
      locationReplace(container.url)
      return
    }

    // If the new response is missing a body, hard load the page
    if (!container.contents) {
      locationReplace(container.url)
      return
    }

    pjax.state = {
      id: options.id || uniqueId(),
      url: container.url,
      title: container.title,
      container: options.container,
      fragment: options.fragment,
      timeout: options.timeout
    }

    if (options.push || options.replace) {
      window.history.replaceState(pjax.state, container.title, container.url)
    }

    // Only blur the focus if the focused element is within the container.
    var blurFocus = $.contains(context, document.activeElement)

    // Clear out any focused controls before inserting new page contents.
    if (blurFocus) {
      try {
        document.activeElement.blur()
      } catch (e) { /* ignore */ }
    }

    if (container.title) document.title = container.title

    fire('pjax:beforeReplace', [container.contents, options], {
      state: pjax.state,
      previousState: previousState
    })
    context.html(container.contents)

    // FF bug: Won't autofocus fields that are inserted via JS.
    // This behavior is incorrect. So if theres no current focus, autofocus
    // the last field.
    //
    // http://www.w3.org/html/wg/drafts/html/master/forms.html
    var autofocusEl = context.find('input[autofocus], textarea[autofocus]').last()[0]
    if (autofocusEl && document.activeElement !== autofocusEl) {
      autofocusEl.focus()
    }

    executeScriptTags(container.scripts)

    var scrollTo = options.scrollTo

    // Ensure browser scrolls to the element referenced by the URL anchor
    if (hash) {
      var name = decodeURIComponent(hash.slice(1))
      var target = document.getElementById(name) || document.getElementsByName(name)[0]
      if (target) scrollTo = $(target).offset().top
    }

    if (typeof scrollTo == 'number') $(window).scrollTop(scrollTo)

    fire('pjax:success', [data, status, xhr, options])
  }


  // Initialize pjax.state for the initial page load. Assume we're
  // using the container and options of the link we're loading for the
  // back button to the initial page. This ensures good back button
  // behavior.
  if (!pjax.state) {
    pjax.state = {
      id: uniqueId(),
      url: window.location.href,
      title: document.title,
      container: options.container,
      fragment: options.fragment,
      timeout: options.timeout
    }
    window.history.replaceState(pjax.state, document.title)
  }

  // Cancel the current request if we're already pjaxing
  abortXHR(pjax.xhr)

  pjax.options = options
  var xhr = pjax.xhr = $.ajax(options)

  if (xhr.readyState > 0) {
    if (options.push && !options.replace) {
      // Cache current container element before replacing it
      cachePush(pjax.state.id, [options.container, cloneContents(context)])

      window.history.pushState(null, "", options.requestUrl)
    }

    fire('pjax:start', [xhr, options])
    fire('pjax:send', [xhr, options])
  }

  return pjax.xhr
}

// Public: Reload current page with pjax.
//
// Returns whatever $.pjax returns.
function pjaxReload(container, options) {
  var defaults = {
    url: window.location.href,
    push: false,
    replace: true,
    scrollTo: false
  }

  return pjax($.extend(defaults, optionsFor(container, options)))
}

// Internal: Hard replace current state with url.
//
// Work for around WebKit
//   https://bugs.webkit.org/show_bug.cgi?id=93506
//
// Returns nothing.
function locationReplace(url) {
  window.history.replaceState(null, "", pjax.state.url)
  window.location.replace(url)
}


var initialPop = true
var initialURL = window.location.href
var initialState = window.history.state

// Initialize $.pjax.state if possible
// Happens when reloading a page and coming forward from a different
// session history.
if (initialState && initialState.container) {
  pjax.state = initialState
}

// Non-webkit browsers don't fire an initial popstate event
if ('state' in window.history) {
  initialPop = false
}

// popstate handler takes care of the back and forward buttons
//
// You probably shouldn't use pjax on pages with other pushState
// stuff yet.
function onPjaxPopstate(event) {

  // Hitting back or forward should override any pending PJAX request.
  if (!initialPop) {
    abortXHR(pjax.xhr)
  }

  var previousState = pjax.state
  var state = event.state
  var direction

  if (state && state.container) {
    // When coming forward from a separate history session, will get an
    // initial pop with a state we are already at. Skip reloading the current
    // page.
    if (initialPop && initialURL == state.url) return

    if (previousState) {
      // If popping back to the same state, just skip.
      // Could be clicking back from hashchange rather than a pushState.
      if (previousState.id === state.id) return

      // Since state IDs always increase, we can deduce the navigation direction
      direction = previousState.id < state.id ? 'forward' : 'back'
    }

    var cache = cacheMapping[state.id] || []
    var containerSelector = cache[0] || state.container
    var container = $(containerSelector), contents = cache[1]

    if (container.length) {
      if (previousState) {
        // Cache current container before replacement and inform the
        // cache which direction the history shifted.
        cachePop(direction, previousState.id, [containerSelector, cloneContents(container)])
      }

      var popstateEvent = $.Event('pjax:popstate', {
        state: state,
        direction: direction
      })
      container.trigger(popstateEvent)

      var options = {
        id: state.id,
        url: state.url,
        container: containerSelector,
        push: false,
        fragment: state.fragment,
        timeout: state.timeout,
        scrollTo: false
      }

      if (contents) {
        container.trigger('pjax:start', [null, options])

        pjax.state = state
        if (state.title) document.title = state.title
        var beforeReplaceEvent = $.Event('pjax:beforeReplace', {
          state: state,
          previousState: previousState
        })
        container.trigger(beforeReplaceEvent, [contents, options])
        container.html(contents)

        container.trigger('pjax:end', [null, options])
      } else {
        pjax(options)
      }

      // Force reflow/relayout before the browser tries to restore the
      // scroll position.
      container[0].offsetHeight // eslint-disable-line no-unused-expressions
    } else {
      locationReplace(location.href)
    }
  }
  initialPop = false
}

// Fallback version of main pjax function for browsers that don't
// support pushState.
//
// Returns nothing since it retriggers a hard form submission.
function fallbackPjax(options) {
  var url = $.isFunction(options.url) ? options.url() : options.url,
      method = options.type ? options.type.toUpperCase() : 'GET'

  var form = $('<form>', {
    method: method === 'GET' ? 'GET' : 'POST',
    action: url,
    style: 'display:none'
  })

  if (method !== 'GET' && method !== 'POST') {
    form.append($('<input>', {
      type: 'hidden',
      name: '_method',
      value: method.toLowerCase()
    }))
  }

  var data = options.data
  if (typeof data === 'string') {
    $.each(data.split('&'), function(index, value) {
      var pair = value.split('=')
      form.append($('<input>', {type: 'hidden', name: pair[0], value: pair[1]}))
    })
  } else if ($.isArray(data)) {
    $.each(data, function(index, value) {
      form.append($('<input>', {type: 'hidden', name: value.name, value: value.value}))
    })
  } else if (typeof data === 'object') {
    var key
    for (key in data)
      form.append($('<input>', {type: 'hidden', name: key, value: data[key]}))
  }

  $(document.body).append(form)
  form.submit()
}

// Internal: Abort an XmlHttpRequest if it hasn't been completed,
// also removing its event handlers.
function abortXHR(xhr) {
  if ( xhr && xhr.readyState < 4) {
    xhr.onreadystatechange = $.noop
    xhr.abort()
  }
}

// Internal: Generate unique id for state object.
//
// Use a timestamp instead of a counter since ids should still be
// unique across page loads.
//
// Returns Number.
function uniqueId() {
  return (new Date).getTime()
}

function cloneContents(container) {
  var cloned = container.clone()
  // Unmark script tags as already being eval'd so they can get executed again
  // when restored from cache. HAXX: Uses jQuery internal method.
  cloned.find('script').each(function(){
    if (!this.src) $._data(this, 'globalEval', false)
  })
  return cloned.contents()
}

// Internal: Strip internal query params from parsed URL.
//
// Returns sanitized url.href String.
function stripInternalParams(url) {
  url.search = url.search.replace(/([?&])(_pjax|_)=[^&]*/g, '').replace(/^&/, '')
  return url.href.replace(/\?($|#)/, '$1')
}

// Internal: Parse URL components and returns a Locationish object.
//
// url - String URL
//
// Returns HTMLAnchorElement that acts like Location.
function parseURL(url) {
  var a = document.createElement('a')
  a.href = url
  return a
}

// Internal: Return the `href` component of given URL object with the hash
// portion removed.
//
// location - Location or HTMLAnchorElement
//
// Returns String
function stripHash(location) {
  return location.href.replace(/#.*/, '')
}

// Internal: Build options Object for arguments.
//
// For convenience the first parameter can be either the container or
// the options object.
//
// Examples
//
//   optionsFor('#container')
//   // => {container: '#container'}
//
//   optionsFor('#container', {push: true})
//   // => {container: '#container', push: true}
//
//   optionsFor({container: '#container', push: true})
//   // => {container: '#container', push: true}
//
// Returns options Object.
function optionsFor(container, options) {
  if (container && options) {
    options = $.extend({}, options)
    options.container = container
    return options
  } else if ($.isPlainObject(container)) {
    return container
  } else {
    return {container: container}
  }
}

// Internal: Filter and find all elements matching the selector.
//
// Where $.fn.find only matches descendants, findAll will test all the
// top level elements in the jQuery object as well.
//
// elems    - jQuery object of Elements
// selector - String selector to match
//
// Returns a jQuery object.
function findAll(elems, selector) {
  return elems.filter(selector).add(elems.find(selector))
}

function parseHTML(html) {
  return $.parseHTML(html, document, true)
}

// Internal: Extracts container and metadata from response.
//
// 1. Extracts X-PJAX-URL header if set
// 2. Extracts inline <title> tags
// 3. Builds response Element and extracts fragment if set
//
// data    - String response data
// xhr     - XHR response
// options - pjax options Object
//
// Returns an Object with url, title, and contents keys.
function extractContainer(data, xhr, options) {
  var obj = {}, fullDocument = /<html/i.test(data)

  // Prefer X-PJAX-URL header if it was set, otherwise fallback to
  // using the original requested url.
  var serverUrl = xhr.getResponseHeader('X-PJAX-URL')
  obj.url = serverUrl ? stripInternalParams(parseURL(serverUrl)) : options.requestUrl

  var $head, $body
  // Attempt to parse response html into elements
  if (fullDocument) {
    $body = $(parseHTML(data.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]))
    var head = data.match(/<head[^>]*>([\s\S.]*)<\/head>/i)
    $head = head != null ? $(parseHTML(head[0])) : $body
  } else {
    $head = $body = $(parseHTML(data))
  }

  // If response data is empty, return fast
  if ($body.length === 0)
    return obj

  // If there's a <title> tag in the header, use it as
  // the page's title.
  obj.title = findAll($head, 'title').last().text()

  if (options.fragment) {
    var $fragment = $body
    // If they specified a fragment, look for it in the response
    // and pull it out.
    if (options.fragment !== 'body') {
      $fragment = findAll($fragment, options.fragment).first()
    }

    if ($fragment.length) {
      obj.contents = options.fragment === 'body' ? $fragment : $fragment.contents()

      // If there's no title, look for data-title and title attributes
      // on the fragment
      if (!obj.title)
        obj.title = $fragment.attr('title') || $fragment.data('title')
    }

  } else if (!fullDocument) {
    obj.contents = $body
  }

  // Clean up any <title> tags
  if (obj.contents) {
    // Remove any parent title elements
    obj.contents = obj.contents.not(function() { return $(this).is('title') })

    // Then scrub any titles from their descendants
    obj.contents.find('title').remove()

    // Gather all script[src] elements
    obj.scripts = findAll(obj.contents, 'script[src]').remove()
    obj.contents = obj.contents.not(obj.scripts)
  }

  // Trim any whitespace off the title
  if (obj.title) obj.title = $.trim(obj.title)

  return obj
}

// Load an execute scripts using standard script request.
//
// Avoids jQuery's traditional $.getScript which does a XHR request and
// globalEval.
//
// scripts - jQuery object of script Elements
//
// Returns nothing.
function executeScriptTags(scripts) {
  if (!scripts) return

  var existingScripts = $('script[src]')

  scripts.each(function() {
    var src = this.src
    var matchedScripts = existingScripts.filter(function() {
      return this.src === src
    })
    if (matchedScripts.length) return

    var script = document.createElement('script')
    var type = $(this).attr('type')
    if (type) script.type = type
    script.src = $(this).attr('src')
    document.head.appendChild(script)
  })
}

// Internal: History DOM caching class.
var cacheMapping      = {}
var cacheForwardStack = []
var cacheBackStack    = []

// Push previous state id and container contents into the history
// cache. Should be called in conjunction with `pushState` to save the
// previous container contents.
//
// id    - State ID Number
// value - DOM Element to cache
//
// Returns nothing.
function cachePush(id, value) {
  cacheMapping[id] = value
  cacheBackStack.push(id)

  // Remove all entries in forward history stack after pushing a new page.
  trimCacheStack(cacheForwardStack, 0)

  // Trim back history stack to max cache length.
  trimCacheStack(cacheBackStack, pjax.defaults.maxCacheLength)
}

// Shifts cache from directional history cache. Should be
// called on `popstate` with the previous state id and container
// contents.
//
// direction - "forward" or "back" String
// id        - State ID Number
// value     - DOM Element to cache
//
// Returns nothing.
function cachePop(direction, id, value) {
  var pushStack, popStack
  cacheMapping[id] = value

  if (direction === 'forward') {
    pushStack = cacheBackStack
    popStack  = cacheForwardStack
  } else {
    pushStack = cacheForwardStack
    popStack  = cacheBackStack
  }

  pushStack.push(id)
  id = popStack.pop()
  if (id) delete cacheMapping[id]

  // Trim whichever stack we just pushed to to max cache length.
  trimCacheStack(pushStack, pjax.defaults.maxCacheLength)
}

// Trim a cache stack (either cacheBackStack or cacheForwardStack) to be no
// longer than the specified length, deleting cached DOM elements as necessary.
//
// stack  - Array of state IDs
// length - Maximum length to trim to
//
// Returns nothing.
function trimCacheStack(stack, length) {
  while (stack.length > length)
    delete cacheMapping[stack.shift()]
}

// Public: Find version identifier for the initial page load.
//
// Returns String version or undefined.
function findVersion() {
  return $('meta').filter(function() {
    var name = $(this).attr('http-equiv')
    return name && name.toUpperCase() === 'X-PJAX-VERSION'
  }).attr('content')
}

// Install pjax functions on $.pjax to enable pushState behavior.
//
// Does nothing if already enabled.
//
// Examples
//
//     $.pjax.enable()
//
// Returns nothing.
function enable() {
  $.fn.pjax = fnPjax
  $.pjax = pjax
  $.pjax.enable = $.noop
  $.pjax.disable = disable
  $.pjax.click = handleClick
  $.pjax.submit = handleSubmit
  $.pjax.reload = pjaxReload
  $.pjax.defaults = {
    timeout: 650,
    push: true,
    replace: false,
    type: 'GET',
    dataType: 'html',
    scrollTo: 0,
    maxCacheLength: 20,
    version: findVersion
  }
  $(window).on('popstate.pjax', onPjaxPopstate)
}

// Disable pushState behavior.
//
// This is the case when a browser doesn't support pushState. It is
// sometimes useful to disable pushState for debugging on a modern
// browser.
//
// Examples
//
//     $.pjax.disable()
//
// Returns nothing.
function disable() {
  $.fn.pjax = function() { return this }
  $.pjax = fallbackPjax
  $.pjax.enable = enable
  $.pjax.disable = $.noop
  $.pjax.click = $.noop
  $.pjax.submit = $.noop
  $.pjax.reload = function() { window.location.reload() }

  $(window).off('popstate.pjax', onPjaxPopstate)
}


// Add the state property to jQuery's event object so we can use it in
// $(window).bind('popstate')
if ($.event.props && $.inArray('state', $.event.props) < 0) {
  $.event.props.push('state')
} else if (!('state' in $.Event.prototype)) {
  $.event.addProp('state')
}

// Is pjax supported by this browser?
$.support.pjax =
  window.history && window.history.pushState && window.history.replaceState &&
  // pushState isn't reliable on iOS until 5.
  !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/)

if ($.support.pjax) {
  enable()
} else {
  disable()
}

})(jQuery)


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(18)(__webpack_require__(19))

/***/ }),
/* 18 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(src) {
	function log(error) {
		(typeof console !== "undefined")
		&& (console.error || console.log)("[Script Loader]", error);
	}

	// Check for IE =< 8
	function isIE() {
		return typeof attachEvent !== "undefined" && typeof addEventListener === "undefined";
	}

	try {
		if (typeof execScript !== "undefined" && isIE()) {
			execScript(src);
		} else if (typeof eval !== "undefined") {
			eval.call(null, src);
		} else {
			log("EvalError: No eval function available");
		}
	} catch (error) {
		log(error);
	}
}


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = "/*\n     _ _      _       _\n ___| (_) ___| | __  (_)___\n/ __| | |/ __| |/ /  | / __|\n\\__ \\ | | (__|   < _ | \\__ \\\n|___/_|_|\\___|_|\\_(_)/ |___/\n                   |__/\n\n Version: 1.8.1\n  Author: Ken Wheeler\n Website: http://kenwheeler.github.io\n    Docs: http://kenwheeler.github.io/slick\n    Repo: http://github.com/kenwheeler/slick\n  Issues: http://github.com/kenwheeler/slick/issues\n\n */\n/* global window, document, define, jQuery, setInterval, clearInterval */\n;(function(factory) {\n    'use strict';\n    if (typeof define === 'function' && define.amd) {\n        define(['jquery'], factory);\n    } else if (typeof exports !== 'undefined') {\n        module.exports = factory(require('jquery'));\n    } else {\n        factory(jQuery);\n    }\n\n}(function($) {\n    'use strict';\n    var Slick = window.Slick || {};\n\n    Slick = (function() {\n\n        var instanceUid = 0;\n\n        function Slick(element, settings) {\n\n            var _ = this, dataSettings;\n\n            _.defaults = {\n                accessibility: true,\n                adaptiveHeight: false,\n                appendArrows: $(element),\n                appendDots: $(element),\n                arrows: true,\n                asNavFor: null,\n                prevArrow: '<button class=\"slick-prev\" aria-label=\"Previous\" type=\"button\">Previous</button>',\n                nextArrow: '<button class=\"slick-next\" aria-label=\"Next\" type=\"button\">Next</button>',\n                autoplay: false,\n                autoplaySpeed: 3000,\n                centerMode: false,\n                centerPadding: '50px',\n                cssEase: 'ease',\n                customPaging: function(slider, i) {\n                    return $('<button type=\"button\" />').text(i + 1);\n                },\n                dots: false,\n                dotsClass: 'slick-dots',\n                draggable: true,\n                easing: 'linear',\n                edgeFriction: 0.35,\n                fade: false,\n                focusOnSelect: false,\n                focusOnChange: false,\n                infinite: true,\n                initialSlide: 0,\n                lazyLoad: 'ondemand',\n                mobileFirst: false,\n                pauseOnHover: true,\n                pauseOnFocus: true,\n                pauseOnDotsHover: false,\n                respondTo: 'window',\n                responsive: null,\n                rows: 1,\n                rtl: false,\n                slide: '',\n                slidesPerRow: 1,\n                slidesToShow: 1,\n                slidesToScroll: 1,\n                speed: 500,\n                swipe: true,\n                swipeToSlide: false,\n                touchMove: true,\n                touchThreshold: 5,\n                useCSS: true,\n                useTransform: true,\n                variableWidth: false,\n                vertical: false,\n                verticalSwiping: false,\n                waitForAnimate: true,\n                zIndex: 1000\n            };\n\n            _.initials = {\n                animating: false,\n                dragging: false,\n                autoPlayTimer: null,\n                currentDirection: 0,\n                currentLeft: null,\n                currentSlide: 0,\n                direction: 1,\n                $dots: null,\n                listWidth: null,\n                listHeight: null,\n                loadIndex: 0,\n                $nextArrow: null,\n                $prevArrow: null,\n                scrolling: false,\n                slideCount: null,\n                slideWidth: null,\n                $slideTrack: null,\n                $slides: null,\n                sliding: false,\n                slideOffset: 0,\n                swipeLeft: null,\n                swiping: false,\n                $list: null,\n                touchObject: {},\n                transformsEnabled: false,\n                unslicked: false\n            };\n\n            $.extend(_, _.initials);\n\n            _.activeBreakpoint = null;\n            _.animType = null;\n            _.animProp = null;\n            _.breakpoints = [];\n            _.breakpointSettings = [];\n            _.cssTransitions = false;\n            _.focussed = false;\n            _.interrupted = false;\n            _.hidden = 'hidden';\n            _.paused = true;\n            _.positionProp = null;\n            _.respondTo = null;\n            _.rowCount = 1;\n            _.shouldClick = true;\n            _.$slider = $(element);\n            _.$slidesCache = null;\n            _.transformType = null;\n            _.transitionType = null;\n            _.visibilityChange = 'visibilitychange';\n            _.windowWidth = 0;\n            _.windowTimer = null;\n\n            dataSettings = $(element).data('slick') || {};\n\n            _.options = $.extend({}, _.defaults, settings, dataSettings);\n\n            _.currentSlide = _.options.initialSlide;\n\n            _.originalSettings = _.options;\n\n            if (typeof document.mozHidden !== 'undefined') {\n                _.hidden = 'mozHidden';\n                _.visibilityChange = 'mozvisibilitychange';\n            } else if (typeof document.webkitHidden !== 'undefined') {\n                _.hidden = 'webkitHidden';\n                _.visibilityChange = 'webkitvisibilitychange';\n            }\n\n            _.autoPlay = $.proxy(_.autoPlay, _);\n            _.autoPlayClear = $.proxy(_.autoPlayClear, _);\n            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);\n            _.changeSlide = $.proxy(_.changeSlide, _);\n            _.clickHandler = $.proxy(_.clickHandler, _);\n            _.selectHandler = $.proxy(_.selectHandler, _);\n            _.setPosition = $.proxy(_.setPosition, _);\n            _.swipeHandler = $.proxy(_.swipeHandler, _);\n            _.dragHandler = $.proxy(_.dragHandler, _);\n            _.keyHandler = $.proxy(_.keyHandler, _);\n\n            _.instanceUid = instanceUid++;\n\n            // A simple way to check for HTML strings\n            // Strict HTML recognition (must start with <)\n            // Extracted from jQuery v1.11 source\n            _.htmlExpr = /^(?:\\s*(<[\\w\\W]+>)[^>]*)$/;\n\n\n            _.registerBreakpoints();\n            _.init(true);\n\n        }\n\n        return Slick;\n\n    }());\n\n    Slick.prototype.activateADA = function() {\n        var _ = this;\n\n        _.$slideTrack.find('.slick-active').attr({\n            'aria-hidden': 'false'\n        }).find('a, input, button, select').attr({\n            'tabindex': '0'\n        });\n\n    };\n\n    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {\n\n        var _ = this;\n\n        if (typeof(index) === 'boolean') {\n            addBefore = index;\n            index = null;\n        } else if (index < 0 || (index >= _.slideCount)) {\n            return false;\n        }\n\n        _.unload();\n\n        if (typeof(index) === 'number') {\n            if (index === 0 && _.$slides.length === 0) {\n                $(markup).appendTo(_.$slideTrack);\n            } else if (addBefore) {\n                $(markup).insertBefore(_.$slides.eq(index));\n            } else {\n                $(markup).insertAfter(_.$slides.eq(index));\n            }\n        } else {\n            if (addBefore === true) {\n                $(markup).prependTo(_.$slideTrack);\n            } else {\n                $(markup).appendTo(_.$slideTrack);\n            }\n        }\n\n        _.$slides = _.$slideTrack.children(this.options.slide);\n\n        _.$slideTrack.children(this.options.slide).detach();\n\n        _.$slideTrack.append(_.$slides);\n\n        _.$slides.each(function(index, element) {\n            $(element).attr('data-slick-index', index);\n        });\n\n        _.$slidesCache = _.$slides;\n\n        _.reinit();\n\n    };\n\n    Slick.prototype.animateHeight = function() {\n        var _ = this;\n        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {\n            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);\n            _.$list.animate({\n                height: targetHeight\n            }, _.options.speed);\n        }\n    };\n\n    Slick.prototype.animateSlide = function(targetLeft, callback) {\n\n        var animProps = {},\n            _ = this;\n\n        _.animateHeight();\n\n        if (_.options.rtl === true && _.options.vertical === false) {\n            targetLeft = -targetLeft;\n        }\n        if (_.transformsEnabled === false) {\n            if (_.options.vertical === false) {\n                _.$slideTrack.animate({\n                    left: targetLeft\n                }, _.options.speed, _.options.easing, callback);\n            } else {\n                _.$slideTrack.animate({\n                    top: targetLeft\n                }, _.options.speed, _.options.easing, callback);\n            }\n\n        } else {\n\n            if (_.cssTransitions === false) {\n                if (_.options.rtl === true) {\n                    _.currentLeft = -(_.currentLeft);\n                }\n                $({\n                    animStart: _.currentLeft\n                }).animate({\n                    animStart: targetLeft\n                }, {\n                    duration: _.options.speed,\n                    easing: _.options.easing,\n                    step: function(now) {\n                        now = Math.ceil(now);\n                        if (_.options.vertical === false) {\n                            animProps[_.animType] = 'translate(' +\n                                now + 'px, 0px)';\n                            _.$slideTrack.css(animProps);\n                        } else {\n                            animProps[_.animType] = 'translate(0px,' +\n                                now + 'px)';\n                            _.$slideTrack.css(animProps);\n                        }\n                    },\n                    complete: function() {\n                        if (callback) {\n                            callback.call();\n                        }\n                    }\n                });\n\n            } else {\n\n                _.applyTransition();\n                targetLeft = Math.ceil(targetLeft);\n\n                if (_.options.vertical === false) {\n                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';\n                } else {\n                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';\n                }\n                _.$slideTrack.css(animProps);\n\n                if (callback) {\n                    setTimeout(function() {\n\n                        _.disableTransition();\n\n                        callback.call();\n                    }, _.options.speed);\n                }\n\n            }\n\n        }\n\n    };\n\n    Slick.prototype.getNavTarget = function() {\n\n        var _ = this,\n            asNavFor = _.options.asNavFor;\n\n        if ( asNavFor && asNavFor !== null ) {\n            asNavFor = $(asNavFor).not(_.$slider);\n        }\n\n        return asNavFor;\n\n    };\n\n    Slick.prototype.asNavFor = function(index) {\n\n        var _ = this,\n            asNavFor = _.getNavTarget();\n\n        if ( asNavFor !== null && typeof asNavFor === 'object' ) {\n            asNavFor.each(function() {\n                var target = $(this).slick('getSlick');\n                if(!target.unslicked) {\n                    target.slideHandler(index, true);\n                }\n            });\n        }\n\n    };\n\n    Slick.prototype.applyTransition = function(slide) {\n\n        var _ = this,\n            transition = {};\n\n        if (_.options.fade === false) {\n            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;\n        } else {\n            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;\n        }\n\n        if (_.options.fade === false) {\n            _.$slideTrack.css(transition);\n        } else {\n            _.$slides.eq(slide).css(transition);\n        }\n\n    };\n\n    Slick.prototype.autoPlay = function() {\n\n        var _ = this;\n\n        _.autoPlayClear();\n\n        if ( _.slideCount > _.options.slidesToShow ) {\n            _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );\n        }\n\n    };\n\n    Slick.prototype.autoPlayClear = function() {\n\n        var _ = this;\n\n        if (_.autoPlayTimer) {\n            clearInterval(_.autoPlayTimer);\n        }\n\n    };\n\n    Slick.prototype.autoPlayIterator = function() {\n\n        var _ = this,\n            slideTo = _.currentSlide + _.options.slidesToScroll;\n\n        if ( !_.paused && !_.interrupted && !_.focussed ) {\n\n            if ( _.options.infinite === false ) {\n\n                if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {\n                    _.direction = 0;\n                }\n\n                else if ( _.direction === 0 ) {\n\n                    slideTo = _.currentSlide - _.options.slidesToScroll;\n\n                    if ( _.currentSlide - 1 === 0 ) {\n                        _.direction = 1;\n                    }\n\n                }\n\n            }\n\n            _.slideHandler( slideTo );\n\n        }\n\n    };\n\n    Slick.prototype.buildArrows = function() {\n\n        var _ = this;\n\n        if (_.options.arrows === true ) {\n\n            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');\n            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');\n\n            if( _.slideCount > _.options.slidesToShow ) {\n\n                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');\n                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');\n\n                if (_.htmlExpr.test(_.options.prevArrow)) {\n                    _.$prevArrow.prependTo(_.options.appendArrows);\n                }\n\n                if (_.htmlExpr.test(_.options.nextArrow)) {\n                    _.$nextArrow.appendTo(_.options.appendArrows);\n                }\n\n                if (_.options.infinite !== true) {\n                    _.$prevArrow\n                        .addClass('slick-disabled')\n                        .attr('aria-disabled', 'true');\n                }\n\n            } else {\n\n                _.$prevArrow.add( _.$nextArrow )\n\n                    .addClass('slick-hidden')\n                    .attr({\n                        'aria-disabled': 'true',\n                        'tabindex': '-1'\n                    });\n\n            }\n\n        }\n\n    };\n\n    Slick.prototype.buildDots = function() {\n\n        var _ = this,\n            i, dot;\n\n        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {\n\n            _.$slider.addClass('slick-dotted');\n\n            dot = $('<ul />').addClass(_.options.dotsClass);\n\n            for (i = 0; i <= _.getDotCount(); i += 1) {\n                dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));\n            }\n\n            _.$dots = dot.appendTo(_.options.appendDots);\n\n            _.$dots.find('li').first().addClass('slick-active');\n\n        }\n\n    };\n\n    Slick.prototype.buildOut = function() {\n\n        var _ = this;\n\n        _.$slides =\n            _.$slider\n                .children( _.options.slide + ':not(.slick-cloned)')\n                .addClass('slick-slide');\n\n        _.slideCount = _.$slides.length;\n\n        _.$slides.each(function(index, element) {\n            $(element)\n                .attr('data-slick-index', index)\n                .data('originalStyling', $(element).attr('style') || '');\n        });\n\n        _.$slider.addClass('slick-slider');\n\n        _.$slideTrack = (_.slideCount === 0) ?\n            $('<div class=\"slick-track\"/>').appendTo(_.$slider) :\n            _.$slides.wrapAll('<div class=\"slick-track\"/>').parent();\n\n        _.$list = _.$slideTrack.wrap(\n            '<div class=\"slick-list\"/>').parent();\n        _.$slideTrack.css('opacity', 0);\n\n        if (_.options.centerMode === true || _.options.swipeToSlide === true) {\n            _.options.slidesToScroll = 1;\n        }\n\n        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');\n\n        _.setupInfinite();\n\n        _.buildArrows();\n\n        _.buildDots();\n\n        _.updateDots();\n\n\n        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);\n\n        if (_.options.draggable === true) {\n            _.$list.addClass('draggable');\n        }\n\n    };\n\n    Slick.prototype.buildRows = function() {\n\n        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;\n\n        newSlides = document.createDocumentFragment();\n        originalSlides = _.$slider.children();\n\n        if(_.options.rows > 0) {\n\n            slidesPerSection = _.options.slidesPerRow * _.options.rows;\n            numOfSlides = Math.ceil(\n                originalSlides.length / slidesPerSection\n            );\n\n            for(a = 0; a < numOfSlides; a++){\n                var slide = document.createElement('div');\n                for(b = 0; b < _.options.rows; b++) {\n                    var row = document.createElement('div');\n                    for(c = 0; c < _.options.slidesPerRow; c++) {\n                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));\n                        if (originalSlides.get(target)) {\n                            row.appendChild(originalSlides.get(target));\n                        }\n                    }\n                    slide.appendChild(row);\n                }\n                newSlides.appendChild(slide);\n            }\n\n            _.$slider.empty().append(newSlides);\n            _.$slider.children().children().children()\n                .css({\n                    'width':(100 / _.options.slidesPerRow) + '%',\n                    'display': 'inline-block'\n                });\n\n        }\n\n    };\n\n    Slick.prototype.checkResponsive = function(initial, forceUpdate) {\n\n        var _ = this,\n            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;\n        var sliderWidth = _.$slider.width();\n        var windowWidth = window.innerWidth || $(window).width();\n\n        if (_.respondTo === 'window') {\n            respondToWidth = windowWidth;\n        } else if (_.respondTo === 'slider') {\n            respondToWidth = sliderWidth;\n        } else if (_.respondTo === 'min') {\n            respondToWidth = Math.min(windowWidth, sliderWidth);\n        }\n\n        if ( _.options.responsive &&\n            _.options.responsive.length &&\n            _.options.responsive !== null) {\n\n            targetBreakpoint = null;\n\n            for (breakpoint in _.breakpoints) {\n                if (_.breakpoints.hasOwnProperty(breakpoint)) {\n                    if (_.originalSettings.mobileFirst === false) {\n                        if (respondToWidth < _.breakpoints[breakpoint]) {\n                            targetBreakpoint = _.breakpoints[breakpoint];\n                        }\n                    } else {\n                        if (respondToWidth > _.breakpoints[breakpoint]) {\n                            targetBreakpoint = _.breakpoints[breakpoint];\n                        }\n                    }\n                }\n            }\n\n            if (targetBreakpoint !== null) {\n                if (_.activeBreakpoint !== null) {\n                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {\n                        _.activeBreakpoint =\n                            targetBreakpoint;\n                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {\n                            _.unslick(targetBreakpoint);\n                        } else {\n                            _.options = $.extend({}, _.originalSettings,\n                                _.breakpointSettings[\n                                    targetBreakpoint]);\n                            if (initial === true) {\n                                _.currentSlide = _.options.initialSlide;\n                            }\n                            _.refresh(initial);\n                        }\n                        triggerBreakpoint = targetBreakpoint;\n                    }\n                } else {\n                    _.activeBreakpoint = targetBreakpoint;\n                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {\n                        _.unslick(targetBreakpoint);\n                    } else {\n                        _.options = $.extend({}, _.originalSettings,\n                            _.breakpointSettings[\n                                targetBreakpoint]);\n                        if (initial === true) {\n                            _.currentSlide = _.options.initialSlide;\n                        }\n                        _.refresh(initial);\n                    }\n                    triggerBreakpoint = targetBreakpoint;\n                }\n            } else {\n                if (_.activeBreakpoint !== null) {\n                    _.activeBreakpoint = null;\n                    _.options = _.originalSettings;\n                    if (initial === true) {\n                        _.currentSlide = _.options.initialSlide;\n                    }\n                    _.refresh(initial);\n                    triggerBreakpoint = targetBreakpoint;\n                }\n            }\n\n            // only trigger breakpoints during an actual break. not on initialize.\n            if( !initial && triggerBreakpoint !== false ) {\n                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);\n            }\n        }\n\n    };\n\n    Slick.prototype.changeSlide = function(event, dontAnimate) {\n\n        var _ = this,\n            $target = $(event.currentTarget),\n            indexOffset, slideOffset, unevenOffset;\n\n        // If target is a link, prevent default action.\n        if($target.is('a')) {\n            event.preventDefault();\n        }\n\n        // If target is not the <li> element (ie: a child), find the <li>.\n        if(!$target.is('li')) {\n            $target = $target.closest('li');\n        }\n\n        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);\n        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;\n\n        switch (event.data.message) {\n\n            case 'previous':\n                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;\n                if (_.slideCount > _.options.slidesToShow) {\n                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);\n                }\n                break;\n\n            case 'next':\n                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;\n                if (_.slideCount > _.options.slidesToShow) {\n                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);\n                }\n                break;\n\n            case 'index':\n                var index = event.data.index === 0 ? 0 :\n                    event.data.index || $target.index() * _.options.slidesToScroll;\n\n                _.slideHandler(_.checkNavigable(index), false, dontAnimate);\n                $target.children().trigger('focus');\n                break;\n\n            default:\n                return;\n        }\n\n    };\n\n    Slick.prototype.checkNavigable = function(index) {\n\n        var _ = this,\n            navigables, prevNavigable;\n\n        navigables = _.getNavigableIndexes();\n        prevNavigable = 0;\n        if (index > navigables[navigables.length - 1]) {\n            index = navigables[navigables.length - 1];\n        } else {\n            for (var n in navigables) {\n                if (index < navigables[n]) {\n                    index = prevNavigable;\n                    break;\n                }\n                prevNavigable = navigables[n];\n            }\n        }\n\n        return index;\n    };\n\n    Slick.prototype.cleanUpEvents = function() {\n\n        var _ = this;\n\n        if (_.options.dots && _.$dots !== null) {\n\n            $('li', _.$dots)\n                .off('click.slick', _.changeSlide)\n                .off('mouseenter.slick', $.proxy(_.interrupt, _, true))\n                .off('mouseleave.slick', $.proxy(_.interrupt, _, false));\n\n            if (_.options.accessibility === true) {\n                _.$dots.off('keydown.slick', _.keyHandler);\n            }\n        }\n\n        _.$slider.off('focus.slick blur.slick');\n\n        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {\n            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);\n            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);\n\n            if (_.options.accessibility === true) {\n                _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);\n                _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);\n            }\n        }\n\n        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);\n        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);\n        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);\n        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);\n\n        _.$list.off('click.slick', _.clickHandler);\n\n        $(document).off(_.visibilityChange, _.visibility);\n\n        _.cleanUpSlideEvents();\n\n        if (_.options.accessibility === true) {\n            _.$list.off('keydown.slick', _.keyHandler);\n        }\n\n        if (_.options.focusOnSelect === true) {\n            $(_.$slideTrack).children().off('click.slick', _.selectHandler);\n        }\n\n        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);\n\n        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);\n\n        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);\n\n        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);\n\n    };\n\n    Slick.prototype.cleanUpSlideEvents = function() {\n\n        var _ = this;\n\n        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));\n        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));\n\n    };\n\n    Slick.prototype.cleanUpRows = function() {\n\n        var _ = this, originalSlides;\n\n        if(_.options.rows > 0) {\n            originalSlides = _.$slides.children().children();\n            originalSlides.removeAttr('style');\n            _.$slider.empty().append(originalSlides);\n        }\n\n    };\n\n    Slick.prototype.clickHandler = function(event) {\n\n        var _ = this;\n\n        if (_.shouldClick === false) {\n            event.stopImmediatePropagation();\n            event.stopPropagation();\n            event.preventDefault();\n        }\n\n    };\n\n    Slick.prototype.destroy = function(refresh) {\n\n        var _ = this;\n\n        _.autoPlayClear();\n\n        _.touchObject = {};\n\n        _.cleanUpEvents();\n\n        $('.slick-cloned', _.$slider).detach();\n\n        if (_.$dots) {\n            _.$dots.remove();\n        }\n\n        if ( _.$prevArrow && _.$prevArrow.length ) {\n\n            _.$prevArrow\n                .removeClass('slick-disabled slick-arrow slick-hidden')\n                .removeAttr('aria-hidden aria-disabled tabindex')\n                .css('display','');\n\n            if ( _.htmlExpr.test( _.options.prevArrow )) {\n                _.$prevArrow.remove();\n            }\n        }\n\n        if ( _.$nextArrow && _.$nextArrow.length ) {\n\n            _.$nextArrow\n                .removeClass('slick-disabled slick-arrow slick-hidden')\n                .removeAttr('aria-hidden aria-disabled tabindex')\n                .css('display','');\n\n            if ( _.htmlExpr.test( _.options.nextArrow )) {\n                _.$nextArrow.remove();\n            }\n        }\n\n\n        if (_.$slides) {\n\n            _.$slides\n                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')\n                .removeAttr('aria-hidden')\n                .removeAttr('data-slick-index')\n                .each(function(){\n                    $(this).attr('style', $(this).data('originalStyling'));\n                });\n\n            _.$slideTrack.children(this.options.slide).detach();\n\n            _.$slideTrack.detach();\n\n            _.$list.detach();\n\n            _.$slider.append(_.$slides);\n        }\n\n        _.cleanUpRows();\n\n        _.$slider.removeClass('slick-slider');\n        _.$slider.removeClass('slick-initialized');\n        _.$slider.removeClass('slick-dotted');\n\n        _.unslicked = true;\n\n        if(!refresh) {\n            _.$slider.trigger('destroy', [_]);\n        }\n\n    };\n\n    Slick.prototype.disableTransition = function(slide) {\n\n        var _ = this,\n            transition = {};\n\n        transition[_.transitionType] = '';\n\n        if (_.options.fade === false) {\n            _.$slideTrack.css(transition);\n        } else {\n            _.$slides.eq(slide).css(transition);\n        }\n\n    };\n\n    Slick.prototype.fadeSlide = function(slideIndex, callback) {\n\n        var _ = this;\n\n        if (_.cssTransitions === false) {\n\n            _.$slides.eq(slideIndex).css({\n                zIndex: _.options.zIndex\n            });\n\n            _.$slides.eq(slideIndex).animate({\n                opacity: 1\n            }, _.options.speed, _.options.easing, callback);\n\n        } else {\n\n            _.applyTransition(slideIndex);\n\n            _.$slides.eq(slideIndex).css({\n                opacity: 1,\n                zIndex: _.options.zIndex\n            });\n\n            if (callback) {\n                setTimeout(function() {\n\n                    _.disableTransition(slideIndex);\n\n                    callback.call();\n                }, _.options.speed);\n            }\n\n        }\n\n    };\n\n    Slick.prototype.fadeSlideOut = function(slideIndex) {\n\n        var _ = this;\n\n        if (_.cssTransitions === false) {\n\n            _.$slides.eq(slideIndex).animate({\n                opacity: 0,\n                zIndex: _.options.zIndex - 2\n            }, _.options.speed, _.options.easing);\n\n        } else {\n\n            _.applyTransition(slideIndex);\n\n            _.$slides.eq(slideIndex).css({\n                opacity: 0,\n                zIndex: _.options.zIndex - 2\n            });\n\n        }\n\n    };\n\n    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {\n\n        var _ = this;\n\n        if (filter !== null) {\n\n            _.$slidesCache = _.$slides;\n\n            _.unload();\n\n            _.$slideTrack.children(this.options.slide).detach();\n\n            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);\n\n            _.reinit();\n\n        }\n\n    };\n\n    Slick.prototype.focusHandler = function() {\n\n        var _ = this;\n\n        _.$slider\n            .off('focus.slick blur.slick')\n            .on('focus.slick blur.slick', '*', function(event) {\n\n            event.stopImmediatePropagation();\n            var $sf = $(this);\n\n            setTimeout(function() {\n\n                if( _.options.pauseOnFocus ) {\n                    _.focussed = $sf.is(':focus');\n                    _.autoPlay();\n                }\n\n            }, 0);\n\n        });\n    };\n\n    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {\n\n        var _ = this;\n        return _.currentSlide;\n\n    };\n\n    Slick.prototype.getDotCount = function() {\n\n        var _ = this;\n\n        var breakPoint = 0;\n        var counter = 0;\n        var pagerQty = 0;\n\n        if (_.options.infinite === true) {\n            if (_.slideCount <= _.options.slidesToShow) {\n                 ++pagerQty;\n            } else {\n                while (breakPoint < _.slideCount) {\n                    ++pagerQty;\n                    breakPoint = counter + _.options.slidesToScroll;\n                    counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;\n                }\n            }\n        } else if (_.options.centerMode === true) {\n            pagerQty = _.slideCount;\n        } else if(!_.options.asNavFor) {\n            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);\n        }else {\n            while (breakPoint < _.slideCount) {\n                ++pagerQty;\n                breakPoint = counter + _.options.slidesToScroll;\n                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;\n            }\n        }\n\n        return pagerQty - 1;\n\n    };\n\n    Slick.prototype.getLeft = function(slideIndex) {\n\n        var _ = this,\n            targetLeft,\n            verticalHeight,\n            verticalOffset = 0,\n            targetSlide,\n            coef;\n\n        _.slideOffset = 0;\n        verticalHeight = _.$slides.first().outerHeight(true);\n\n        if (_.options.infinite === true) {\n            if (_.slideCount > _.options.slidesToShow) {\n                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;\n                coef = -1\n\n                if (_.options.vertical === true && _.options.centerMode === true) {\n                    if (_.options.slidesToShow === 2) {\n                        coef = -1.5;\n                    } else if (_.options.slidesToShow === 1) {\n                        coef = -2\n                    }\n                }\n                verticalOffset = (verticalHeight * _.options.slidesToShow) * coef;\n            }\n            if (_.slideCount % _.options.slidesToScroll !== 0) {\n                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {\n                    if (slideIndex > _.slideCount) {\n                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;\n                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;\n                    } else {\n                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;\n                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;\n                    }\n                }\n            }\n        } else {\n            if (slideIndex + _.options.slidesToShow > _.slideCount) {\n                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;\n                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;\n            }\n        }\n\n        if (_.slideCount <= _.options.slidesToShow) {\n            _.slideOffset = 0;\n            verticalOffset = 0;\n        }\n\n        if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {\n            _.slideOffset = ((_.slideWidth * Math.floor(_.options.slidesToShow)) / 2) - ((_.slideWidth * _.slideCount) / 2);\n        } else if (_.options.centerMode === true && _.options.infinite === true) {\n            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;\n        } else if (_.options.centerMode === true) {\n            _.slideOffset = 0;\n            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);\n        }\n\n        if (_.options.vertical === false) {\n            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;\n        } else {\n            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;\n        }\n\n        if (_.options.variableWidth === true) {\n\n            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {\n                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);\n            } else {\n                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);\n            }\n\n            if (_.options.rtl === true) {\n                if (targetSlide[0]) {\n                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;\n                } else {\n                    targetLeft =  0;\n                }\n            } else {\n                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;\n            }\n\n            if (_.options.centerMode === true) {\n                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {\n                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);\n                } else {\n                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);\n                }\n\n                if (_.options.rtl === true) {\n                    if (targetSlide[0]) {\n                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;\n                    } else {\n                        targetLeft =  0;\n                    }\n                } else {\n                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;\n                }\n\n                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;\n            }\n        }\n\n        return targetLeft;\n\n    };\n\n    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {\n\n        var _ = this;\n\n        return _.options[option];\n\n    };\n\n    Slick.prototype.getNavigableIndexes = function() {\n\n        var _ = this,\n            breakPoint = 0,\n            counter = 0,\n            indexes = [],\n            max;\n\n        if (_.options.infinite === false) {\n            max = _.slideCount;\n        } else {\n            breakPoint = _.options.slidesToScroll * -1;\n            counter = _.options.slidesToScroll * -1;\n            max = _.slideCount * 2;\n        }\n\n        while (breakPoint < max) {\n            indexes.push(breakPoint);\n            breakPoint = counter + _.options.slidesToScroll;\n            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;\n        }\n\n        return indexes;\n\n    };\n\n    Slick.prototype.getSlick = function() {\n\n        return this;\n\n    };\n\n    Slick.prototype.getSlideCount = function() {\n\n        var _ = this,\n            slidesTraversed, swipedSlide, centerOffset;\n\n        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;\n\n        if (_.options.swipeToSlide === true) {\n            _.$slideTrack.find('.slick-slide').each(function(index, slide) {\n                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {\n                    swipedSlide = slide;\n                    return false;\n                }\n            });\n\n            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;\n\n            return slidesTraversed;\n\n        } else {\n            return _.options.slidesToScroll;\n        }\n\n    };\n\n    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {\n\n        var _ = this;\n\n        _.changeSlide({\n            data: {\n                message: 'index',\n                index: parseInt(slide)\n            }\n        }, dontAnimate);\n\n    };\n\n    Slick.prototype.init = function(creation) {\n\n        var _ = this;\n\n        if (!$(_.$slider).hasClass('slick-initialized')) {\n\n            $(_.$slider).addClass('slick-initialized');\n\n            _.buildRows();\n            _.buildOut();\n            _.setProps();\n            _.startLoad();\n            _.loadSlider();\n            _.initializeEvents();\n            _.updateArrows();\n            _.updateDots();\n            _.checkResponsive(true);\n            _.focusHandler();\n\n        }\n\n        if (creation) {\n            _.$slider.trigger('init', [_]);\n        }\n\n        if (_.options.accessibility === true) {\n            _.initADA();\n        }\n\n        if ( _.options.autoplay ) {\n\n            _.paused = false;\n            _.autoPlay();\n\n        }\n\n    };\n\n    Slick.prototype.initADA = function() {\n        var _ = this,\n                numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),\n                tabControlIndexes = _.getNavigableIndexes().filter(function(val) {\n                    return (val >= 0) && (val < _.slideCount);\n                });\n\n        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({\n            'aria-hidden': 'true',\n            'tabindex': '-1'\n        }).find('a, input, button, select').attr({\n            'tabindex': '-1'\n        });\n\n        if (_.$dots !== null) {\n            _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {\n                var slideControlIndex = tabControlIndexes.indexOf(i);\n\n                $(this).attr({\n                    'role': 'tabpanel',\n                    'id': 'slick-slide' + _.instanceUid + i,\n                    'tabindex': -1\n                });\n\n                if (slideControlIndex !== -1) {\n                   var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex\n                   if ($('#' + ariaButtonControl).length) {\n                     $(this).attr({\n                         'aria-describedby': ariaButtonControl\n                     });\n                   }\n                }\n            });\n\n            _.$dots.attr('role', 'tablist').find('li').each(function(i) {\n                var mappedSlideIndex = tabControlIndexes[i];\n\n                $(this).attr({\n                    'role': 'presentation'\n                });\n\n                $(this).find('button').first().attr({\n                    'role': 'tab',\n                    'id': 'slick-slide-control' + _.instanceUid + i,\n                    'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,\n                    'aria-label': (i + 1) + ' of ' + numDotGroups,\n                    'aria-selected': null,\n                    'tabindex': '-1'\n                });\n\n            }).eq(_.currentSlide).find('button').attr({\n                'aria-selected': 'true',\n                'tabindex': '0'\n            }).end();\n        }\n\n        for (var i=_.currentSlide, max=i+_.options.slidesToShow; i < max; i++) {\n          if (_.options.focusOnChange) {\n            _.$slides.eq(i).attr({'tabindex': '0'});\n          } else {\n            _.$slides.eq(i).removeAttr('tabindex');\n          }\n        }\n\n        _.activateADA();\n\n    };\n\n    Slick.prototype.initArrowEvents = function() {\n\n        var _ = this;\n\n        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {\n            _.$prevArrow\n               .off('click.slick')\n               .on('click.slick', {\n                    message: 'previous'\n               }, _.changeSlide);\n            _.$nextArrow\n               .off('click.slick')\n               .on('click.slick', {\n                    message: 'next'\n               }, _.changeSlide);\n\n            if (_.options.accessibility === true) {\n                _.$prevArrow.on('keydown.slick', _.keyHandler);\n                _.$nextArrow.on('keydown.slick', _.keyHandler);\n            }\n        }\n\n    };\n\n    Slick.prototype.initDotEvents = function() {\n\n        var _ = this;\n\n        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {\n            $('li', _.$dots).on('click.slick', {\n                message: 'index'\n            }, _.changeSlide);\n\n            if (_.options.accessibility === true) {\n                _.$dots.on('keydown.slick', _.keyHandler);\n            }\n        }\n\n        if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {\n\n            $('li', _.$dots)\n                .on('mouseenter.slick', $.proxy(_.interrupt, _, true))\n                .on('mouseleave.slick', $.proxy(_.interrupt, _, false));\n\n        }\n\n    };\n\n    Slick.prototype.initSlideEvents = function() {\n\n        var _ = this;\n\n        if ( _.options.pauseOnHover ) {\n\n            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));\n            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));\n\n        }\n\n    };\n\n    Slick.prototype.initializeEvents = function() {\n\n        var _ = this;\n\n        _.initArrowEvents();\n\n        _.initDotEvents();\n        _.initSlideEvents();\n\n        _.$list.on('touchstart.slick mousedown.slick', {\n            action: 'start'\n        }, _.swipeHandler);\n        _.$list.on('touchmove.slick mousemove.slick', {\n            action: 'move'\n        }, _.swipeHandler);\n        _.$list.on('touchend.slick mouseup.slick', {\n            action: 'end'\n        }, _.swipeHandler);\n        _.$list.on('touchcancel.slick mouseleave.slick', {\n            action: 'end'\n        }, _.swipeHandler);\n\n        _.$list.on('click.slick', _.clickHandler);\n\n        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));\n\n        if (_.options.accessibility === true) {\n            _.$list.on('keydown.slick', _.keyHandler);\n        }\n\n        if (_.options.focusOnSelect === true) {\n            $(_.$slideTrack).children().on('click.slick', _.selectHandler);\n        }\n\n        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));\n\n        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));\n\n        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);\n\n        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);\n        $(_.setPosition);\n\n    };\n\n    Slick.prototype.initUI = function() {\n\n        var _ = this;\n\n        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {\n\n            _.$prevArrow.show();\n            _.$nextArrow.show();\n\n        }\n\n        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {\n\n            _.$dots.show();\n\n        }\n\n    };\n\n    Slick.prototype.keyHandler = function(event) {\n\n        var _ = this;\n         //Dont slide if the cursor is inside the form fields and arrow keys are pressed\n        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {\n            if (event.keyCode === 37 && _.options.accessibility === true) {\n                _.changeSlide({\n                    data: {\n                        message: _.options.rtl === true ? 'next' :  'previous'\n                    }\n                });\n            } else if (event.keyCode === 39 && _.options.accessibility === true) {\n                _.changeSlide({\n                    data: {\n                        message: _.options.rtl === true ? 'previous' : 'next'\n                    }\n                });\n            }\n        }\n\n    };\n\n    Slick.prototype.lazyLoad = function() {\n\n        var _ = this,\n            loadRange, cloneRange, rangeStart, rangeEnd;\n\n        function loadImages(imagesScope) {\n\n            $('img[data-lazy]', imagesScope).each(function() {\n\n                var image = $(this),\n                    imageSource = $(this).attr('data-lazy'),\n                    imageSrcSet = $(this).attr('data-srcset'),\n                    imageSizes  = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),\n                    imageToLoad = document.createElement('img');\n\n                imageToLoad.onload = function() {\n\n                    image\n                        .animate({ opacity: 0 }, 100, function() {\n\n                            if (imageSrcSet) {\n                                image\n                                    .attr('srcset', imageSrcSet );\n\n                                if (imageSizes) {\n                                    image\n                                        .attr('sizes', imageSizes );\n                                }\n                            }\n\n                            image\n                                .attr('src', imageSource)\n                                .animate({ opacity: 1 }, 200, function() {\n                                    image\n                                        .removeAttr('data-lazy data-srcset data-sizes')\n                                        .removeClass('slick-loading');\n                                });\n                            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);\n                        });\n\n                };\n\n                imageToLoad.onerror = function() {\n\n                    image\n                        .removeAttr( 'data-lazy' )\n                        .removeClass( 'slick-loading' )\n                        .addClass( 'slick-lazyload-error' );\n\n                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);\n\n                };\n\n                imageToLoad.src = imageSource;\n\n            });\n\n        }\n\n        if (_.options.centerMode === true) {\n            if (_.options.infinite === true) {\n                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);\n                rangeEnd = rangeStart + _.options.slidesToShow + 2;\n            } else {\n                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));\n                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;\n            }\n        } else {\n            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;\n            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);\n            if (_.options.fade === true) {\n                if (rangeStart > 0) rangeStart--;\n                if (rangeEnd <= _.slideCount) rangeEnd++;\n            }\n        }\n\n        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);\n\n        if (_.options.lazyLoad === 'anticipated') {\n            var prevSlide = rangeStart - 1,\n                nextSlide = rangeEnd,\n                $slides = _.$slider.find('.slick-slide');\n\n            for (var i = 0; i < _.options.slidesToScroll; i++) {\n                if (prevSlide < 0) prevSlide = _.slideCount - 1;\n                loadRange = loadRange.add($slides.eq(prevSlide));\n                loadRange = loadRange.add($slides.eq(nextSlide));\n                prevSlide--;\n                nextSlide++;\n            }\n        }\n\n        loadImages(loadRange);\n\n        if (_.slideCount <= _.options.slidesToShow) {\n            cloneRange = _.$slider.find('.slick-slide');\n            loadImages(cloneRange);\n        } else\n        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {\n            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);\n            loadImages(cloneRange);\n        } else if (_.currentSlide === 0) {\n            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);\n            loadImages(cloneRange);\n        }\n\n    };\n\n    Slick.prototype.loadSlider = function() {\n\n        var _ = this;\n\n        _.setPosition();\n\n        _.$slideTrack.css({\n            opacity: 1\n        });\n\n        _.$slider.removeClass('slick-loading');\n\n        _.initUI();\n\n        if (_.options.lazyLoad === 'progressive') {\n            _.progressiveLazyLoad();\n        }\n\n    };\n\n    Slick.prototype.next = Slick.prototype.slickNext = function() {\n\n        var _ = this;\n\n        _.changeSlide({\n            data: {\n                message: 'next'\n            }\n        });\n\n    };\n\n    Slick.prototype.orientationChange = function() {\n\n        var _ = this;\n\n        _.checkResponsive();\n        _.setPosition();\n\n    };\n\n    Slick.prototype.pause = Slick.prototype.slickPause = function() {\n\n        var _ = this;\n\n        _.autoPlayClear();\n        _.paused = true;\n\n    };\n\n    Slick.prototype.play = Slick.prototype.slickPlay = function() {\n\n        var _ = this;\n\n        _.autoPlay();\n        _.options.autoplay = true;\n        _.paused = false;\n        _.focussed = false;\n        _.interrupted = false;\n\n    };\n\n    Slick.prototype.postSlide = function(index) {\n\n        var _ = this;\n\n        if( !_.unslicked ) {\n\n            _.$slider.trigger('afterChange', [_, index]);\n\n            _.animating = false;\n\n            if (_.slideCount > _.options.slidesToShow) {\n                _.setPosition();\n            }\n\n            _.swipeLeft = null;\n\n            if ( _.options.autoplay ) {\n                _.autoPlay();\n            }\n\n            if (_.options.accessibility === true) {\n                _.initADA();\n\n                if (_.options.focusOnChange) {\n                    var $currentSlide = $(_.$slides.get(_.currentSlide));\n                    $currentSlide.attr('tabindex', 0).focus();\n                }\n            }\n\n        }\n\n    };\n\n    Slick.prototype.prev = Slick.prototype.slickPrev = function() {\n\n        var _ = this;\n\n        _.changeSlide({\n            data: {\n                message: 'previous'\n            }\n        });\n\n    };\n\n    Slick.prototype.preventDefault = function(event) {\n\n        event.preventDefault();\n\n    };\n\n    Slick.prototype.progressiveLazyLoad = function( tryCount ) {\n\n        tryCount = tryCount || 1;\n\n        var _ = this,\n            $imgsToLoad = $( 'img[data-lazy]', _.$slider ),\n            image,\n            imageSource,\n            imageSrcSet,\n            imageSizes,\n            imageToLoad;\n\n        if ( $imgsToLoad.length ) {\n\n            image = $imgsToLoad.first();\n            imageSource = image.attr('data-lazy');\n            imageSrcSet = image.attr('data-srcset');\n            imageSizes  = image.attr('data-sizes') || _.$slider.attr('data-sizes');\n            imageToLoad = document.createElement('img');\n\n            imageToLoad.onload = function() {\n\n                if (imageSrcSet) {\n                    image\n                        .attr('srcset', imageSrcSet );\n\n                    if (imageSizes) {\n                        image\n                            .attr('sizes', imageSizes );\n                    }\n                }\n\n                image\n                    .attr( 'src', imageSource )\n                    .removeAttr('data-lazy data-srcset data-sizes')\n                    .removeClass('slick-loading');\n\n                if ( _.options.adaptiveHeight === true ) {\n                    _.setPosition();\n                }\n\n                _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);\n                _.progressiveLazyLoad();\n\n            };\n\n            imageToLoad.onerror = function() {\n\n                if ( tryCount < 3 ) {\n\n                    /**\n                     * try to load the image 3 times,\n                     * leave a slight delay so we don't get\n                     * servers blocking the request.\n                     */\n                    setTimeout( function() {\n                        _.progressiveLazyLoad( tryCount + 1 );\n                    }, 500 );\n\n                } else {\n\n                    image\n                        .removeAttr( 'data-lazy' )\n                        .removeClass( 'slick-loading' )\n                        .addClass( 'slick-lazyload-error' );\n\n                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);\n\n                    _.progressiveLazyLoad();\n\n                }\n\n            };\n\n            imageToLoad.src = imageSource;\n\n        } else {\n\n            _.$slider.trigger('allImagesLoaded', [ _ ]);\n\n        }\n\n    };\n\n    Slick.prototype.refresh = function( initializing ) {\n\n        var _ = this, currentSlide, lastVisibleIndex;\n\n        lastVisibleIndex = _.slideCount - _.options.slidesToShow;\n\n        // in non-infinite sliders, we don't want to go past the\n        // last visible index.\n        if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {\n            _.currentSlide = lastVisibleIndex;\n        }\n\n        // if less slides than to show, go to start.\n        if ( _.slideCount <= _.options.slidesToShow ) {\n            _.currentSlide = 0;\n\n        }\n\n        currentSlide = _.currentSlide;\n\n        _.destroy(true);\n\n        $.extend(_, _.initials, { currentSlide: currentSlide });\n\n        _.init();\n\n        if( !initializing ) {\n\n            _.changeSlide({\n                data: {\n                    message: 'index',\n                    index: currentSlide\n                }\n            }, false);\n\n        }\n\n    };\n\n    Slick.prototype.registerBreakpoints = function() {\n\n        var _ = this, breakpoint, currentBreakpoint, l,\n            responsiveSettings = _.options.responsive || null;\n\n        if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {\n\n            _.respondTo = _.options.respondTo || 'window';\n\n            for ( breakpoint in responsiveSettings ) {\n\n                l = _.breakpoints.length-1;\n\n                if (responsiveSettings.hasOwnProperty(breakpoint)) {\n                    currentBreakpoint = responsiveSettings[breakpoint].breakpoint;\n\n                    // loop through the breakpoints and cut out any existing\n                    // ones with the same breakpoint number, we don't want dupes.\n                    while( l >= 0 ) {\n                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {\n                            _.breakpoints.splice(l,1);\n                        }\n                        l--;\n                    }\n\n                    _.breakpoints.push(currentBreakpoint);\n                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;\n\n                }\n\n            }\n\n            _.breakpoints.sort(function(a, b) {\n                return ( _.options.mobileFirst ) ? a-b : b-a;\n            });\n\n        }\n\n    };\n\n    Slick.prototype.reinit = function() {\n\n        var _ = this;\n\n        _.$slides =\n            _.$slideTrack\n                .children(_.options.slide)\n                .addClass('slick-slide');\n\n        _.slideCount = _.$slides.length;\n\n        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {\n            _.currentSlide = _.currentSlide - _.options.slidesToScroll;\n        }\n\n        if (_.slideCount <= _.options.slidesToShow) {\n            _.currentSlide = 0;\n        }\n\n        _.registerBreakpoints();\n\n        _.setProps();\n        _.setupInfinite();\n        _.buildArrows();\n        _.updateArrows();\n        _.initArrowEvents();\n        _.buildDots();\n        _.updateDots();\n        _.initDotEvents();\n        _.cleanUpSlideEvents();\n        _.initSlideEvents();\n\n        _.checkResponsive(false, true);\n\n        if (_.options.focusOnSelect === true) {\n            $(_.$slideTrack).children().on('click.slick', _.selectHandler);\n        }\n\n        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);\n\n        _.setPosition();\n        _.focusHandler();\n\n        _.paused = !_.options.autoplay;\n        _.autoPlay();\n\n        _.$slider.trigger('reInit', [_]);\n\n    };\n\n    Slick.prototype.resize = function() {\n\n        var _ = this;\n\n        if ($(window).width() !== _.windowWidth) {\n            clearTimeout(_.windowDelay);\n            _.windowDelay = window.setTimeout(function() {\n                _.windowWidth = $(window).width();\n                _.checkResponsive();\n                if( !_.unslicked ) { _.setPosition(); }\n            }, 50);\n        }\n    };\n\n    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {\n\n        var _ = this;\n\n        if (typeof(index) === 'boolean') {\n            removeBefore = index;\n            index = removeBefore === true ? 0 : _.slideCount - 1;\n        } else {\n            index = removeBefore === true ? --index : index;\n        }\n\n        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {\n            return false;\n        }\n\n        _.unload();\n\n        if (removeAll === true) {\n            _.$slideTrack.children().remove();\n        } else {\n            _.$slideTrack.children(this.options.slide).eq(index).remove();\n        }\n\n        _.$slides = _.$slideTrack.children(this.options.slide);\n\n        _.$slideTrack.children(this.options.slide).detach();\n\n        _.$slideTrack.append(_.$slides);\n\n        _.$slidesCache = _.$slides;\n\n        _.reinit();\n\n    };\n\n    Slick.prototype.setCSS = function(position) {\n\n        var _ = this,\n            positionProps = {},\n            x, y;\n\n        if (_.options.rtl === true) {\n            position = -position;\n        }\n        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';\n        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';\n\n        positionProps[_.positionProp] = position;\n\n        if (_.transformsEnabled === false) {\n            _.$slideTrack.css(positionProps);\n        } else {\n            positionProps = {};\n            if (_.cssTransitions === false) {\n                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';\n                _.$slideTrack.css(positionProps);\n            } else {\n                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';\n                _.$slideTrack.css(positionProps);\n            }\n        }\n\n    };\n\n    Slick.prototype.setDimensions = function() {\n\n        var _ = this;\n\n        if (_.options.vertical === false) {\n            if (_.options.centerMode === true) {\n                _.$list.css({\n                    padding: ('0px ' + _.options.centerPadding)\n                });\n            }\n        } else {\n            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);\n            if (_.options.centerMode === true) {\n                _.$list.css({\n                    padding: (_.options.centerPadding + ' 0px')\n                });\n            }\n        }\n\n        _.listWidth = _.$list.width();\n        _.listHeight = _.$list.height();\n\n\n        if (_.options.vertical === false && _.options.variableWidth === false) {\n            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);\n            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));\n\n        } else if (_.options.variableWidth === true) {\n            _.$slideTrack.width(5000 * _.slideCount);\n        } else {\n            _.slideWidth = Math.ceil(_.listWidth);\n            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));\n        }\n\n        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();\n        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);\n\n    };\n\n    Slick.prototype.setFade = function() {\n\n        var _ = this,\n            targetLeft;\n\n        _.$slides.each(function(index, element) {\n            targetLeft = (_.slideWidth * index) * -1;\n            if (_.options.rtl === true) {\n                $(element).css({\n                    position: 'relative',\n                    right: targetLeft,\n                    top: 0,\n                    zIndex: _.options.zIndex - 2,\n                    opacity: 0\n                });\n            } else {\n                $(element).css({\n                    position: 'relative',\n                    left: targetLeft,\n                    top: 0,\n                    zIndex: _.options.zIndex - 2,\n                    opacity: 0\n                });\n            }\n        });\n\n        _.$slides.eq(_.currentSlide).css({\n            zIndex: _.options.zIndex - 1,\n            opacity: 1\n        });\n\n    };\n\n    Slick.prototype.setHeight = function() {\n\n        var _ = this;\n\n        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {\n            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);\n            _.$list.css('height', targetHeight);\n        }\n\n    };\n\n    Slick.prototype.setOption =\n    Slick.prototype.slickSetOption = function() {\n\n        /**\n         * accepts arguments in format of:\n         *\n         *  - for changing a single option's value:\n         *     .slick(\"setOption\", option, value, refresh )\n         *\n         *  - for changing a set of responsive options:\n         *     .slick(\"setOption\", 'responsive', [{}, ...], refresh )\n         *\n         *  - for updating multiple values at once (not responsive)\n         *     .slick(\"setOption\", { 'option': value, ... }, refresh )\n         */\n\n        var _ = this, l, item, option, value, refresh = false, type;\n\n        if( $.type( arguments[0] ) === 'object' ) {\n\n            option =  arguments[0];\n            refresh = arguments[1];\n            type = 'multiple';\n\n        } else if ( $.type( arguments[0] ) === 'string' ) {\n\n            option =  arguments[0];\n            value = arguments[1];\n            refresh = arguments[2];\n\n            if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {\n\n                type = 'responsive';\n\n            } else if ( typeof arguments[1] !== 'undefined' ) {\n\n                type = 'single';\n\n            }\n\n        }\n\n        if ( type === 'single' ) {\n\n            _.options[option] = value;\n\n\n        } else if ( type === 'multiple' ) {\n\n            $.each( option , function( opt, val ) {\n\n                _.options[opt] = val;\n\n            });\n\n\n        } else if ( type === 'responsive' ) {\n\n            for ( item in value ) {\n\n                if( $.type( _.options.responsive ) !== 'array' ) {\n\n                    _.options.responsive = [ value[item] ];\n\n                } else {\n\n                    l = _.options.responsive.length-1;\n\n                    // loop through the responsive object and splice out duplicates.\n                    while( l >= 0 ) {\n\n                        if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {\n\n                            _.options.responsive.splice(l,1);\n\n                        }\n\n                        l--;\n\n                    }\n\n                    _.options.responsive.push( value[item] );\n\n                }\n\n            }\n\n        }\n\n        if ( refresh ) {\n\n            _.unload();\n            _.reinit();\n\n        }\n\n    };\n\n    Slick.prototype.setPosition = function() {\n\n        var _ = this;\n\n        _.setDimensions();\n\n        _.setHeight();\n\n        if (_.options.fade === false) {\n            _.setCSS(_.getLeft(_.currentSlide));\n        } else {\n            _.setFade();\n        }\n\n        _.$slider.trigger('setPosition', [_]);\n\n    };\n\n    Slick.prototype.setProps = function() {\n\n        var _ = this,\n            bodyStyle = document.body.style;\n\n        _.positionProp = _.options.vertical === true ? 'top' : 'left';\n\n        if (_.positionProp === 'top') {\n            _.$slider.addClass('slick-vertical');\n        } else {\n            _.$slider.removeClass('slick-vertical');\n        }\n\n        if (bodyStyle.WebkitTransition !== undefined ||\n            bodyStyle.MozTransition !== undefined ||\n            bodyStyle.msTransition !== undefined) {\n            if (_.options.useCSS === true) {\n                _.cssTransitions = true;\n            }\n        }\n\n        if ( _.options.fade ) {\n            if ( typeof _.options.zIndex === 'number' ) {\n                if( _.options.zIndex < 3 ) {\n                    _.options.zIndex = 3;\n                }\n            } else {\n                _.options.zIndex = _.defaults.zIndex;\n            }\n        }\n\n        if (bodyStyle.OTransform !== undefined) {\n            _.animType = 'OTransform';\n            _.transformType = '-o-transform';\n            _.transitionType = 'OTransition';\n            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;\n        }\n        if (bodyStyle.MozTransform !== undefined) {\n            _.animType = 'MozTransform';\n            _.transformType = '-moz-transform';\n            _.transitionType = 'MozTransition';\n            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;\n        }\n        if (bodyStyle.webkitTransform !== undefined) {\n            _.animType = 'webkitTransform';\n            _.transformType = '-webkit-transform';\n            _.transitionType = 'webkitTransition';\n            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;\n        }\n        if (bodyStyle.msTransform !== undefined) {\n            _.animType = 'msTransform';\n            _.transformType = '-ms-transform';\n            _.transitionType = 'msTransition';\n            if (bodyStyle.msTransform === undefined) _.animType = false;\n        }\n        if (bodyStyle.transform !== undefined && _.animType !== false) {\n            _.animType = 'transform';\n            _.transformType = 'transform';\n            _.transitionType = 'transition';\n        }\n        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);\n    };\n\n\n    Slick.prototype.setSlideClasses = function(index) {\n\n        var _ = this,\n            centerOffset, allSlides, indexOffset, remainder;\n\n        allSlides = _.$slider\n            .find('.slick-slide')\n            .removeClass('slick-active slick-center slick-current')\n            .attr('aria-hidden', 'true');\n\n        _.$slides\n            .eq(index)\n            .addClass('slick-current');\n\n        if (_.options.centerMode === true) {\n\n            var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;\n\n            centerOffset = Math.floor(_.options.slidesToShow / 2);\n\n            if (_.options.infinite === true) {\n\n                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {\n                    _.$slides\n                        .slice(index - centerOffset + evenCoef, index + centerOffset + 1)\n                        .addClass('slick-active')\n                        .attr('aria-hidden', 'false');\n\n                } else {\n\n                    indexOffset = _.options.slidesToShow + index;\n                    allSlides\n                        .slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2)\n                        .addClass('slick-active')\n                        .attr('aria-hidden', 'false');\n\n                }\n\n                if (index === 0) {\n\n                    allSlides\n                        .eq(allSlides.length - 1 - _.options.slidesToShow)\n                        .addClass('slick-center');\n\n                } else if (index === _.slideCount - 1) {\n\n                    allSlides\n                        .eq(_.options.slidesToShow)\n                        .addClass('slick-center');\n\n                }\n\n            }\n\n            _.$slides\n                .eq(index)\n                .addClass('slick-center');\n\n        } else {\n\n            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {\n\n                _.$slides\n                    .slice(index, index + _.options.slidesToShow)\n                    .addClass('slick-active')\n                    .attr('aria-hidden', 'false');\n\n            } else if (allSlides.length <= _.options.slidesToShow) {\n\n                allSlides\n                    .addClass('slick-active')\n                    .attr('aria-hidden', 'false');\n\n            } else {\n\n                remainder = _.slideCount % _.options.slidesToShow;\n                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;\n\n                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {\n\n                    allSlides\n                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)\n                        .addClass('slick-active')\n                        .attr('aria-hidden', 'false');\n\n                } else {\n\n                    allSlides\n                        .slice(indexOffset, indexOffset + _.options.slidesToShow)\n                        .addClass('slick-active')\n                        .attr('aria-hidden', 'false');\n\n                }\n\n            }\n\n        }\n\n        if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {\n            _.lazyLoad();\n        }\n    };\n\n    Slick.prototype.setupInfinite = function() {\n\n        var _ = this,\n            i, slideIndex, infiniteCount;\n\n        if (_.options.fade === true) {\n            _.options.centerMode = false;\n        }\n\n        if (_.options.infinite === true && _.options.fade === false) {\n\n            slideIndex = null;\n\n            if (_.slideCount > _.options.slidesToShow) {\n\n                if (_.options.centerMode === true) {\n                    infiniteCount = _.options.slidesToShow + 1;\n                } else {\n                    infiniteCount = _.options.slidesToShow;\n                }\n\n                for (i = _.slideCount; i > (_.slideCount -\n                        infiniteCount); i -= 1) {\n                    slideIndex = i - 1;\n                    $(_.$slides[slideIndex]).clone(true).attr('id', '')\n                        .attr('data-slick-index', slideIndex - _.slideCount)\n                        .prependTo(_.$slideTrack).addClass('slick-cloned');\n                }\n                for (i = 0; i < infiniteCount  + _.slideCount; i += 1) {\n                    slideIndex = i;\n                    $(_.$slides[slideIndex]).clone(true).attr('id', '')\n                        .attr('data-slick-index', slideIndex + _.slideCount)\n                        .appendTo(_.$slideTrack).addClass('slick-cloned');\n                }\n                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {\n                    $(this).attr('id', '');\n                });\n\n            }\n\n        }\n\n    };\n\n    Slick.prototype.interrupt = function( toggle ) {\n\n        var _ = this;\n\n        if( !toggle ) {\n            _.autoPlay();\n        }\n        _.interrupted = toggle;\n\n    };\n\n    Slick.prototype.selectHandler = function(event) {\n\n        var _ = this;\n\n        var targetElement =\n            $(event.target).is('.slick-slide') ?\n                $(event.target) :\n                $(event.target).parents('.slick-slide');\n\n        var index = parseInt(targetElement.attr('data-slick-index'));\n\n        if (!index) index = 0;\n\n        if (_.slideCount <= _.options.slidesToShow) {\n\n            _.slideHandler(index, false, true);\n            return;\n\n        }\n\n        _.slideHandler(index);\n\n    };\n\n    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {\n\n        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,\n            _ = this, navTarget;\n\n        sync = sync || false;\n\n        if (_.animating === true && _.options.waitForAnimate === true) {\n            return;\n        }\n\n        if (_.options.fade === true && _.currentSlide === index) {\n            return;\n        }\n\n        if (sync === false) {\n            _.asNavFor(index);\n        }\n\n        targetSlide = index;\n        targetLeft = _.getLeft(targetSlide);\n        slideLeft = _.getLeft(_.currentSlide);\n\n        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;\n\n        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {\n            if (_.options.fade === false) {\n                targetSlide = _.currentSlide;\n                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {\n                    _.animateSlide(slideLeft, function() {\n                        _.postSlide(targetSlide);\n                    });\n                } else {\n                    _.postSlide(targetSlide);\n                }\n            }\n            return;\n        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {\n            if (_.options.fade === false) {\n                targetSlide = _.currentSlide;\n                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {\n                    _.animateSlide(slideLeft, function() {\n                        _.postSlide(targetSlide);\n                    });\n                } else {\n                    _.postSlide(targetSlide);\n                }\n            }\n            return;\n        }\n\n        if ( _.options.autoplay ) {\n            clearInterval(_.autoPlayTimer);\n        }\n\n        if (targetSlide < 0) {\n            if (_.slideCount % _.options.slidesToScroll !== 0) {\n                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);\n            } else {\n                animSlide = _.slideCount + targetSlide;\n            }\n        } else if (targetSlide >= _.slideCount) {\n            if (_.slideCount % _.options.slidesToScroll !== 0) {\n                animSlide = 0;\n            } else {\n                animSlide = targetSlide - _.slideCount;\n            }\n        } else {\n            animSlide = targetSlide;\n        }\n\n        _.animating = true;\n\n        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);\n\n        oldSlide = _.currentSlide;\n        _.currentSlide = animSlide;\n\n        _.setSlideClasses(_.currentSlide);\n\n        if ( _.options.asNavFor ) {\n\n            navTarget = _.getNavTarget();\n            navTarget = navTarget.slick('getSlick');\n\n            if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {\n                navTarget.setSlideClasses(_.currentSlide);\n            }\n\n        }\n\n        _.updateDots();\n        _.updateArrows();\n\n        if (_.options.fade === true) {\n            if (dontAnimate !== true) {\n\n                _.fadeSlideOut(oldSlide);\n\n                _.fadeSlide(animSlide, function() {\n                    _.postSlide(animSlide);\n                });\n\n            } else {\n                _.postSlide(animSlide);\n            }\n            _.animateHeight();\n            return;\n        }\n\n        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {\n            _.animateSlide(targetLeft, function() {\n                _.postSlide(animSlide);\n            });\n        } else {\n            _.postSlide(animSlide);\n        }\n\n    };\n\n    Slick.prototype.startLoad = function() {\n\n        var _ = this;\n\n        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {\n\n            _.$prevArrow.hide();\n            _.$nextArrow.hide();\n\n        }\n\n        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {\n\n            _.$dots.hide();\n\n        }\n\n        _.$slider.addClass('slick-loading');\n\n    };\n\n    Slick.prototype.swipeDirection = function() {\n\n        var xDist, yDist, r, swipeAngle, _ = this;\n\n        xDist = _.touchObject.startX - _.touchObject.curX;\n        yDist = _.touchObject.startY - _.touchObject.curY;\n        r = Math.atan2(yDist, xDist);\n\n        swipeAngle = Math.round(r * 180 / Math.PI);\n        if (swipeAngle < 0) {\n            swipeAngle = 360 - Math.abs(swipeAngle);\n        }\n\n        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {\n            return (_.options.rtl === false ? 'left' : 'right');\n        }\n        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {\n            return (_.options.rtl === false ? 'left' : 'right');\n        }\n        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {\n            return (_.options.rtl === false ? 'right' : 'left');\n        }\n        if (_.options.verticalSwiping === true) {\n            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {\n                return 'down';\n            } else {\n                return 'up';\n            }\n        }\n\n        return 'vertical';\n\n    };\n\n    Slick.prototype.swipeEnd = function(event) {\n\n        var _ = this,\n            slideCount,\n            direction;\n\n        _.dragging = false;\n        _.swiping = false;\n\n        if (_.scrolling) {\n            _.scrolling = false;\n            return false;\n        }\n\n        _.interrupted = false;\n        _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;\n\n        if ( _.touchObject.curX === undefined ) {\n            return false;\n        }\n\n        if ( _.touchObject.edgeHit === true ) {\n            _.$slider.trigger('edge', [_, _.swipeDirection() ]);\n        }\n\n        if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {\n\n            direction = _.swipeDirection();\n\n            switch ( direction ) {\n\n                case 'left':\n                case 'down':\n\n                    slideCount =\n                        _.options.swipeToSlide ?\n                            _.checkNavigable( _.currentSlide + _.getSlideCount() ) :\n                            _.currentSlide + _.getSlideCount();\n\n                    _.currentDirection = 0;\n\n                    break;\n\n                case 'right':\n                case 'up':\n\n                    slideCount =\n                        _.options.swipeToSlide ?\n                            _.checkNavigable( _.currentSlide - _.getSlideCount() ) :\n                            _.currentSlide - _.getSlideCount();\n\n                    _.currentDirection = 1;\n\n                    break;\n\n                default:\n\n\n            }\n\n            if( direction != 'vertical' ) {\n\n                _.slideHandler( slideCount );\n                _.touchObject = {};\n                _.$slider.trigger('swipe', [_, direction ]);\n\n            }\n\n        } else {\n\n            if ( _.touchObject.startX !== _.touchObject.curX ) {\n\n                _.slideHandler( _.currentSlide );\n                _.touchObject = {};\n\n            }\n\n        }\n\n    };\n\n    Slick.prototype.swipeHandler = function(event) {\n\n        var _ = this;\n\n        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {\n            return;\n        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {\n            return;\n        }\n\n        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?\n            event.originalEvent.touches.length : 1;\n\n        _.touchObject.minSwipe = _.listWidth / _.options\n            .touchThreshold;\n\n        if (_.options.verticalSwiping === true) {\n            _.touchObject.minSwipe = _.listHeight / _.options\n                .touchThreshold;\n        }\n\n        switch (event.data.action) {\n\n            case 'start':\n                _.swipeStart(event);\n                break;\n\n            case 'move':\n                _.swipeMove(event);\n                break;\n\n            case 'end':\n                _.swipeEnd(event);\n                break;\n\n        }\n\n    };\n\n    Slick.prototype.swipeMove = function(event) {\n\n        var _ = this,\n            edgeWasHit = false,\n            curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;\n\n        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;\n\n        if (!_.dragging || _.scrolling || touches && touches.length !== 1) {\n            return false;\n        }\n\n        curLeft = _.getLeft(_.currentSlide);\n\n        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;\n        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;\n\n        _.touchObject.swipeLength = Math.round(Math.sqrt(\n            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));\n\n        verticalSwipeLength = Math.round(Math.sqrt(\n            Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));\n\n        if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {\n            _.scrolling = true;\n            return false;\n        }\n\n        if (_.options.verticalSwiping === true) {\n            _.touchObject.swipeLength = verticalSwipeLength;\n        }\n\n        swipeDirection = _.swipeDirection();\n\n        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {\n            _.swiping = true;\n            event.preventDefault();\n        }\n\n        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);\n        if (_.options.verticalSwiping === true) {\n            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;\n        }\n\n\n        swipeLength = _.touchObject.swipeLength;\n\n        _.touchObject.edgeHit = false;\n\n        if (_.options.infinite === false) {\n            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {\n                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;\n                _.touchObject.edgeHit = true;\n            }\n        }\n\n        if (_.options.vertical === false) {\n            _.swipeLeft = curLeft + swipeLength * positionOffset;\n        } else {\n            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;\n        }\n        if (_.options.verticalSwiping === true) {\n            _.swipeLeft = curLeft + swipeLength * positionOffset;\n        }\n\n        if (_.options.fade === true || _.options.touchMove === false) {\n            return false;\n        }\n\n        if (_.animating === true) {\n            _.swipeLeft = null;\n            return false;\n        }\n\n        _.setCSS(_.swipeLeft);\n\n    };\n\n    Slick.prototype.swipeStart = function(event) {\n\n        var _ = this,\n            touches;\n\n        _.interrupted = true;\n\n        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {\n            _.touchObject = {};\n            return false;\n        }\n\n        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {\n            touches = event.originalEvent.touches[0];\n        }\n\n        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;\n        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;\n\n        _.dragging = true;\n\n    };\n\n    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {\n\n        var _ = this;\n\n        if (_.$slidesCache !== null) {\n\n            _.unload();\n\n            _.$slideTrack.children(this.options.slide).detach();\n\n            _.$slidesCache.appendTo(_.$slideTrack);\n\n            _.reinit();\n\n        }\n\n    };\n\n    Slick.prototype.unload = function() {\n\n        var _ = this;\n\n        $('.slick-cloned', _.$slider).remove();\n\n        if (_.$dots) {\n            _.$dots.remove();\n        }\n\n        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {\n            _.$prevArrow.remove();\n        }\n\n        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {\n            _.$nextArrow.remove();\n        }\n\n        _.$slides\n            .removeClass('slick-slide slick-active slick-visible slick-current')\n            .attr('aria-hidden', 'true')\n            .css('width', '');\n\n    };\n\n    Slick.prototype.unslick = function(fromBreakpoint) {\n\n        var _ = this;\n        _.$slider.trigger('unslick', [_, fromBreakpoint]);\n        _.destroy();\n\n    };\n\n    Slick.prototype.updateArrows = function() {\n\n        var _ = this,\n            centerOffset;\n\n        centerOffset = Math.floor(_.options.slidesToShow / 2);\n\n        if ( _.options.arrows === true &&\n            _.slideCount > _.options.slidesToShow &&\n            !_.options.infinite ) {\n\n            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');\n            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');\n\n            if (_.currentSlide === 0) {\n\n                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');\n                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');\n\n            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {\n\n                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');\n                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');\n\n            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {\n\n                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');\n                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');\n\n            }\n\n        }\n\n    };\n\n    Slick.prototype.updateDots = function() {\n\n        var _ = this;\n\n        if (_.$dots !== null) {\n\n            _.$dots\n                .find('li')\n                    .removeClass('slick-active')\n                    .end();\n\n            _.$dots\n                .find('li')\n                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))\n                .addClass('slick-active');\n\n        }\n\n    };\n\n    Slick.prototype.visibility = function() {\n\n        var _ = this;\n\n        if ( _.options.autoplay ) {\n\n            if ( document[_.hidden] ) {\n\n                _.interrupted = true;\n\n            } else {\n\n                _.interrupted = false;\n\n            }\n\n        }\n\n    };\n\n    $.fn.slick = function() {\n        var _ = this,\n            opt = arguments[0],\n            args = Array.prototype.slice.call(arguments, 1),\n            l = _.length,\n            i,\n            ret;\n        for (i = 0; i < l; i++) {\n            if (typeof opt == 'object' || typeof opt == 'undefined')\n                _[i].slick = new Slick(_[i], opt);\n            else\n                ret = _[i].slick[opt].apply(_[i].slick, args);\n            if (typeof ret != 'undefined') return ret;\n        }\n        return _;\n    };\n\n}));\n"

/***/ }),
/* 20 */
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
    errorBoxClass: 'validation-error',
    errorClass: 'validation-field-error',
    msgSep: ' -',
    defaultErrorMsg: 'Please enter a value',
    defaultSuccessMsg: 'The form has been successfully submitted.',
    defaultSuggestText: 'Did you mean',
    errorBoxElement: '<span/>',
    preloaderTemplate: '<div class="loader" title="1"><svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 50 50" style="display:block; enable-background:new 0 0 50 50;" xml:space="preserve"><path fill="#FFFFFF" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/></path></svg></div>',
    validateElement: $('.validation-validate'),
    successElement: $('.validation-form-success'),
    customValidationMethod: null,
    successCallback: function successCallback(parameters) {}

    /**
    * Plugin.prototype
    * Init.
    **/
  };Plugin.prototype = {
    init: function init() {
      // Global settings.
      this.settings = $.extend({}, $.fn.validation.defaults, this.options);
      // Cache fields.
      this.fields = $('input, select, textarea', this.$elem);
      // Cache the reset button element.
      this.reset = $('button[type="reset"], input[type="reset"]', this.$elem);
      // Cache the submit button element.
      this.button = $('button[type="submit"], input[type="submit"]', this.$elem);
      // Success element.
      this.successElement = this.settings.successElement.length ? this.settings.successElement : this.$elem.before($('<div class="validation-form-success">' + this.settings.defaultSuccessMsg + '</div>'));
      // Empty array for elements. Set once the form is submitted.
      this.$elementArray = [];
      // Do jQuery events.
      this.events();
      // Run the plugin.
      this.run();

      return this;
    },
    events: function events() {
      var _this = this;

      // On submit.
      this.$elem.on('submit', function (e) {
        e.preventDefault();

        _this.setFields();
        _this.process();
      });
      // On reset.
      this.reset.on('click', function (e) {
        _this.validationReset(e);
      });
      // On field change.
      this.fields.change(function () {
        _this.saveToLocalStorage($(this));
      });
    },
    run: function run() {
      // Add 'novalidate' attribute to form.
      this.$elem.attr('novalidate', 'true');
      // Process fields.
      this.processFields();
      // Get localStorage.
      this.getLocalStorage();
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
      });
      // Remove duplicates (jQuery.unique only works on DOM elements, we can't use DOM elements because they are ALL unique despite the same name).
      fieldsArray = helpers.removeDuplicates(fieldsArray);
      // Reverts the fieldsArray into an array of DOM elements.
      this.$elementArray = $.map(fieldsArray, function (field, i) {
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
      });
      // Remove duplicates (jQuery.unique only works on DOM elements, we can't use DOM elements because they are ALL unique despite the same name).
      fieldsArray = helpers.removeDuplicates(fieldsArray);
      // Reverts the fieldsArray into an array of DOM elements.
      this.$elementArray = $.map(fieldsArray, function (field, i) {
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
      var content = JSON.stringify(el.html());
      // Loader.
      var loader = $(this.settings.preloaderTemplate).hide();
      // Apply preloader.
      el.css({
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
      var content = JSON.parse(el.data('loader-content'));
      // Remove preloader
      el.removeClass('loading').html(content).removeAttr('data-loader-content').css({
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

      el.after($('<div class="validation-suggestion">' + this.settings.defaultSuggestText + ' <a href="#" class="validation-alternative-email"><span class="validation-address">address</span>@<span class="validation-domain">domain.com</span></a>?</div>'));

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
      form.$elem.removeClass('validation-form-has-errors');
      // Remove generic form messages.
      $('.validation-form-messages').empty();
      // Remove error class from fields.
      $('.validation-field-has-errors', form.$elem).removeClass('validation-field-has-errors');
      // Remove error class from fieldsets.
      $('.validation-fieldset-has-errors', form.$elem).removeClass('validation-fieldset-has-errors');
      // Remove error class from inputs with placeholder error..
      $('.validation-field--placeholder', form.$elem).removeClass('validation-field--placeholder');
      $('.validation-field--placeholder--span', form.$elem).remove();
      // Hide email suggester.
      $('.validation-suggestion', form.$elem).hide();
      // Remove current classes.
      $('.' + form.settings.errorClass, form.$elem).removeClass(form.settings.errorClass);
      $('.' + form.settings.errorBoxClass, form.$elem).remove();
    },
    attachErrors: function attachErrors(arr) {
      var _this = this;

      // Remove empty elements.
      arr = jQuery.grep(arr, function (n, i) {
        return n !== "" && n != null;
      });
      // Remove previous errors.
      this.resetErrors();
      // Un-disable stuff.
      this.disableButton(false);
      // Add error class to form.
      this.$elem.addClass('validation-form-has-errors');
      // Add new ones.
      $.each(arr, function (index) {
        if ($(this) == undefined) {
          return;
        }
        var a = $(this),
            el = a[0].input;

        // Get error message.
        var error = a[0].msg !== '' ? a[0].msg : _this.settings.defaultErrorMsg;
        // Separator.
        var message = _this.settings.msgSep ? error ? _this.settings.msgSep + ' <span class="validation-msg">' + error + '</span>' : '' : '<span class="validation-msg">' + error + '</span>';

        // Check element exists in the DOM.
        if (el.length && el.is(':input') && el.attr('type') !== 'hidden') {
          // Apply error class to field.
          el.addClass(_this.settings.errorClass).parent().addClass('validation-field-has-errors');
          // Field specific actions.
          if (el.attr('type') === 'checkbox' || el.attr('type') === 'radio') {
            // Add error element to field.
            el.parent().find('label, .label').first().append($(_this.settings.errorBoxElement).addClass(_this.settings.errorBoxClass).html(message));
            // Apply to nearest label if checkbox or radio.
            el.closest('label').addClass(_this.settings.errorClass);
          } else {
            if (_this.settings.appendErrorToPlaceholder) {
              // Find label.
              el.parent().find('label, .label').addClass(_this.settings.errorClass);
              // Check value length.
              if (el.val().length > 0) {
                // Add error class to placeholder.
                el.parent().addClass('validation-field--placeholder');
                // Add a span to the field.
                el.before('<span class="validation-field--placeholder--span">' + error + '</span>');
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
          el.closest('fieldset').addClass('validation-fieldset-has-errors');
          // Scroll to first error field.
          if (index == 0 && _this.settings.scrollToError) {
            // Determine fieldset.
            var fieldset = el.parentsUntil('fieldset').parent();
            // Check if el has parent fieldset.
            if (fieldset.length) {
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
      });
      // Custom validation method.
      if ($.isFunction(this.settings.customValidationMethod)) {
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
        var ajaxPromise = _this.ajaxRequest(_this.settings.serverURL, _this.$elem.serialize());
        // Process promise.
        ajaxPromise.done(function (res) {
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
          helpers.log(thrownError);
          // Set error.
          fatalerror = true;
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
      this.clearLocalStorage();
      // If we have a custom post function.
      if (type == 'server') {
        this.$elem.fadeOut(this.settings.fadeOutAnimationSpeed, function () {
          // Validation Complete.
          _this.validateSuccess();
          // Fade in success element.
          _this.$elem.parent().find(_this.successElement).fadeIn(_this.settings.fadeOutAnimationSpeed / 2);
          // Callback
          _this.settings.successCallback.call(this, callbackParameters, formResponse);
        });
      } else if (!this.settings.disableAjax && type == 'js') {
        // Ajax request.
        var ajaxPromise = this.ajaxRequest(this.settings.serverURL, this.$elem.serialize() + '&' + this.settings.serverID + '=true');

        // Process promise.
        ajaxPromise.always(function (response) {
          _this.$elem.fadeOut(_this.settings.fadeOutAnimationSpeed, function () {
            // Validation Complete.
            _this.validateSuccess();
            // Fade in success element.
            _this.$elem.parent().find(_this.successElement).fadeIn(_this.settings.fadeOutAnimationSpeed / 2);
            // Callback
            _this.settings.successCallback.call(_this, callbackParameters);
          });
        });
      } else {
        // Unbind submit.
        this.$elem.unbind('submit');
        // Validation Complete.
        this.validateSuccess();
        // Callback
        this.settings.successCallback.call(this, callbackParameters);
        // Trigger submit after unbind.
        this.$elem.trigger('submit');
      }
    },
    process: function process() {
      // Apply preloader.
      this.applyPreloader(this.button);
      // Disable stuff.
      this.disableButton(true);
      // Run setup this.
      this.setup();
      // Check validation type.
      if (this.settings.serverValidation) {
        // If we are doing server validation.
        this.serverValidateFields();
      } else {
        // If we are not doing server validation.
        this.jsValidateFields();
      }
    },
    validateSuccess: function validateSuccess() {
      // Destroy preloader.
      this.destroyPreloader(this.button);
      // Reset validation.
      this.validationReset();
    },
    validationFailure: function validationFailure() {
      var _this = this;

      // Process for 0.5 second.
      setTimeout(function () {
        // Set errors
        _this.attachErrors(_this.errorArray, _this.$elem);
        // Destroy preloader.
        _this.destroyPreloader(_this.button);
      }, 500);
    },
    validationReset: function validationReset() {
      // Destroy preloader.
      this.destroyPreloader(this.button);
      // Un-disable stuff.
      this.disableButton(false);
      // Remove errors.
      this.resetErrors();
      // Clear localStorage.
      this.clearLocalStorage();
      // Reset all field values.
      this.$elem.find('input[type="text"], input[type="email"], input[type="url"], textarea, select').val('');
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

    this.suggestion = el.next('.validation-suggestion');
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
      Plugin.prototype.resetErrors(form);
      // Set email address.
      $('.validation-address', this.suggestion).text(result.address);
      // Set email domain.
      $('.validation-domain', this.suggestion).text(result.domain);
      // Reveal suggestion.
      this.suggestion.stop(true, false).slideDown(350);
      // Click event.
      $('.validation-alternative-email').on('click', function (e) {
        e.preventDefault();

        // Apply suggestion.
        el.val(result.address + '@' + result.domain);
        // Hide suggestion.
        suggester.suggestion.stop(true, false).slideUp(350);
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
    return JSON.parse('{"' + decodeURI(str).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/[\r]?[\n]/g, '\\n') + '"}');
  };
})(jQuery, window);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mobile = __webpack_require__(22);

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
    form: $('[data-js-event="signupForm"]')

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
          window.Helpers.log('Setting virtual page view: /form-success.virtual');
          // Set a virtual page for GA.
          window.ga('send', 'pageview', '/form-success.virtual');
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
/* 22 */
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
      this.style(this._dom.menu, { 'left': -(100 - this._settings.menuSize) + '%', 'opacity': '1' });
      // Add no-scroll class.
      $('body').addClass('u-noscroll');
      // Add active class to button.
      this._dom.open.addClass('active');
      // Toggle the content position.
      if (this._settings.moveContent) {
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
      this.style(this._dom.menu, { 'left': '-100%', 'opacity': '0' });
      // Remove no-scroll class.
      $('body').removeClass('u-noscroll');
      // Add active class to button.
      this._dom.open.removeClass('active');
      // Toggle the content position.
      if (this._settings.moveContent) {
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
      var subMenu = $('.sub-menu', el);
      // Check sub menu exists.
      if (subMenu.length) {
        // Add active class to button.
        this._dom.open.removeClass('active').addClass('half');
        // Inject sub menu into the DOM.
        this.injectSubMenu(subMenu);
        // Toggle the main menu visibility.
        this.style(this._dom.bodyMenu, { 'left': '100%' });
        // Toggle the sub menu visibility.
        this.style(this._dom.bodySubMenu, { 'left': '0' });
        // Set flag.
        this.subMenuOpen = true;
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
      this._dom.open.addClass('active').removeClass('half');
      // Clear sub menu holder.
      this.clearSubMenuHolder();
      // Toggle the main menu visibility.
      this.style(this._dom.bodyMenu, { 'left': '0' });
      // Toggle the sub menu visibility.
      this.style(this._dom.bodySubMenu, { 'left': '-100%' });
      // Reset flag.
      this.subMenuOpen = false;
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
      var menuClone = el.clone();
      // Append sub menu.
      this._dom.bodySubMenu.empty().append(menuClone);
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
module.exports = exports['default'];

/***/ })
/******/ ]);
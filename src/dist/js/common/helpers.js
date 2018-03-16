/**
 *
 * Helpers
 *
 * Copyright 2018, Author Name
 * Some information on the license.
 *
**/

;(function (Helpers, window) {

  /**
   * log
   * Customised and cross browser console.log.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.log = function (message, type, alertlog) {
    if (process.env.NODE_ENV !== 'production' && !this.isPhantom()) {
      alertlog = (typeof alertlog === 'undefined')
      if (typeof console === 'undefined' || typeof console.log === 'undefined') {
        if (alertlog) {
          window.alert(message)
        }
      } else {
        var color = (type === 'positive') ? '#097809' : (type === 'negative') ? '#c5211d' : (typeof type !== 'undefined') ? type : '#240ad0'
        console.log('%c-- DEBUG ---------------------------------------------------------', 'color:' + color + ';font-weight:bold;')
        if (message instanceof Array || message instanceof Object) {
          console.log(message)
        } else {
          console.log('%c' + message, 'color: ' + color)
        }
        console.log('%c-- DEBUG ---------------------------------------------------------', 'color:' + color + ';font-weight:bold;')
        console.log('')
      }
    }
  }

  /**
   * isPhantom
   * Checks if user is PhantomJS.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.isPhantom = function () {
    return (/PhantomJS/.test(window.navigator.userAgent))
  }

  /**
   * throw
   * Throws a custom error.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.throw = function (msg) {
    throw new Error(msg)
  }

  /**
   * breakpoint
   * Checks the window against a certain breakpoint.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.breakpoint = function (breakpoint) {
    return (window.innerWidth <= breakpoint)
  }

  /**
   * mhe
   * Measures a hidden element.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.mhe = function (el) {
    // Clone element.
    var clone = el.clone()
    // Add to DOM in place and measure height.
    var height = clone.addClass('mhe-clone-remove').css({'position': 'absolute', 'top': '-100%', 'display': 'block', 'max-height': 'none', 'height': 'auto', 'visibility': 'hidden'}).prependTo(el.parent()).outerHeight()
    // Destroy the clone.
    $('.mhe-clone-remove').remove()

    return height
  }

  /**
   * isEmpty
   * Checks if a value is empty, undefined or false.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.isEmpty = function (value) {
    return (value === undefined || value === null || value === '' || value.length === 0)
  }

  /**
   * debounce
   * Returns a function, that, as long as it continues to be invoked, will not
   * be triggered. The function will be called after it stops being called for
   * N milliseconds. If `immediate` is passed, trigger the function on the
   * leading edge, instead of the trailing.
   *
   * $(window).on('resize', Module.test)
   *
   * Module.test = window.Helpers.debounce(function () {
   *     console.log('This has been debounced')
   * }, 250)
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.debounce = function (func, wait, immediate) {
    var timeout

    return function () {
      var _this = this
      var args = arguments

      var later = function () {
        timeout = null
        if (!immediate) {
          func.apply(_this, args)
        }
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) {
        func.apply(_this, args)
      }
    }
  }

  /**
   * ajax
   * Returns a simple Ajax request. Should use the result with a promise.
   * Will automatically parse any URL parameters and place them in the JSON
   * body instead.
   *
   * @since 1.0.0
   * @version 1.0.0
  */
  Helpers.ajax = function (url, data, type, dataType) {
    var _this = this

    return $.ajax({
      url: url,
      type: (!_this.isEmpty(type)) ? type : 'GET',
      dataType: (!_this.isEmpty(dataType)) ? dataType : 'JSON',
      data: $.extend({}, {ajaxrequest: true}, this.parseURLParams(url), (data || {})),
      beforeSend: function (jqXHR, settings) {
        // Log full URL.
        this.log((settings.data) ? settings.url + '?' + settings.data : settings.url)
      }
    })
  }

  /**
   * parseURLParams
   * Converts the URL parameters into an object.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.parseURLParams = function (url) {
    // Check if URL contains a ?.
    if (url && url.indexOf('?') !== -1) {
      // Split URL at ?
      let urlSplit = url.split('?')
      let urlParsed = urlSplit[1]
      let urlParams = (!this.isEmpty(urlParsed)) ? urlParsed : false

      if (urlParams) {
        return  {url: urlSplit[0], params: JSON.parse('{"' + decodeURI(urlParams).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')}
      }
    }

    return false
  }

  /**
   * parseParamObject
   * Converts an object in URL parameters.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.parseParamObject = function (obj) {
    let str = ''
    for (let key in obj) {
      if (str != '') {
        str += '&'
      } else {
        str += '?'
      }
      str += key + '=' + encodeURIComponent(obj[key])
    }

    return str
  }

  /**
   * decodeEntities
   * Decodes HTML entities.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.decodeEntities = function (string) {
    // Create pseudo element.
    var pseudo = document.createElement('textarea')
    // Decode.
    pseudo.innerHTML = string

    return pseudo.value
  }

  /**
   * updateURLParameter
   * Updates the URL parameters.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.updateURLParameter = function (uri, key, value) {
    let re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i')
    let separator = uri.indexOf('?') !== -1 ? '&' : '?'

    if (!value || value === 'null' || value === 'undefined') {
      return uri.replace(re, '')
    }

    return (uri.match(re)) ? uri.replace(re, '$1' + key + '=' + value + '$2') : uri + separator + key + '=' + value
  }

  /**
   * isInt
   * Checks var is integer.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.isInt = function (n) {
    return n === +n && n === (n|0)
  }

  /**
   * guid
   * Creates a unique ID.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.guid = function () {
    return Math.random().toString(36).substr(2, 9)
  }

  /**
   * updateURL
   * Updates the URL.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.updateURL = function (key, value) {
    window.history.pushState(null, null, this.updateURLParameter(window.location.href, key, encodeURIComponent(value)))
  }

  // Export
  module.exports = Helpers
}({}, window))

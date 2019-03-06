/**
 *
 * Helpers
 *
 * Copyright 2019, Author Name
 * Some information on the license.
 *
**/

;(function(Helpers, window) 
{

  /**
   * log
   * Customised and cross browser console.log.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.log = function(message, type, alertlog) 
  {
    if (process.env.NODE_ENV !== 'production') {
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
   * throw
   * Throws a custom error.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.throw = function(msg) 
  {
    throw new Error(msg)
  }

  /**
   * breakpoint
   * Checks the window against a certain breakpoint.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.breakpoint = function(breakpoint) 
  {
    return (window.innerWidth <= breakpoint)
  }

  /**
   * mhe
   * Measures a hidden element.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.mhe = function(el) 
  {
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
  Helpers.isEmpty = function(value) 
  {
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
   * Module.test = window.Helpers.debounce(function() {
   *     console.log('This has been debounced')
   * }, 250)
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.debounce = function(func, wait, immediate) 
  {
    var timeout

    return function() {
      var _this = this
      var args = arguments

      var later = function() 
      {
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
   * parseURLParams
   * Converts the URL parameters into an object.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.parseURLParams = function(url) 
  {
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
  Helpers.parseParamObject = function(obj) 
  {
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
  Helpers.decodeEntities = function(string) 
  {
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
  Helpers.updateURLParameter = function(uri, key, value) 
  {
    let re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i')
    let separator = uri.indexOf('?') !== -1 ? '&' : '?'

    if (!value || value === 'null' || value === 'undefined') {
      return uri.replace(re, '')
    }

    return (uri.match(re)) ? uri.replace(re, '$1' + key + '=' + value + '$2') : uri + separator + key + '=' + value
  }

  /**
  * cssSafeName
  * Make string safe for CSS class.
  *
  * @since 1.0.0
  * @version 1.0.0
  **/
  Helpers.cssSafeName = function(string) 
  {
    return string.replace(/[^a-z0-9]/g, function(s) {
      var c = s.charCodeAt(0)
      if (c == 32) return '-'
      if (c >= 65 && c <= 90) return '_' + s.toLowerCase()
      return '__' + ('000' + c.toString(16)).slice(-4)
    })
  }

  /**
   * isInt
   * Checks var is integer.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.isInt = function(n) 
  {
    return n === +n && n === (n|0)
  }

  /**
   * guid
   * Creates a unique ID.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.guid = function() 
  {
    return Math.random().toString(36).substr(2, 9)
  }

  /**
   * updateURL
   * Updates the URL.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.updateURL = function(key, value) 
  {
    window.history.pushState(null, null, this.updateURLParameter(window.location.href, key, encodeURIComponent(value)))
  }

  /**
  * isAlphanumeric
  * Check string is alphanumeric.
  *
  * @since 1.0.0
  * @version 1.0.0
  **/
  Helpers.isAlphanumeric = function(e) 
  {
    // Regex to allow letters, numbers and spaces.
    let regex = new RegExp(/^[a-z\d\-_\s]+$/i)
    // Check character code.
    let str = String.fromCharCode(!e.charCode ? e.which : e.charCode)

    return (e.keyCode === 8 || e.target.value === '' || regex.test(str))
  }

  /**
   * splitArrayIntoChunks
   * Updates the URL.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  Helpers.splitArrayIntoChunks = function(arr, n) 
  {
    var rest = arr.length % n,
        restUsed = rest,
        partLength = Math.floor(arr.length / n),
        result = []

    for (var i = 0; i < arr.length; i += partLength) {
      var end = partLength + i,
          add = false

      if (rest !== 0 && restUsed) {
        end++
        restUsed--
        add = true
      }

      result.push(arr.slice(i, end))

      if (add) {
        i++
      }
    }

    return result
  }

  /**
  * alert
  * Customised alert().
  *
  * @since 1.0.0
  * @version 1.0.0
  **/
  Helpers.alert = function(title, body) 
  {
    // Check for an existing modal.
    if ($('.obj-alert').length) $('.obj-alert').remove()

    // Define modal.
    const tpl = `<div class="obj-alert">
      <div class="obj-alert__window">
        <div class="obj-alert__window__header">
          <div class="obj-alert__window__header__title">` + title + `</div>
        </div>
        <div class="obj-alert__window__main">
          ` + body + `
        </div>
        <div class="obj-alert__window__footer">
          <button class="positive" data-close>Okay</button>
        </div>
      </div>
    </div>`
    // Get 10% of document height.
    let docHeight = ($(window).height() / 100) * 10
    // Add to body.
    $('body').append(tpl)
    // Set maxium height.
    $('.obj-alert__window').css({'maxHeight': ($(window).height() - docHeight)})
    // Wait and show modal.
    setTimeout(() => {
      $('.obj-alert').addClass('active')
    }, 50)
    // Click events.
    $('[data-close]').on('click', () => {
      $('.obj-alert').remove()
    })
  }

  /**
  * confirm
  * Customised confirm().
  *
  * @since 1.0.0
  * @version 1.0.0
  **/
  Helpers.confirm = function(title, body, confirmCallback, refuteCallback) 
  {
    // Check for an existing modal.
    if ($('.obj-alert').length) $('.obj-alert').remove()

    // Define modal.
    const tpl = `<div class="obj-alert">
      <div class="obj-alert__window">
        <div class="obj-alert__window__header">
          <div class="obj-alert__window__header__title">` + title + `</div>
        </div>
        <div class="obj-alert__window__main">
          ` + body + `
        </div>
        <div class="obj-alert__window__footer">
          <button class="positive" data-confirm>Yes</button>
          <button class="negative" data-refute>No</button>
        </div>
      </div>
    </div>`
    // Get 10% of document height.
    let docHeight = ($(window).height() / 100) * 10
    // Add to body.
    $('body').append(tpl)
    // Set maxium height.
    $('.obj-alert__window').css({'maxHeight': ($(window).height() - docHeight)})
    // Wait and show modal.
    setTimeout(() => {
      $('.obj-alert').addClass('active')
    }, 50)
    // Click events.
    $('[data-confirm]').on('click', () => {
      $('.obj-alert').remove()
      if (confirmCallback) confirmCallback()
    })
    $('[data-refute]').on('click', () => {
      $('.obj-alert').remove()
      if (refuteCallback) refuteCallback()
    })
  }

  /**
  * modal
  * Modal window.
  *
  * @since 1.0.0
  * @version 1.0.0
  **/
  Helpers.modal = function(body, type, destroy) 
  {
    // Check for an existing modal.
    if ($('.obj-modal').length) $('.obj-modal__window').remove()
    // Check for destroy.
    if (destroy) return $('.obj-modal').remove()

    // Set the type of size modal.
    type = (!type) ? '' : type
    // Define wrapper.
    const wrapper = `<div class="obj-modal"></div>`
    // Define modal
    const modal = `<div class="obj-modal__window">
      <div class="obj-modal__window__main">
        <div class="page__content text-align-center">` + body + `</div>
      </div>
    </div>`
    // Get 10% of document height.
    let docHeight = ($(window).height() / 100) * 10
    // Add to body.
    if (!$('.obj-modal').length) {
      $('body').append(wrapper)
    }
    // Add to wrapper.
    $('.obj-modal').append(modal)
    // Set maxium height.
    $('.obj-modal__window').addClass(type).css({'maxHeight': ($(window).height() - docHeight)})
    // Wait and show modal.
    setTimeout(() => {
      $('.obj-modal').addClass('active')
    }, 50)
  }

  // Export
  module.exports = Helpers

}({}, window))
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
  var suggester = {}
  // Set helpers object.
  var helpers = {}

  /**
  * Plugin
  * Return a unique plugin instance.
  **/
  var Plugin = function (elem, options) {
    this.elem     = elem
    this.$elem    = $(elem)
    this.options  = options
    this.metadata = this.$elem.data('plugin-options')
  }

  /**
  * $.fn.validation
  * Return a unique plugin instance.
  **/
  $.fn.validation = function (options) {
    return this.each(function () {
      new Plugin(this, options).init()
    })
  }

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
    successCallback: function (parameters){ }
  }

  /**
  * Plugin.prototype
  * Init.
  **/
  Plugin.prototype = {
    init: function () {
      // Global settings.
      this.settings = $.extend({}, $.fn.validation.defaults, this.options)
      // Cache fields.
      this.fields = $('input, select, textarea', this.$elem)
      // Cache the reset button element.
      this.reset = $('button[type="reset"], input[type="reset"]', this.$elem)
      // Cache the submit button element.
      this.button = $('button[type="submit"], input[type="submit"]', this.$elem)
      // Success element.
      this.successElement = (this.settings.successElement.length) ? this.settings.successElement : this.$elem.before($('<div class="js--validation-form-success">' + this.settings.defaultSuccessMsg + '</div>'))
      // Empty array for elements. Set once the form is submitted.
      this.$elementArray = []
      // Do jQuery events.
      this.events()
      // Run the plugin.
      this.run()

      return this
    },
    events: function () {
      var _this = this

      // On submit.
      this.$elem.on('submit', function (e) {
        e.preventDefault()

        _this.setFields()
        _this.process()
      })
      // On reset.
      this.reset.on('click', function (e) {
        _this.validationReset(e)
      })
      // On field change.
      this.fields.change(function () {
        _this.saveToLocalStorage($(this))
      })
    },
    run: function () {
      // Add 'novalidate' attribute to form.
      this.$elem.attr('novalidate', 'true')
      // Process fields.
      this.processFields()
      // Get localStorage.
      this.getLocalStorage()
    },
    setFields: function () {
      var _this = this

      // Put all required fields into array.
      var fieldsArray = $('[required]', this.$elem).map(function () {
        if (_this.settings.onlyVisibleFields) {
          if ($(this).is(':visible')) {
            return $(this).attr('name')
          }
        } else {
          return $(this).attr('name')
        }
      })
      // Remove duplicates (jQuery.unique only works on DOM elements, we can't use DOM elements because they are ALL unique despite the same name).
      fieldsArray = helpers.removeDuplicates(fieldsArray)
      // Reverts the fieldsArray into an array of DOM elements.
      this.$elementArray = $.map(fieldsArray, function (field, i) {
        return $('[name="' + field + '"]', _this.$elem)
      })
    },
    processFields: function () {
      var _this = this

      // Put all required fields into array.
      var fieldsArray = $('[required]', this.$elem).map(function () {
        if (_this.settings.onlyVisibleFields) {
          if ($(this).is(':visible')) {
            return $(this).attr('name')
          }
        } else {
          return $(this).attr('name')
        }
      })
      // Remove duplicates (jQuery.unique only works on DOM elements, we can't use DOM elements because they are ALL unique despite the same name).
      fieldsArray = helpers.removeDuplicates(fieldsArray)
      // Reverts the fieldsArray into an array of DOM elements.
      this.$elementArray = $.map(fieldsArray, function (field, i) {
        return $('[name="' + field + '"]', _this.$elem)
      })

      $.each(this.$elementArray, function () {
        // Field type specific actions.
        switch($(this).attr('type')){
          case 'email':
          _this.setupEmailField($(this))
          break
          case 'url':
          _this.setupURLField($(this))
          break
        }
      })
    },
    setup: function () {
      // Global error array.
      this.errorArray = []
      // Create an array for checkboxes and radio inputs.
      this.groupArray = []
      // Create an array for messages that have no fields.
      this.leftovers = []
    },
    ajaxRequest: function (url, data) {
      return $.ajax({
        type: 'POST',
        url: url,
        data: $.extend({}, {ajaxrequest: true}, helpers.parseURLParams(data), (this.settings.serverData || {})),
        dataType: 'JSON',
        beforeSend: function (jqXHR, settings) {
          // Log full URL.
          helpers.log((settings.data) ? settings.url + '?' + settings.data : settings.url)
        }
      })
    },
    applyPreloader: function (el) {
      // Guard :: Check element exists.
      if (!el.length) return

      // Content.
      var content = JSON.stringify(el.html())
      // Loader.
      var loader = $(this.settings.preloaderTemplate).hide()
      // Apply preloader.
      el.css({
        'width'   : el.outerWidth(),
        'height'  : el.outerHeight(),
        'position': 'relative'
      }).html(loader).attr('data-loader-content', content).addClass('loading')
      loader.css({
        'position'   : 'absolute',
        'top'        : '50%',
        'left'       : '50%',
        'margin-left': -loader.outerWidth() / 2,
        'margin-top' : -loader.outerHeight() / 2
      }).show()
    },
    destroyPreloader: function (el) {
      // Guard :: Check element exists.
      if (!el.length) return

      // Content.
      var content = JSON.parse(el.data('loader-content'))
      // Remove preloader
      el.removeClass('loading').html(content).removeAttr('data-loader-content').css({
        'width'   : '',
        'height'  : '',
        'position':''
      })
    },
    disableButton: function (disable) {
      if (this.settings.disableButtons) {
        // Disable
        if (disable) {
          // Disable the submit button.
          this.button.prop('disabled', true)
        } else {
          // Enable the submit button.
          this.button.prop('disabled', false)
        }
      }
    },
    clearLocalStorage: function () {
      this.fields.each(function () {
        localStorage.removeItem($(this).attr('name'))
      })
    },
    getLocalStorage: function () {
      if (this.settings.localStorage && typeof(Storage) !== 'undefined') {
        this.fields.each(function () {
          // Vars
          var inputName = $(this).attr('name')

          if (localStorage[inputName]) {
            if ($(this).is('select')) {
              $('option[selected="selected"]', this).removeAttr('selected')
              $('option[value="' + localStorage[inputName] + '"]', this).prop('selected', true)
            }
            else if ($(this).is('input[type="radio"]')) {
              if ($(this).val() == localStorage[inputName]) {
                $(this).prop('checked', true)
              }
            }
            else if ($(this).is('input[type="checkbox"]')) {
              var checkboxes = localStorage[inputName].split(',')
              $('input[name="' + inputName + '"]').each(function (i) {
                if (checkboxes[i] != '' && $(this).val() == checkboxes[i]) {
                  $(this).prop('checked', true)
                }
              })
            } else {
              $(this).val(localStorage[inputName])
            }
          }
        })
      }
    },
    saveToLocalStorage: function (el) {
      // Guard :: Check element exists.
      if (!el.length) return

      if (this.settings.localStorage && typeof(Storage) !== 'undefined') {
        // Vars
        var inputName = el.attr('name')

        if (el.is('input[type="checkbox"]')) {
          // Vars
          var checkboxArray = []

          $('input[name="' + inputName + '"]').each(function (i) {
            if ($(this).is(':checked')) {
              checkboxArray.push($(this).val())
            } else {
              checkboxArray.push('')
            }
          })
          localStorage[inputName] = checkboxArray
        } else {
          localStorage[inputName] = el.val()
        }
      }
    },
    setupEmailField: function (el) {
      var _this = this

      // Guard :: Check element exists.
      if (!el.length) return

      el.after($('<div class="js--validation-suggestion">' + this.settings.defaultSuggestText + ' <a href="#" class="js--validation-alternative-email"><span class="js--validation-address">address</span>@<span class="js--validation-domain">domain.com</span></a>?</div>'))

      el.on('blur', function () {
        suggester.init(_this, el, _this.settings.domains)
      })
    },
    setupURLField: function (el) {
      // Guard :: Check element exists.
      if (!el.length) return

      el.on('blur', function () {
        var value = el.val()
        if (value !== '' && !value.match(/^http([s]?):\/\/.*/)) {
          el.val('http://' + value)
        }
      })
    },
    resetErrors: function (form) {
      // Set form.
      form = (typeof form !== 'undefined') ? form : this
      // Remove error class from form.
      form.$elem.removeClass('js--validation-form-has-errors')
      // Remove generic form messages.
      $('.js--validation-form-messages').empty()
      // Remove error class from fields.
      $('.js--validation-field-has-errors', form.$elem).removeClass('js--validation-field-has-errors')
      // Remove error class from fieldsets.
      $('.js--validation-fieldset-has-errors', form.$elem).removeClass('js--validation-fieldset-has-errors')
      // Remove error class from inputs with placeholder error..
      $('.js--validation-field--placeholder', form.$elem).removeClass('js--validation-field--placeholder')
      $('.js--validation-field--placeholder--span', form.$elem).remove()
      // Hide email suggester.
      $('.js--validation-suggestion', form.$elem).hide()
      // Remove current classes.
      $('.' + form.settings.errorClass, form.$elem).removeClass(form.settings.errorClass)
      $('.' + form.settings.errorBoxClass, form.$elem).remove()
    },
    attachErrors: function (arr) {
      var _this = this

      // Remove empty elements.
      arr = jQuery.grep(arr, function (n, i) {
        return (n !== "" && n != null)
      })
      // Remove previous errors.
      this.resetErrors()
      // Un-disable stuff.
      this.disableButton(false)
      // Add error class to form.
      this.$elem.addClass('js--validation-form-has-errors')
      // Add new ones.
      $.each(arr, function (index) {
        if ($(this) == undefined){return }
        var a = $(this),
        el = a[0].input

        // Get error message.
        var error = (a[0].msg !== '') ? a[0].msg : _this.settings.defaultErrorMsg
        // Separator.
        var message = (_this.settings.msgSep) ? (error) ? _this.settings.msgSep + ' <span class="js--validation-msg">' + error + '</span>' : '' : '<span class="js--validation-msg">' + error + '</span>'

        // Check element exists in the DOM.
        if (el.length && el.is(':input') && el.attr('type') !== 'hidden') {
          // Apply error class to field.
          el.addClass(_this.settings.errorClass).parent('.obj-form-field').addClass('js--validation-field-has-errors')
          // Field specific actions.
          if (el.attr('type') === 'checkbox' || el.attr('type') === 'radio') {
            // Add error element to field.
            el.closest('.obj-form-field').find('label, .label').first().append($(_this.settings.errorBoxElement).addClass(_this.settings.errorBoxClass).html(message))
            // Apply to nearest label if checkbox or radio.
            el.closest('label').addClass(_this.settings.errorClass)
          } else {
            if (_this.settings.appendErrorToPlaceholder) {
              // Find label.
              el.parent().find('label, .label').addClass(_this.settings.errorClass)
              // Check value length.
              if (el.val().length > 0) {
                // Add error class to placeholder.
                el.parent('.obj-form-field').addClass('js--validation-field--placeholder')
                // Add a span to the field.
                el.before('<span class="js--validation-field--placeholder--span">' + error + '</span>')
              } else {
                // Add error to placeholder.
                el.attr('placeholder', error)
              }
            } else {
              // Add error element to field.
              el.parent().find('label, .label').append($(_this.settings.errorBoxElement).addClass(_this.settings.errorBoxClass).html(message))
            }
          }
          // Set errors on fieldset.
          el.closest('fieldset').addClass('js--validation-fieldset-has-errors')
          // Scroll to first error field.
          if (index == 0 && _this.settings.scrollToError) {
            // Determine fieldset.
            var fieldset = el.parentsUntil('fieldset').parent()
            // Check if el has parent fieldset.
            if (fieldset.length) {
              $('html, body').animate({
                scrollTop: (fieldset.offset().top - 25)
              }, 500)
            } else {
              $('html, body').animate({
                scrollTop: (el.offset().top - 25)
              }, 500)
            }
          }
        }
        else if (!el.is(':input')) {
          el.prepend('<p>' + error + '</p>').show()
        } else {
          _this.leftovers.push(error)
        }
      })
    },
    fieldChecker: function (field) {
      var obj
      var msg = field.data('validation-message') || ''

      // Checkboxes and radio.
      if ((field.attr('type') === 'checkbox' || field.attr('type') === 'radio') && field.serializeArray().length == 0) {
        return obj = {
          input: field,
          msg  : msg
        }
      }
      // Email fields.
      else if (field.attr('type') === 'email' && !this.settings.emailRegEx.test(field.val())) {
        return obj = {
          input: field,
          msg  : msg
        }
      }
      // URL fields.
      else if (field.attr('type') === 'url' && !this.settings.urlRegEx.test(field.val())) {
        return obj = {
          input: field,
          msg  : msg
        }
      }
      // Check for existence.
      else if (field.val() === '' || field.val() === 'undefined' || field.val() === undefined || field.val() === '-') {
        return obj = {
          input: field,
          msg  : msg
        }
      }
    },
    jsValidateFields: function () {
      var _this = this

      // Put all empty fields into array.
      this.errorArray = $.map(this.$elementArray, function (field, i) {
        return _this.fieldChecker(field)
      })
      // Custom validation method.
      if ($.isFunction(this.settings.customValidationMethod)) {
        _this.errorArray.push(_this.settings.customValidationMethod())
      }
      // Validate non required fields with length.
      this.$elem.find(this.settings.validateElement).each(function () {
        if ($(this).val() !== '') {
          _this.errorArray.push(_this.fieldChecker($(this)))
        }
      })

      // Array of elements for the callback.
      var formEntries = null

      return (_this.errorArray.length === 0 && !fatalerror) ?  _this.success('js', formEntries) : _this.validationFailure()
    },
    serverValidateFields: function () {
      var _this = this

      // Check for a form action.
      if (_this.settings.serverURL) {
        // Set flag.
        var fatalerror = false
        // Ajax request.
        var ajaxPromise = _this.ajaxRequest(_this.settings.serverURL, _this.$elem.serialize())
        // Process promise.
        ajaxPromise.done(function (res) {
          // If error.
          if (res.type == 'error') {
            if (typeof res.response == 'object') {
              // Loops through the response and adds them to the errorArray.
              for(var i = 0, ii = res.response.length; i < ii; i++){
                var obj = {
                  input: (res.response[i].field.indexOf('.') === 0) ? $(res.response[i].field) : $('[name="' + res.response[i].field + '"]', _this.$elem),
                  msg  : res.response[i].msg
                }
                _this.errorArray.push(obj)
              }
            }
          }
          // Array of elements for the callback.
          var formEntries = _this.$elem.serializeArray()

          return (_this.errorArray.length === 0 && !fatalerror) ?  _this.success('server', formEntries, res) : _this.validationFailure()
        }).fail(function (res, ajaxOptions, thrownError) {
          // Log it.
          helpers.log(thrownError)
          // Set error.
          fatalerror = true
        })
      } else {
        // Error message.
        helpers.log("You must supply a valid URL with the serverURL option in order to use server validation.")

        return this.validationFailure()
      }
    },
    success: function (type, callbackParameters, formResponse) {
      var _this = this

      // Clear localStorage.
      this.clearLocalStorage()
      // If we have a custom post function.
      if (type == 'server') {
        this.$elem.fadeOut(this.settings.fadeOutAnimationSpeed, function () {
          // Validation Complete.
          _this.validateSuccess()
          // Fade in success element.
          _this.$elem.parent().find(_this.successElement).fadeIn((_this.settings.fadeOutAnimationSpeed / 2))
          // Callback
          _this.settings.successCallback.call(this, callbackParameters, formResponse)
        })
      } else if (!this.settings.disableAjax && type == 'js') {
        // Ajax request.
        var ajaxPromise = this.ajaxRequest(this.settings.serverURL, this.$elem.serialize() + '&' + this.settings.serverID + '=true')

        // Process promise.
        ajaxPromise.always(function (response) {
          _this.$elem.fadeOut(_this.settings.fadeOutAnimationSpeed, function () {
            // Validation Complete.
            _this.validateSuccess()
            // Fade in success element.
            _this.$elem.parent().find(_this.successElement).fadeIn((_this.settings.fadeOutAnimationSpeed / 2))
            // Callback
            _this.settings.successCallback.call(_this, callbackParameters)
          })
        })
      } else {
        // Unbind submit.
        this.$elem.unbind('submit')
        // Validation Complete.
        this.validateSuccess()
        // Callback
        this.settings.successCallback.call(this, callbackParameters)
        // Trigger submit after unbind.
        this.$elem.trigger('submit')
      }
    },
    process: function () {
      // Apply preloader.
      this.applyPreloader(this.button)
      // Disable stuff.
      this.disableButton(true)
      // Run setup this.
      this.setup()
      // Check validation type.
      if (this.settings.serverValidation) {
        // If we are doing server validation.
        this.serverValidateFields()
      } else {
        // If we are not doing server validation.
        this.jsValidateFields()
      }
    },
    validateSuccess: function () {
      // Destroy preloader.
      this.destroyPreloader(this.button)
      // Reset validation.
      this.validationReset()
    },
    validationFailure: function () {
      var _this = this

      // Process for 0.5 second.
      setTimeout(function () {
        // Set errors
        _this.attachErrors(_this.errorArray, _this.$elem)
        // Destroy preloader.
        _this.destroyPreloader(_this.button)
      }, 500)
    },
    validationReset: function () {
      // Destroy preloader.
      this.destroyPreloader(this.button)
      // Un-disable stuff.
      this.disableButton(false)
      // Remove errors.
      this.resetErrors()
      // Clear localStorage.
      this.clearLocalStorage()
      // Reset all field values.
      this.$elem.find('input[type="text"], input[type="email"], input[type="url"], textarea, select').val('')
    }
  }

  /**
   *
   * init
   * NULLED.
   *
  **/
  suggester.init = function (form, el, pluginDomains) {
    // Default domains
    var defaultDomains = [
      'aol.com',
      'bellsouth.net',
      'btinternet.com',
      'btopenworld.com',
      'blueyonder.co.uk',
      'comcast.net',
      'cox.net',
      'gmail.com',
      'google.com',
      'googlemail.com',
      'hotmail.co.uk',
      'hotmail.com',
      'hotmail.fr',
      'hotmail.it',
      'icloud.com',
      'live.com',
      'mac.com',
      'mail.com',
      'me.com',
      'msn.com',
      'o2.co.uk',
      'orange.co.uk',
      'outlook.com',
      'outlook.co.uk',
      'sbcglobal.net',
      'verizon.net',
      'virginmedia.com',
      'yahoo.com',
      'yahoo.co.uk',
      'yahoo.com.tw',
      'yahoo.es',
      'yahoo.fr'
    ]
    // Extend the domains array with those from the plugin settings.
    this.domains = $.extend(true, defaultDomains, pluginDomains)

    var emailVal = el.val()
    var matchVal = suggester.getMatch(emailVal)

    this.suggestion = el.next('.js--validation-suggestion')
    this.reveal(form, el, matchVal)
  }

  /**
   *
   * getMatch
   * NULLED.
   *
  **/
  suggester.getMatch = function (query) {
    var limit = 99
    var query = query.split('@')

    for(var i = 0, ii = this.domains.length; i < ii; i++){
      var distance = suggester.levenshteinDistance(this.domains[i], query[1])
      if (distance < limit) {
        limit = distance
        var domain = this.domains[i]
      }
    }
    if (limit <= 2 && domain !== null && domain !== query[1]) {
      return{
        address: query[0],
        domain: domain
      }
    } else {
      return false
    }
  }

  /**
   *
   * levenshteinDistance
   * NULLED.
   *
  **/
  suggester.levenshteinDistance = function (a, b) {
    var c = 0
    var d = 0
    var e = 0
    var f = 0
    var g = 5

    if (a == null || a.length === 0) {
      if (b == null || b.length === 0) {
        return 0
      } else {
        return b.length
      }
    }
    if (b == null || b.length === 0) {
      return a.length
    }

    while(c + d < a.length && c + e < b.length){
      if (a[c + d] == b[c + e]) {
        f++
      } else {
        d = 0
        e = 0
        for(var h = 0; h < g; h++){
          if (c + h < a.length && a[c + h] == b[c]) {
            d = h
            break
          }
          if (c + h < b.length && a[c] == b[c + h]) {
            e = h
            break
          }
        }
      }
      c++
    }
    return (a.length + b.length) / 2 - f
  }

  /**
   *
   * reveal
   * NULLED.
   *
  **/
  suggester.reveal = function (form, el, result) {
    if (result) {
      Plugin.prototype.resetErrors(form)
      // Set email address.
      $('.js--validation-address', this.suggestion).text(result.address)
      // Set email domain.
      $('.js--validation-domain', this.suggestion).text(result.domain)
      // Reveal suggestion.
      this.suggestion.stop(true, false).slideDown(350)
      // Click event.
      $('.js--validation-alternative-email').on('click', function (e) {
        e.preventDefault()

        // Apply suggestion.
        el.val(result.address + '@' + result.domain)
        // Hide suggestion.
        suggester.suggestion.stop(true, false).slideUp(350)
      })
    }
  }

  /**
   *
   * removeDuplicates
   * Remove duplicates from an array.
   *
  **/
  helpers.removeDuplicates = function (array) {
    var result = []
    $.each(array, function (i, e) {
      if ($.inArray(e, result) == -1) {
        result.push(e)
      }
    })

    return result
  }

  /**
   *
   * log
   * Returns a cross-browser safe message in the console.
   *
  **/
  helpers.log = function (message, alertlog) {
    alertlog = (typeof alertlog === 'undefined') ? false : true
    if (typeof console === 'undefined' || typeof console.log === 'undefined') {
      if (alertlog) {
        alert(message)
      }
    }
    else {
      console.log('%c-- jQuery Form Validation ---------------------------------------------------------', 'color:#c5211d;font-weight:bold;')
      console.log('%c' + message, 'color:#c5211d;')
      console.log('%c-- jQuery Form Validation ---------------------------------------------------------', 'color:#c5211d;font-weight:bold;')
      console.log('')
    }
  }

  /**
   *
   * parseURLParams
   * Converts the URL parameters into an object.
   *
  **/
  helpers.parseURLParams = function (str) {
    return JSON.parse('{"' + decodeURI(str).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
  }

})(jQuery, window)

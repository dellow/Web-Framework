/**
 *
 * Class
 *
 * Copyright 2018, Author Name
 * Some information on the license.
 *
**/

class Validation {

  /**
   * init
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  init ($el, settings) {
    // Settings for this module.
    this._settings = {
      defaultSuccess: 'Looks good.',
      validationType: 'server', // 'server' or 'client'
      failIfFieldNotFound: false,
      highlightSuccessFields: true,
      failureURL: '',
      rules: {
        nameOrId: {
          rule: 'required|string',
          messages: {
            required: 'This field is required',
            string: 'Must be a string'
          }
        }
      }
    }
    // Merge settings.
    this._settings = Object.assign(this._settings, settings)
    // DOM elements for this module.
    this._dom = {
      form: $el
    }
    // State for this module.
    this.state = {
      formSubmitted: false
    }

    // Guard :: Check for rules object.
    if (this._settings.validationType === 'client' && (typeof rules === 'undefined' || rules === null)) return
    // Globalise the rules.
    this.rules = this._settings.rules
    // Start events.
    this.events()
  }

  /**
   * events
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  events () {
    // Extend the events system.
    window.Events.extend({
      events: {
        ['submit ' + this._dom.form]: 'initValidation'
      },
      initValidation: (e) => {
        // Check if form has been submitted before.
        if (!this.state.formSubmitted) {
          e[0].preventDefault()

          // Cache form.
          this.$form = $(e[0].currentTarget)
          // Start preloader.
          this.startPreloaders()
          // Create fields array.
          this.fieldsArray = []
          // Check settings for Ajax use.
          if (this._settings.validationType === 'server') {
            return this.startServerSideValidation()
          }

          return this.startClientSideValidation()
        }
      }
    })
  }

  /**
   * startPreloaders
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  startPreloaders () {
    // Button preloader.
    window.App.preloaders.button($('button[type="submit"]', this._dom.form))
  }

  /**
   * destroyPreloaders
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  destroyPreloaders () {
    // Button preloader.
    window.App.preloaders.button($('button[type="submit"]', this._dom.form), true)
  }

  /**
   * startServerSideValidation
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  startServerSideValidation () {
    // Ajax request.
    window.Axios.post(this.$form.attr('action'), this.$form.serialize()).then((res) => {
      // Clear current errors.
      this.reset()
      // Check status and error object.
      if (res.status === 200 && res.data.status === 'error' && res.data.type === 'array' && !window.Helpers.isEmpty(res.data.payload)) {
        // Log it.
        window.Helpers.log('Validation.js - Errors found in form')
        // Remove preloaders.
        this.destroyPreloaders()
        // Create counter.
        let counter = 0
        // Loop through the returned data.
        for (let key in res.data.payload) {
          // Get element.
          let $element = this._findDomElement(key)
          // Is first error.
          let isFirstError = (counter === 0)
          // Check element.
          if ($element) {
            // Highlight fields.
            this.highlightDomElementError($element, res.data.payload[key], isFirstError)
          }
          counter++
        }
      } else if (res.status === 200 && res.data.type === 'redirect') { // This might be error or success.
        // Redirect.
        window.location.replace(res.data.url)
      } else { // Success.
        // Update state.
        this.state.formSubmitted = true
        // Resubmit the form.
        this.$form.submit()
      }
    }).catch((err) => {
      // Log it.
      window.Helpers.log('Validation.js - Server error', 'negative')
      console.log(err)
      // Redirect to failure URL.
      if (this._settings.failureURL !== '') {
        window.location.replace(this._settings.failureURL)
      }
    })
  }

  /**
   * startClientSideValidation
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  startClientSideValidation () {
    // Clear current errors.
    this.reset()
    // Remove preloaders.
    this.destroyPreloaders()
    // Loop through the rules.
    for (let fieldName in this.rules) {
      // Cache the field.
      let fieldValidationRule = this.rules[fieldName]
      // Turn the rule into an array.
      let rulesArray = fieldValidationRule.rule.split('|')
      // Loop through the rules array and make sure there is a corresponding message incase it fails.
      for (let i = 0, ii = rulesArray.length; i < ii; i++) {
        // Cache rule.
        if (rulesArray[i].indexOf(':') !== -1) {
          var subRules = rulesArray[i].split(':')
          var ruleName = subRules[0]
        } else {
          var ruleName = rulesArray[i]
        }
        // Check rule has a message and it's not empty.
        if (!fieldValidationRule.messages.hasOwnProperty(ruleName) || window.Helpers.isEmpty(fieldValidationRule.messages[ruleName])) {
          // Throw an error.
          throw new Error('All rules must have a corresponding message.')
        }
      }
    }

    return this.checkFieldsExist()
  }

  /**
   * checkFieldsExist
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  checkFieldsExist () {
    // Loop through the rules.
    for (let fieldName in this.rules) {
      // Set field object.
      this.rules[fieldName].dom = this._findDomElement(fieldName)
      // Add to array.
      this.fieldsArray.push(this.rules[fieldName])
    }

    return this.runValidationRules()
  }

  /**
   * runValidationRules
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  runValidationRules () {
    // Guard :: Make sure fields is not empty.
    if (window.Helpers.isEmpty(this.fieldsArray)) {
      // Throw an error.
      throw new Error('There are no fields to validate.')
    }

    // Loop through all fields.
    for (let i = 0, ii = this.fieldsArray.length; i < ii; i++) {
      // Validated flag.
      let validated = null
      // Error array.
      let errors = []
      // Cache the field.
      let field = this.fieldsArray[i]
      // Get rules as array.
      let rulesArray = field.rule.split('|')
      // Get DOM value.
      let validationValue = field.dom.val()
      // Loop through each rule and check the DOM element value against it.
      for (let i = 0, ii = rulesArray.length; i < ii; i++) {
        // Cache rule.
        if (rulesArray[i].indexOf(':') !== -1) {
          var subRules = rulesArray[i].split(':')
          var ruleName = subRules[0]
        } else {
          var ruleName = rulesArray[i]
        }
        // Test rules array.
        switch (ruleName) {
          case 'array' :
            validated = this._validateArray(validationValue)
            break
          case 'between' :
            validated = this._validateBetween(validationValue)
            break
          case 'boolean' :
            validated = this._validateBoolean(validationValue)
            break
          case 'email' :
            validated = this._validateEmail(validationValue)
            break
          case 'in' :
            validated = this._validateIn(validationValue)
            break
          case 'integer' :
            validated = this._validateInteger(validationValue)
            break
          case 'max' :
            validated = this._validateMax(validationValue, subRules[1])
            break
          case 'min' :
            validated = this._validateMin(validationValue, subRules[1])
            break
          case 'notin' :
            validated = this._validateNotIn(validationValue)
            break
          case 'nullable' :
            validated = this._validateNullable(validationValue)
            break
          case 'numeric' :
            validated = this._validateNumeric(validationValue)
            break
          case 'present' :
            validated = this._validatePresent(validationValue)
            break
          case 'required' :
            validated = this._validateRequired(validationValue)
            break
          case 'string' :
            validated = this._validateString(validationValue)
            break
          case 'url' :
            validated = this._validateURL(validationValue)
            break
        }
        if (!validated) {
          errors.push(field.messages[ruleName])
        }
      }
      // Check if any of the validation rules have failed.
      if (!window.Helpers.isEmpty(errors)) {
        // Highlight fields.
        this.highlightDomElementError(field.dom, errors[0])
      } else {
        // Highlight fields.
        this.highlightDomElementSuccess(field.dom, (field.messages.hasOwnProperty('success')) ? field.messages.success : this._settings.defaultSuccess)
        // Update state.
        this.state.formSubmitted = true
        // Resubmit the form.
        this.$form.submit()
      }
    }
  }

  /**
   * highlightDomElementError
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  highlightDomElementError ($el, errorMessage, isFirstError) {
    // Add error to field.
    $el.addClass('validation-field-error')
    // Set message location.
    let $messageLocation = $el
    // Check if there is a parent class element.
    if ($el.parent().is('.input, .select, .textarea')) {
      // Add error to parent.
      $el.parent().addClass('validation-field-error')
      // Set message location.
      $messageLocation = $el.parent()
    }
    // Append a message to the dom.
    $messageLocation.after('<div class="validation-message error">' + errorMessage + '</div>')
    // Check for first error.
    if (isFirstError) {
      // Scroll body to element.
      $('html, body').animate({
        scrollTop: $messageLocation.offset().top - 20
      }, 750)
      // Focus on element.
      $messageLocation.focus()
    }
  }

  /**
   * highlightDomElementSuccess
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  highlightDomElementSuccess ($el, successMessage) {
    // Guard :: Should we highlight success fields.
    if (!this._settings.highlightSuccessFields) return

    // Add success to field.
    $el.addClass('validation-field-success')
    // Set message location.
    let $messageLocation = $el
    // Check if there is a parent class element.
    if ($el.parent().is('.input, .select, .textarea')) {
      // Add success to parent.
      $el.parent().addClass('validation-field-success')
      // Set message location.
      $messageLocation = $el.parent()
    }
    // Append a message to the dom.
    $messageLocation.after('<div class="validation-message success">' + successMessage + '</div>')
  }

  /**
   * reset
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  reset () {
    // Remove all validation messages.
    $('.validation-message', this.$form).remove()
    // Remove all validation classes.
    $('input, .input, select, .select, textarea, .textarea', this.$form).removeClass('validation-field-error validation-field-success')
  }

  /**
   * _validateArray
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  _validateArray (value) {
    return 1
  }

  /**
   * _validateBetween
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  _validateBetween (value) {
    return 1
  }

  /**
   * _validateBoolean
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  _validateBoolean (value) {
    return 1
  }

  /**
   * _validateEmail
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  _validateEmail (value) {
    // Set regEx rule.
    let regEx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/

    return (regEx.test(value))
  }

  /**
   * _validateIn
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  _validateIn (value) {
    return 1
  }

  /**
   * _validateInteger
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  _validateInteger (value) {
    return (value === parseInt(value, 10))
  }

  /**
   * _validateMax
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  _validateMax (value, threshold) {
    return (value.length <= threshold)
  }

  /**
   * _validateMin
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  _validateMin (value, threshold) {
    return (value.length >= threshold)
  }

  /**
   * _validateNotIn
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  _validateNotIn (value) {
    return 1
  }

  /**
   * _validateNullable
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  _validateNullable (value) {
    return 1
  }

  /**
   * _validateNumeric
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  _validateNumeric (value) {
    return (!isNaN(parseFloat(value)) && isFinite(value))
  }

  /**
   * _validatePresent
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  _validatePresent (value) {
  return (!window.Helpers.isEmpty(value))
  }

  /**
   * _validateRequired
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  _validateRequired (value) {
    return (value.length)
  }

  /**
   * _validateString
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  _validateString (value) {
    return (typeof value === 'string')
  }

  /**
   * _validateURL
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  _validateURL (value) {
    // Set regEx rule.
    let regEx = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/

    return (regEx.test(value))
  }

  /**
   * _findDomElement
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  _findDomElement (fieldName) {
    // Set DOM element.
    let $domElement = null
    // Check field exists by ID in the form.
    if ($('#' + fieldName, this.$form).length) {
      // Cache the DOM element.
      $domElement = $('#' + fieldName, this.$form)
    }
    // Check field exists by name in the form.
    else if ($('[name="' + fieldName + '"]', this.$form).length) {
      // Cache the DOM element.
      $domElement = $('[name="' + fieldName + '"]', this.$form)
    }
    else if (this._settings.failIfFieldNotFound) {
      // Throw an error.
      throw new Error('Field: "' + fieldName + '" does not exist by `id` or `name` in the form.')
    }

    return $domElement
  }

}

const ValidationClass = new Validation()

// Export
export default ValidationClass

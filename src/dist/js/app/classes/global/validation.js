/**
 *
 * Class
 *
 * Copyright 2017, Author Name
 * Some information on the license.
 *
   window.validationRules = {
     nameOrId: {
       rule: 'required|string',
       messages: {
         required: 'This field is required',
         string: 'Must be a string'
       }
     }
   }
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
  init () {
    // Guard :: Check for validation rules.
    if (typeof window.validationRules === 'undefined' || window.validationRules === null) return

    // Settings for this module.
    this._settings = {
      highlightSuccessFields: true
    }
    // DOM elements for this module.
    this._dom = {
    }
    // State for this module.
    this.state = {
    }
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
        'submit [data-js-event="validation"]': 'initValidation'
      },
      initValidation: (e) => {
        e[0].preventDefault()

        // Cache form.
        this.$form = $(e[0].currentTarget)
        // Create fields array.
        this.fieldsArray = []
        // Clear current errors.
        this.resetValidation()

        return this.checkValidationRules()
      }
    })
  }

  /**
   * checkValidationRules
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  checkValidationRules () {
    // Loop through the rules.
    for (let fieldName in window.validationRules) {
      // Cache the field.
      let fieldValidationRule = window.validationRules[fieldName]
      // Turn the rule into an array.
      let rulesArray = fieldValidationRule.rule.split('|')
      // Loop through the rules array and make sure there is a corresponding message incase it fails.
      for (let i = 0, ii = rulesArray.length; i < ii; i++) {
        // Check rule has a message and it's not empty.
        if (!fieldValidationRule.messages.hasOwnProperty(rulesArray[i]) || window.Helpers.isEmpty(fieldValidationRule.messages[rulesArray[i]])) {
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
    for (let fieldName in window.validationRules) {
      // Check field exists by ID in the form.
      if ($('#' + fieldName, this.$form).length) {
        // Cache the DOM element.
        var $domElement = $('#' + fieldName, this.$form)
      }
      // Check field exists by name in the form.
      else if ($('[name="' + fieldName + '"]', this.$form).length) {
        // Cache the DOM element.
        var $domElement = $('[name="' + fieldName + '"]', this.$form)
      }
      else {
        // Throw an error.
        throw new Error('Field: "' + fieldName + '" does not exist by `id` or `name` in the form.')
      }
      // Set field object.
      window.validationRules[fieldName].dom = $domElement
      // Add to array.
      this.fieldsArray.push(window.validationRules[fieldName])
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
        // Test rules array.
        switch (rulesArray[i]) {
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
            validated = this._validateMax(validationValue)
            break
          case 'min' :
            validated = this._validateMin(validationValue)
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
          errors.push(field.messages[rulesArray[i]])
        }
      }
      // Check if any of the validation rules have failed.
      if (!window.Helpers.isEmpty(errors)) {
        this.highlightDomElementError(field.dom, errors[0])
      } else {
        this.highlightDomElementSuccess(field.dom)
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
  highlightDomElementError ($el, firstError) {
    // Add error to field.
    $el.addClass('validation-field-error')
    // Set error location.
    let $errorLocation = $el
    // Check if there is a parent class element.
    if ($el.parent().is('.input, .select, .textarea')) {
      // Add error to parent.
      $el.parent().addClass('validation-field-error')
      // Set error location.
      $errorLocation = $el.parent()
    }
    // Append an error to the dom.
    $errorLocation.after('<div class="validation-error-message">' + firstError + '</div>')
  }

  /**
   * highlightDomElementSuccess
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  highlightDomElementSuccess ($el) {
    // Guard :: Should we highlight success fields.
    if (!this._settings.highlightSuccessFields) return

    // Add success to field.
    $el.addClass('validation-field-success')
    // Check if there is a parent class element.
    if ($el.parent().is('.input, .select, .textarea')) {
      // Add success to parent.
      $el.parent().addClass('validation-field-success')
    }
  }

  /**
   * resetValidation
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  resetValidation () {
    // Remove all validation messages.
    $('.validation-error-message', this.$form).remove()
    // Remove all validation classes.
    $('input, .input, select, .select, textarea, .textarea', this.$form).each(() => {
      $(this).removeClass('validation-field-error').removeClass('validation-field-success')
    })
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
  _validateMax (value) {
    return 1
  }

  /**
   * _validateMin
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  _validateMin (value) {
    return 1
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

}

const ValidationClass = new Validation()

// Export
export default ValidationClass

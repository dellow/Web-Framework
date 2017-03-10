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
  'use strict'

  // Set helpers.
  var helpers = {}

  /**
   * Plugin
   * Return a unique plugin instance.
  **/
  var Plugin = function (elem, options) {
    this.elem = elem
    this.$elem = $(elem)
    this.options = options
    this.metadata = this.$elem.data('plugin-options')
  }

  /**
   * $.fn.modal
   * Return a unique plugin instance.
  **/
  $.fn.modal = function (options) {
    return this.each(function () {
      new Plugin(this, options).init()
    })
  }

  /**
   * $.fn.destroyAllModals
   * Destroy all active modal windows.
  **/
  $.fn.destroyAllModals = function () {
    new Plugin().destroyAll()
  }

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
    appendTarget: $('body'),
    closeCallback: false
  }

  /**
   * Plugin.prototype
   * Init.
  **/
  Plugin.prototype = {
    init: function () {
      // Flag to see if modal is active.
      this.modalActive = false
      // Extend & cache settings.
      this.s = $.extend({}, $.fn.modal.defaults, this.options)
      // Set the initial modal template.
      this.$tpl = $(this.s.template)
      // Set the initial overlay template.
      this.$overlay = $('<div class="modal-overlay"></div>').css({'background-color': this.s.overlayColor})
      // Hide any open modals.
      this.destroyAll()
      // Create modal.
      this.createModal()
      // Create overlay.
      this.createOverlay()

      return this
    },
    registerEventListeners: function () {
      var _this = this

      // Event :: Click close button.
      $(document).on('click', '.js--modal-close', function (e) {
        e.preventDefault()
        // Destroy modal.
        _this.destroyAll()
        // Check for a callback.
        if (_this.s.closeCallback) {
          // Run callback.
          _this.s.closeCallback()
        }
      })
      // Event :: Click anywhere outside modal.
      $(document).on('click', function (e) {
        if ($(e.target).closest('.modal').length === 0 && _this.modalActive) {
          e.preventDefault()
          // Destroy modal.
          _this.destroyAll()
        // Check for a callback.
        if (_this.s.closeCallback) {
          // Run callback.
          _this.s.closeCallback()
        }
        }
      })
      // Event :: Esc button.
      $(document).on('keyup', function(e) {
        if (e.keyCode == 27) {
          e.preventDefault()
          // Destroy modal.
          _this.destroyAll()
        // Check for a callback.
        if (_this.s.closeCallback) {
          // Run callback.
          _this.s.closeCallback()
        }
        }
      })
    },
    createModal: function () {
      // Get 10% of document height.
      var docHeight = ($(window).height() / 100) * 10
      // Add classes.
      this.$tpl.addClass(this.s.type).find('.modal-window__content').show().addClass(this.getModalClasses())
      // Add inline styles.
      this.$tpl.css({
        'width': this.s.width,
        'maxWidth': this.s.maxWidth,
        'minWidth': this.s.minWidth,
      }).find('.modal-window__content').css({
        'maxHeight': ($(window).height() - docHeight),
        'background-color': this.s.backgroundColor
      })
      // Apply content.
      $('.modal-window__content', this.$tpl).prepend(this.getModalContent())
      // Apply modal to DOM.
      this.applyModal()
      // Show modal.
      this.showModal()
    },
    getModalContent: function () {
      return (typeof this.s.content !== 'string') ? this.s.content.html() : this.s.content
    },
    getModalClasses: function () {
      return (typeof this.s.content !== 'string') ? this.s.content.attr('class') : ''
    },
    applyModal: function () {
      return this.s.appendTarget.prepend(this.$tpl)
    },
    showModal: function () {
      var _this = this

      setTimeout(function () {
        _this.$tpl.addClass('active')
        setTimeout(function () {
          $('.modal-window__content', this.$tpl).css({
            'overflow': 'hidden',
            'overflow-y': 'scroll'
          })
          _this.modalActive = true
          // Register event listeners.
          _this.registerEventListeners()
        }, 200)
      }, 50)
    },
    destroyModal: function () {
      return $('.modal-window').remove()
    },
    createOverlay: function () {
      // Apply overlay to DOM.
      this.applyOverlay()
    },
    applyOverlay: function () {
      return this.$tpl.after(this.$overlay)
    },
    destroyOverlay: function () {
      return $('.modal-overlay').remove()
    },
    destroyAll: function () {
      this.modalActive = false
      this.destroyModal()
      this.destroyOverlay()
    }
  }
}(window))

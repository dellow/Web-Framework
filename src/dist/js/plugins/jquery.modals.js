/**
 *
 * LightBox
 * jquery.modals.js
 *
 * Copyright 2014, Stewart Dellow
 * Some information on the license.
 *
 * $('.js-modal').modal();
 *
 * setting: Type. Description.
 *
**/

;(function($, window, undefined){
    'use strict';

    // Set helpers.
    var helpers = {};

    /**
     * Plugin
     * Return a unique plugin instance.
    **/
    var Plugin = function(elem, options){
        this.elem     = elem;
        this.$elem    = $(elem);
        this.options  = options;
        this.metadata = this.$elem.data('plugin-options');
    }

    /**
     * $.fn.modal
     * Return a unique plugin instance.
    **/
    $.fn.modal = function(options){
        return this.each(function(){
            new Plugin(this, options).init();
        });
    };

    /**
     * $.fn.destroyAllModals
     * Destroy all active modal windows.
    **/
    $.fn.destroyAllModals = function(){
        new Plugin().destroyAll();
    };

    /**
     * $.fn.modal.defaults
     * Default options.
    **/
    $.fn.modal.defaults = {
        template       : '<div class="modal"><div class="modal-content"><div></div>',
        type           : 'modal-slide-left',
        content        : '',
        overlayColor   : 'rgba(0, 0, 0, 0.75)',
        backgroundColor: '#0073AA',
        width          : '50%',
    	max_width      : '650px',
    	min_width      : '350px',
        appendTarget   : 'body'
    };

    /**
     * Plugin.prototype
     * Init.
    **/
    Plugin.prototype = {
        init: function(){
            // Extend & cache settings.
            this.s = $.extend({}, $.fn.modal.defaults, this.options);
            // Set the initial modal template.
            this.$tpl = $(this.s.template);
            // Set the initial overlay template.
            this.$overlay = $('<div class="modal-overlay"></div>').css({'background-color' : this.s.overlayColor});
            // Hide any open modals.
            this.destroyAll();
            // Create modal.
            this.createModal();
            // Create overlay.
            this.createOverlay();
            // Start event listeners.
            this.listeners();

            return this;
        },
        listeners: function(){
            var _this = this;

            $(document).on('click', '.js-modal-close', function(e){
                e.preventDefault();
                // Destroy modal.
                _this.destroyAll();
            });
        },
        createModal: function(){
            // Add classes.
            this.$tpl.addClass(this.s.type).find('.modal-content').show().addClass(this.getModalClasses());
            // Add inline styles.
            this.$tpl.css({
                'width'   : this.s.width,
                'maxWidth': this.s.max_width,
                'minWidth': this.s.min_width
            }).find('.modal-content').css({
                'background-color': this.s.backgroundColor,
            });
            // Apply content.
            $('.modal-content', this.$tpl).prepend(this.getModalContent());
            // Apply modal to DOM.
            this.applyModal();
            // Show modal.
            this.showModal();
        },
        getModalContent: function(){
            return (typeof this.s.content !== 'string') ? this.s.content.html() : this.s.content;
        },
        getModalClasses: function(){
            return (typeof this.s.content !== 'string') ? this.s.content.attr('class') : '';
        },
        applyModal: function(){
            return $(this.s.appendTarget).prepend(this.$tpl);
        },
        showModal: function(){
            var _this = this;

            setTimeout(function(){
                return _this.$tpl.addClass('active modal-show');
            }, 50);
        },
        destroyModal: function(){
            return $('.modal').remove();
        },
        createOverlay: function(){
            // Apply overlay to DOM.
            this.applyOverlay();
        },
        applyOverlay: function(){
            return this.$tpl.after(this.$overlay);
        },
        destroyOverlay: function(){
            return $('.modal-overlay').remove();
        },
        destroyAll: function(){
            this.destroyModal();
            this.destroyOverlay();
        }
    }

})(jQuery, window);
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
     * $.fn.destroyModal
     * Destroy any active modal windows.
    **/
    $.fn.destroyModal = function(){
        new Plugin().destroy();
    };

    /**
     * $.fn.modal.defaults
     * Default options.
    **/
    $.fn.modal.defaults = {
        template: '<div id="modal-window" class="modal"><div class="modal-content"><div><button class="modal-close">Close</button></div></div></div>',
        type    : 'modal-slide-left',
        content : ''
    };

    /**
     * Plugin.prototype
     * Init.
    **/
    Plugin.prototype = {
        init: function(){
            // this
            var _self = this;

            // Global settings.
            _self.settings = $.extend({}, $.fn.modal.defaults, _self.options);

            // Hide any open windows.
            _self.destroy();

            // Do jQuery event binds.
            _self.binds();

            // Detect if this is running on the window.
            if($.isWindow(_self.elem)){
                // Run the plugin.
                _self.with_selector();
            }
            else{
                // Do jQuery event binds.
                _self.without_selector();
            }

            return _self;
        },
        binds: function(){
            var _self = this;

            // On escape key press.
            $(document).on('keyup', function(e){
                if(e.keyCode == 27){
                    _self.destroy();
                }
            });
            // On close.
            $(document).on('click', '.modal-close', function(e){
                e.preventDefault();

                _self.destroy();
            });
        },
        without_selector: function(){
            var _self = this;

            // On submit.
            _self.$elem.on('click', function(e){
                e.preventDefault();

                _self.show_predefined_modal($(this));
            });
        },
        with_selector: function(){
            var _self = this;

            _self.show_templated_modal();
        },
        show_templated_modal: function(){
            var _self = this,
                $target = $(_self.settings.template);

            // Add type.
            $target.addClass(_self.settings.type);

            // Apply content.
            $('.modal-content', $target).prepend(_self.settings.content);

            // Add to DOM.
            $('body').prepend($target);

            // Do overlay.
            this.apply_overlay($target);

            // Show modal window.
            setTimeout(function(){
                $target.addClass('active modal-show');
            }, 50);
        },
        show_predefined_modal: function(el){
            // Determine target.
            var target = el.data('modal-target'),
                $target = $('#' + target);

            // Do overlay.
            this.apply_overlay($target);

            // Show modal window.
            if(target !== ''){
                if($target.length){
                    setTimeout(function(){
                        $target.addClass('active modal-show');
                    }, 50);
                }
                else{
                    helpers.log("Target element can't be found.");
                    return false;
                }
            }
            else{
                helpers.log("No target defined.");
                return false;
            }
        },
        hide_windows: function(){
            $('.modal.active').removeClass('modal-show');
        },
        apply_overlay: function(el){
            el.after('<div class="modal-overlay"></div>');
        },
        destroy_overlay: function(){
            $('.modal-overlay').remove();
        },
        destroy: function(){
            this.hide_windows();
            this.destroy_overlay();
        }
    }

    /**
     * helpers.log
     * Returns a cross-browser safe message in the console.
    **/
    helpers.log = function(message, alertlog){
        alertlog = (typeof alertlog === 'undefined') ? false : true;
        if(typeof console === 'undefined' || typeof console.log === 'undefined'){
            if(alertlog){
                alert(message);
            }
        }
        else {
            console.log(message);
        }
    }

})(jQuery, window);
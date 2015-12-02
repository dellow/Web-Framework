/**
 *
 * Module
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

;(function(Module, window, undefined){
    'use strict';

    /**
     * Module
     * Constructor for this module.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module = function(){
        var _this = this;

        // Require :: NPM
        // require('fancybox');
        // Require :: Plugins
        // require('../plugins/jquery.equal-heights');
        // require('../plugins/jquery.googlemap');
        // require('../plugins/jquery.modals');
        // require('../plugins/jquery.validation');
        // Require :: Vendor
        // require('../plugins/vendor/jquery.slider');
        // require('../plugins/vendor/jquery.tooltipster');

        // Document ready.
        $(function(){
            // Call methods here.
        });
        // Window ready (images loaded).
        $(window).on('load', function(){
            // Call methods here.
        });
    }

    /**
     * equal_heights
     * Equal height elements.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module.prototype.equal_heights = function(){
        // DOM check.
        if($('.js-eh').length){
            // Init plugin.
            $('.js-eh').equalHeights();
        };
    }

    /**
     * google_map
     * Map events.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module.prototype.google_map = function(){
        // DOM check.
        if($('.js-google-map').length){
            // Init plugin.
            $('.js-google-map').googlemap({
                locations: [
                    'United Kingdom'
                ]
            });
        };
    }

    /**
     * lightboxes
     * Lightbox events.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module.prototype.lightboxes = function(){
        // DOM check.
        if($('.js-lightbox').length){
            // Init plugin.
            $('.js-lightbox').fancybox({
                autoWidth    : true,
                autoHeight   : true,
                autoScale    : true,
                transitionIn : 'fade'
            });
        };
    }

    /**
     * modals
     * Modal events.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module.prototype.modals = function(){
        // DOM check.
        if($('.js-modal').length){
            // Init plugin.
            $('.js-modal').modal();
            // Init plugin on load (or function call).
            $(window).modal({
                type   : 'modal-slide-left',
                content: 'Some content here.'
            });
            // // Destroy created modal.
            $(window).destroyModal();
        };
    }

    /**
     * reveal_dom_element
     * Reveals a DOM element.
     *
     * Usage: <button class="js-reveal" data-reveal-target=".target" data-reveal-alt="Alternative Text" data-reveal-status="hidden">Click Me</button>
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module.prototype.reveal_dom_element = function(){
        // Button click.
        $(document).on('click', '.js-reveal', function(){
            var _self   = $(this),
                target  = _self.data('reveal-target'),
                modify1 = _self.text(),
                modify2 = _self.data('reveal-alt'),
                status  = _self.data('reveal-status');

            // Check we have a target & status.
            if(target && status){
                if(status == 'visible'){
                    // Check for modifier.
                    if(modify2){
                        // Change text.
                        _self.text(modify2);
                        // Update modifier.
                        _self.data('reveal-alt', modify1);
                    }
                    // Hide element.
                    $(target).addClass('u-hidden').removeClass('u-show');
                    // Update all elements status.
                    $('[data-reveal-target="' + target + '"]').data('reveal-status', 'hidden');
                }
                else{
                    // Check for modifier.
                    if(modify2){
                        // Change text.
                        _self.text(modify2);
                        // Update modifier.
                        _self.data('reveal-alt', modify1);
                    }
                    // Show element.
                    $(target).addClass('u-show').removeClass('u-hidden');
                    // Update all elements status.
                    $('[data-reveal-target="' + target + '"]').data('reveal-status', 'visible');
                }
            }
        });
    }

    /**
     * sliders
     * Slider events.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module.prototype.sliders = function(){
        // DOM check.
        if($('.js-slider').length){
            // Init plugin.
            $('.js-slider').bxSlider({
                auto        : true,
                controls    : true,
                pager       : false,
                autoReload  : true,
                infiniteLoop: true,
                moveSlides  : 1,
                breaks      : [
                    {screen: 0, slides: 1, pager: false},
                    {screen: 460, slides: 2},
                    {screen: 768, slides: 3}
                ]
            });
        };
    }

    /**
     * tooltips
     * Tooltip events.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module.prototype.tooltips = function(){
        // DOM check.
        if($('.js-tooltip').length){
            // Init plugin.
            $('.js-tooltip').tooltipster({
                delay    : 100,
                animation: 'fade',
                trigger  : 'hover'
            });
            // Prevent click. This is for tooltips used in forms where
            // we might use an anchor instead of a button. We do this
            // so the button doesn't submit the form and trigger the
            // validation script.
            $('.js-tooltip').on('click', function(e){
                e.preventDefault();
            })
        };
    }

    /**
     * validation
     * Form validation events.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module.prototype.validation = function(){
        // Check captcha.
        if($('#c_a_p_t_c_h_a').length){
            // Set the captcha field value and check the box.
            $('#c_a_p_t_c_h_a').prop('checked', true).val('c_a_p_t_c_h_a');
        }

        // DOM check.
        if($('.js-validate').length){
            // Init plugin.
            $('.js-validate').validation({
                serverValidation        : false,
                appendErrorToPlaceholder: true,
                successCallback: function(){
                    // Check for Google Analytics.
                    if(window.ga_active){
                        // Set a virtual page for GA.
                        ga('send', 'pageview', '/contact-success.virtual');
                    }
                }
            });
        };
    }

    // Export
    module.exports = new Module();

}(window.M = window.M || function(){}, window));

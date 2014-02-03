/**
 * ui.js
 * UI functions.
**/

'use strict';

;(function(global, $, undefined){

    var ui;

    ui = global.ui || {};

    /**
     * ui.init
     * Init the ui module.
    **/
    ui.init = function(){
        ui.shim_placeholder();
    }

    /**
     * ui.shim_placeholder
     * Adds the placeholder attribute to legacy browsers.
    **/
    ui.shim_placeholder = function(){
        $(function(){
            if(!('placeholder' in document.createElement('input'))){
                var input = $(this);
                $('[placeholder]').focus(function(){
                    if(input.val() === input.attr('placeholder')){
                        input.val('').removeClass('placeholder');
                    }
                }).blur(function(){
                    if(input.val() === '' || input.val() === input.attr('placeholder')){
                        input.val(input.attr('placeholder')).addClass('placeholder');
                    }
                }).blur();
                $('[placeholder]').parents('form').submit(function(){
                    $(this).find('[placeholder]').each(function(){
                        if(input.val() === input.attr('placeholder')){
                            input.val('');
                        }
                    });
                });
            }
        });
    }

    // Export ui object for use.
    window.ui = ui;

})(window, jQuery);

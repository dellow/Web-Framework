/**
 * menus.js
 * Menus JS file.
**/

// jQuery
var $ = jQuery = require('jquery');

;(function($, window, undefined){
    'use strict';

    // Object
    var menus = menus || {};

    /**
     * menus.init
     * Creates a mobile menu from the primary menu.
    **/
    menus.init = function(el){
        var primary_nav = el,
        	wrapper     = $('<div class="mobile-select-menu"></div>'),
            select_nav  = $('<select class="nav-primary-mobile"></select>'),
            select_box  = {
                items: []
            };

        if(!$('.nav-primary-mobile').length){
            $('li a', primary_nav).each(function(){
                var anchor = $(this);
                var a = anchor.text(),
                    b = anchor.attr('href'),
                    c = anchor.parent().parent().prev().html(),
                    d = anchor.parent().attr('class');

                select_box.items.push({
                    'option_text'  : a,
                    'option_value' : b,
                    'parent_text'  : c,
                    'is_parent'    : (anchor.next().hasClass('sub-menu')) ? true : false,
                    'is_child'     : (anchor.parent().hasClass('child-item')) ? true : false,
                    'this_class'   : (typeof d !== 'undefined' && d !== false) ? anchor.parent().attr('class').split(' ')[0] : '',
                    'parent_class' : (anchor.parent().hasClass('child-item')) ? anchor.parent().parent().parent().attr('class').split(' ')[0] : ''
                });

            });
            primary_nav.after(wrapper.append(select_nav));
            select_nav.append('<option>Navigation</option>');
            $.each(select_box.items, function(index, value){
                var current = (document.URL == value.option_value) ? 'selected="selected"' : null;
                if(value.is_parent){
                    select_nav.append('<optgroup id="og-' + value.this_class + '" label="' + value.option_text + '"><option value="' + value.option_value + '" ' + current + '>' + value.option_text + '</option></optgroup>');
                }
                else if(value.is_child){
                    $('optgroup#og-' + value.parent_class).append('<option value="' + value.option_value + '" ' + current + '>' + value.option_text + '</option>');
                }
                else {
                    select_nav.append('<option value="' + value.option_value + '" ' + current + '>' + value.option_text + '</option>');
                }
            });
            select_nav.wrap('<span></span>');
        }
        $('.nav-primary-mobile').change(function(){
            if($(this).val() != ''){
                window.location.href = $(this).val();
            }
        });
    }

    $(window).on('resize', function(){
        if(helper.mobile_mode(580)){
            menus.init($('.nav-primary'));
        }
    });

    $(function(){
        if(helper.mobile_mode(580)){
            menus.init($('.nav-primary'));
        }
    });

    // Export object for use.
    window.menus = menus;

}(jQuery, window));
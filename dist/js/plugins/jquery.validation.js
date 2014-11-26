/**
 *
 * Form Validation
 * jquery.validation.js
 *
 * Copyright 2014, Stewart Dellow
 * Some information on the license.
 *
 * $('.form').validation();
 *
 * domains                 : Array. Adds to default array of top level domains for the email checker to spell check against.
 * localStorage            : Boolean. Whether to use localStorage to save the field values if the page gets refreshed.
 * serverValidation        : Boolean. Whether to use server validation or not.
 * onlyVisibleFields       : Boolean. Whether to only validate against visible fields or not.
 * appendErrorToPlaceholder: Boolean. Append the error message to the form field placeholder.
 * serverID                : String. Post var to send to server side to identify AJAX response.
 * emailRegEx              : String. RegEx to check email addresses against.
 * passRegEx               : String. RegEx to check passwords against.
 * urlRegEx                : String. RegEx to check URLs against.
 * errorBoxClass           : String. Class to apply to the error box.
 * errorClass              : String. Class to apply to fields with an error.
 * successClass            : String. Description.
 * msgSep                  : String. Used to separate the field label and the error message.
 * defaultErrorMsg         : String. Field error message if one isn't supplied in the HTML.
 * defaultSuccessMsg       : String. Form success message if one isn't supplied in the HTML.
 * defaultSuggestText      : String. Email suggestion text.
 * errorBoxElement         : String. HTML element type that wraps the error message.
 * preloaderHEX            : String. HEX value for the colour of the preloader spinner. Must be a full 6 character HEX value.
 * preloaderSize           : Integer. Pixel size of the preloader spinner.
 * preloaderDensity        : Integer. Density of the preloader spinner.
 * successElement          : jQuery Element. A valid jQuery element that holds the success message.
 * validationMessage       : jQuery Element. A valid jQuery element that holds the error message.
 * successFunction         : Function. Function to run on successful validation.
 * customValidationMethod  : Function. Function containing any custom methods to validate against. Must return the element.
 *
**/

;(function($, window, undefined){
    'use strict';

    // Set plugin.
    var Plugin = {};

    /* ======================================================== */
    /* Plugin Instance
    /* ======================================================== */
    /**
     * $.fn.validation
     * Return a unique plugin instance.
    **/
    $.fn.validation = function(options){
        return this.each(function(){
            new Plugin.init(this, options);
        });
    };

    /* ======================================================== */
    /* Plugin base methods
    /* ======================================================== */
    /**
     * Plugin.init
     * Init this plugin.
    **/
    Plugin.init = function(elem, options){
        // Global vars.
        Plugin.elem     = $(elem);
        // Global settings.
        Plugin.settings = Plugin.options(options);
        // Expose other vars to the party.
        Plugin.vars();
        // Do binds.
        Plugin.binds();
        // Run the plugin.
        Plugin.run();
    };

    /**
     * Plugin.vars
     * Plugin variables.
    **/
    Plugin.vars = function(){
        // Global arrays
        Plugin.error_array; Plugin.group_array;
        // Default domains
        var default_domains = [
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
        ];
        // Extend the domains array with those from the plugin settings.
        Plugin.domains     = $.extend(true, default_domains, Plugin.settings.domains);
        // Action for the form.
        Plugin.form_action = (Plugin.elem.data('action')) ? Plugin.elem.data('action') : Plugin.elem.attr('action');
        // Cache fields.
        Plugin.fields      = $('input, select, textarea', Plugin.elem);
        // Cache the reset button element.
        Plugin.reset       = $('button[type="reset"], input[type="reset"]', Plugin.elem);
        // Cache the submit button element.
        Plugin.button      = $('button[type="submit"], input[type="submit"]', Plugin.elem);
        // Get button text for later.
        Plugin.button_name = Plugin.button.text();
        // Success element.
        Plugin.success_element = (Plugin.settings.successElement.length) ? Plugin.settings.successElement : Plugin.elem.before($('<div class="form-success">' + Plugin.settings.defaultSuccessMsg + '</div>'));
        // Put all required fields into array.
        Plugin.fields_array = $('[required]', Plugin.elem).map(function(){
            if(Plugin.settings.onlyVisibleFields){
                if($(this).is(':visible')){
                    return $(this).attr('name');
                }
            }
            else{
                return $(this).attr('name');
            }
        });
        // Remove duplicates (jQuery.unique only works on DOM elements, we can't use DOM elements because they are ALL unique despite the same name).
        Plugin.fields_array = Helper.remove_duplicates(Plugin.fields_array);
        // Reverts the fields_array into an array of DOM elements.
        Plugin.element_array = $.map(Plugin.fields_array, function(field, i){
            return $('[name="' + field + '"]', Plugin.elem);
        });
    }

    /**
     * Plugin.options
     * NULLED.
    **/
    Plugin.options = function(options){
        // Our application defaults.
        var defaults = {
            domains                 : [],
            localStorage            : true,
            serverValidation        : true,
            onlyVisibleFields       : true,
            appendErrorToPlaceholder: false,
            serverID                : 'ajaxrequest',
            emailRegEx              : /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
            passRegEx               : /^.*(?=.{8,})(?=.*[0-9])[a-zA-Z0-9]+$/,
            urlRegEx                : /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
            errorBoxClass           : 'response--error',
            errorClass              : 'error',
            successClass            : 'success',
            msgSep                  : ' -',
            defaultErrorMsg         : 'Please enter a value',
            defaultSuccessMsg       : 'The form has been successfully submitted.',
            defaultSuggestText      : 'Did you mean',
            errorBoxElement         : '<span/>',
            preloaderHEX            : '#333333',
            preloaderSize           : 15,
            preloaderDensity        : 15,
            successElement          : $('.form-success'),
            validationMessage       : $('.error-message'),
            successFunction         : null,
            customValidationMethod  : null
        };

        // Combine the defaults and custom settings.
        return $.extend({}, defaults, options);
    };

    /**
     * Plugin.binds
     * NULLED.
    **/
    Plugin.binds = function(){
        // On submit.
        Plugin.elem.on('submit', function(e){
            Plugin.process(e);
        });
        // On reset.
        Plugin.reset.on('click', function(e){
            Plugin.reset_form(e)
        });
        // On field change.
        Plugin.fields.change(function(){
            Plugin.save_to_localStorage($(this));
        });
    }

    /* ======================================================== */
    /* Plugin specific methods
    /* ======================================================== */
    // Set Helper.
    var Helper = {};
    // Set up email_suggester object.
    var email_suggester = email_suggester || {};

    /**
     * email_suggester.init
     * NULLED.
    **/
    email_suggester.init = function(el){
        var email_val  = el.val(),
            match_val  = email_suggester.get_match(email_val);

        this.suggestion = el.next('.suggestion');
        this.reveal_suggestion(el, match_val);
    }

    /**
     * email_suggester.get_match
     * NULLED.
    **/
    email_suggester.get_match = function(query){
        var limit   = 99,
            query   = query.split('@');

        for(var i = 0, ii = Plugin.domains.length; i < ii; i++){
            var distance = email_suggester.levenshtein_distance(Plugin.domains[i], query[1]);
            if(distance < limit){
                limit = distance;
                var domain = Plugin.domains[i];
            }
        }
        if(limit <= 2 && domain !== null && domain !== query[1]){
            return{
                address: query[0],
                domain: domain
            }
        }
        else{
            return false;
        }
    }

    /**
     * email_suggester.levenshtein_distance
     * NULLED.
    **/
    email_suggester.levenshtein_distance = function(a, b){
        var c = 0,
            d = 0,
            e = 0,
            f = 0,
            g = 5;

        if(a == null || a.length === 0){
            if(b == null || b.length === 0){
                return 0
            }
            else{
                return b.length
            }
        }
        if(b == null || b.length === 0){
            return a.length
        }

        while(c + d < a.length && c + e < b.length){
            if(a[c + d] == b[c + e]){
                f++
            }
            else{
                d = 0;
                e = 0;
                for(var h = 0; h < g; h++){
                    if(c + h < a.length && a[c + h] == b[c]){
                        d = h;
                        break
                    }
                    if(c + h < b.length && a[c] == b[c + h]){
                        e = h;
                        break
                    }
                }
            }
            c++
        }
        return (a.length + b.length) / 2 - f
    }

    /**
     * email_suggester.reveal_suggestion
     * NULLED.
    **/
    email_suggester.reveal_suggestion = function(el, result){
        if(result){
            $('.address', this.suggestion).text(result.address);
            $('.domain', this.suggestion).text(result.domain);
            this.suggestion.stop(true, false).slideDown(350);

            $('.alternative-email').on('click', function(e){
                e.preventDefault();
                el.val(result.address + '@' + result.domain);
                email_suggester.suggestion.stop(true, false).slideUp(350);
            });
        }
    }

    /**
     * Helper.setup_email_field
     * Add the email suggestion div after the email field.
    **/
    Helper.setup_email_field = function(el){
        el.after($('<div class="suggestion">' + Plugin.settings.defaultSuggestText + ' <a href="#" class="alternative-email"><span class="address">address</span>@<span class="domain">domain.com</span></a>?</div>').hide());

        el.on('blur', function(){
            email_suggester.init(el);
        });
    }

    /**
     * Helper.setup_url_field
     * Adds 'http://' to URL fields.
    **/
    Helper.setup_url_field = function(el){
        el.on('blur', function(){
            var value = el.val();
            if(value !== '' && !value.match(/^http([s]?):\/\/.*/)){
                el.val('http://' + value);
            }
        });
    }

    /**
     * Helper.reset_errors
     * Remove all errors.
    **/
    Helper.reset_errors = function(){
        Plugin.elem.removeClass('invalid');
        // Remove current classes.
        $('.' + Plugin.settings.errorClass, Plugin.elem).removeClass(Plugin.settings.errorClass);
        $('.' + Plugin.settings.errorBoxClass, Plugin.elem).remove();
    }

    /**
     * Helper.set_errors
     * Adds the error class and message to each field.
    **/
    Helper.set_errors = function(arr){
        // Remove errors.
        Helper.reset_errors(Plugin.elem);
        // Add error class to form.
        Plugin.elem.addClass('invalid');
        // Add new ones.
        $.each(arr, function(){
            var a = $(this);
            var el = a[0].input;
            // Get error message.
            var error = (a[0].msg !== '') ? a[0].msg : Plugin.settings.defaultErrorMsg;
            // Separator.
            var message = (Plugin.settings.msgSep) ? (error) ? Plugin.settings.msgSep + ' <span class="msg">' + error + '</span>' : '' : '<span class="msg">' + error + '</span>';
            // Apply error class to field.
            el.addClass(Plugin.settings.errorClass).parent('.field').addClass('field-has-errors');
            // Field specific actions.
            if(el.attr('type') === 'checkbox' || el.attr('type') === 'radio'){
                // Add error element to field.
                el.closest('.field').find('label, .label').first().append($(Plugin.settings.errorBoxElement).addClass(Plugin.settings.errorBoxClass).html(message));
                // Apply to nearest label if checkbox or radio.
                el.closest('label').addClass(Plugin.settings.errorClass);
            }
            else{
                if(Plugin.settings.appendErrorToPlaceholder){
                    el.parent().find('label, .label').addClass(Plugin.settings.errorClass);
                    el.attr('placeholder', error);
                }
                else{
                    // Add error element to field.
                    el.parent().find('label, .label').addClass(Plugin.settings.errorBoxClass).append($(Plugin.settings.errorBoxElement).addClass(Plugin.settings.errorBoxClass).html(message));
                }
            }
            // Add class to form.
            Plugin.elem.addClass('form-has-errors');
        });
    }

    /**
     * Helper.remove_duplicates
     * Remove duplicates from an array.
    **/
    Helper.remove_duplicates = function(array){
        var result = [];
        $.each(array, function(i, e){
            if($.inArray(e, result) == -1){
                result.push(e);
            }
        });

        return result;
    }

    /**
     * Helper.loading_animation
     * Creates a spinning loading animation.
    **/
    Helper.loading_animation = function(el){
        el.addClass('loading');
    }

    /**
     * Helper.log
     * Returns a cross-browser safe message in the console.
    **/
    Helper.log = function(message, alertlog){
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

    /**
     * plugin.run
     * Our initial function.
    **/
    Plugin.run = function(){
        // Add 'novalidate' attribute to form.
        Plugin.elem.attr('novalidate', 'novalidate');
        // Process fields.
        Plugin.process_fields();
        // Disable the submit button.
        //Plugin.disable_stuff(true);
        // Hide all error messages if not done with CSS already.
        Plugin.elem.children(Plugin.settings.validationMessage.hide());
        // Get localStorage.
        Plugin.get_localStorage();
    }

    /**
     * Plugin.process_fields
     * NULLED.
    **/
    Plugin.process_fields = function(){
        $.each(Plugin.element_array, function(){
            // Field type specific actions.
            switch($(this).attr('type')){
                case 'email':
                    Helper.setup_email_field($(this));
                break;
                case 'url':
                    Helper.setup_url_field($(this));
                break;
            }
        });
    }

    /**
     * Plugin.setup
     * Setup arrays.
    **/
    Plugin.setup = function(){
        // Global error array.
        Plugin.error_array = [];
        // Create an array for checkboxes and radio inputs.
        Plugin.group_array = [];
    }

    /**
     * Plugin.disable_stuff
     * Disable stuff.
    **/
    Plugin.disable_stuff = function(disable){
        // Reset errors.
        Helper.reset_errors(Plugin.elem);
        if(disable){
            // Disable the submit button.
            Plugin.button.attr('disabled', 'disabled');
        }
        else{
            // Enable the submmit button and re-apply the button name.
            Plugin.button.removeAttr('disabled').html(Plugin.button_name);
        }
    }

    /**
     * Plugin.clear_localStorage
     * Clears all localStorage values.
    **/
    Plugin.clear_localStorage = function(){
        Plugin.fields.each(function(){
            localStorage.removeItem($(this).attr('name'));
        });
    }

    /**
     * Plugin.get_localStorage
     * Retrieves field values from localStorage.
    **/
    Plugin.get_localStorage = function(){
        if(Plugin.settings.localStorage && typeof(Storage) !== 'undefined'){
            Plugin.fields.each(function(){
                // Vars
                var input_name = $(this).attr('name');

                if(localStorage[input_name]){
                    if($(this).is('select')){
                        $('option[selected="selected"]', this).removeAttr('selected');
                        $('option[value="' + localStorage[input_name] + '"]', this).prop('selected', true);
                    }
                    else if($(this).is('input[type="radio"]')){
                        if($(this).val() == localStorage[input_name]){
                            $(this).prop('checked', true);
                        }
                    }
                    else if($(this).is('input[type="checkbox"]')){
                        var checkboxes = localStorage[input_name].split(',');
                        $('input[name="' + input_name + '"]').each(function(i){
                            if(checkboxes[i] != '' && $(this).val() == checkboxes[i]){
                                $(this).prop('checked', true);
                            }
                        });
                    }
                    else{
                        $(this).val(localStorage[input_name]);
                    }
                };
            });
        }
    }

    /**
     * Plugin.save_to_localStorage
     * Saves field entries to localStorage.
    **/
    Plugin.save_to_localStorage = function(el){
        if(Plugin.settings.localStorage && typeof(Storage) !== 'undefined'){
            // Vars
            var input_name = el.attr('name');

            if(el.is('input[type="checkbox"]')){
                // Vars
                var checkbox_array = [];

                $('input[name="' + input_name + '"]').each(function(i){
                    if($(this).is(':checked')){
                        checkbox_array.push($(this).val());
                    }
                    else{
                        checkbox_array.push('');
                    }
                });
                localStorage[input_name] = checkbox_array;
            }
            else{
                localStorage[input_name] = el.val();
            }
        }
    }

    /**
     * Plugin.js_validate_fields
     * Uses jQuery to check state of fields.
    **/
    Plugin.js_validate_fields = function(){
        // Put all empty fields into array
        Plugin.error_array = $.map(Plugin.element_array, function(field, i){
            var obj,
                msg = field.closest('.field').find(Plugin.settings.validationMessage).val() || field.closest('.field').find(Plugin.settings.validationMessage).text();

            // Checkboxes and radio.
            if((field.attr('type') === 'checkbox' || field.attr('type') === 'radio') && field.serializeArray().length == 0){
                return obj = {
                    input: field,
                    msg  : msg
                }
            }
            // Email fields.
            else if(field.attr('type') === 'email' && !Plugin.settings.emailRegEx.test(field.val())){
                return obj = {
                    input: field,
                    msg  : msg
                }
            }
            // URL fields.
            else if(field.attr('type') === 'url' && !Plugin.settings.urlRegEx.test(field.val())){
                return obj = {
                    input: field,
                    msg  : msg
                }
            }
            // Check for existence.
            else if(field.val() === '' || field.val() === 'undefined' || field.val() === undefined || field.val() === '-'){
                return obj = {
                    input: field,
                    msg  : msg
                }
            }
        });
        // Custom validation method.
        if($.isFunction(Plugin.settings.customValidationMethod)){
            Plugin.error_array.push(Plugin.settings.customValidationMethod());
        }

        return (Plugin.error_array.length === 0) ? true : false;
    }

    /**
     * Plugin.server_validate_fields
     * Uses AJAX to get a server response on field validation.
    **/
    Plugin.server_validate_fields = function(){
        // Check for a form action.
        if(Plugin.form_action !== ''){
            var fatalerror = false;
            // Use ajax to check server response.
            $.ajax({
                type    : 'POST',
                url     : Plugin.form_action,
                data    : Plugin.elem.serialize() + '&' + Plugin.settings.serverID + '=true',
                dataType: 'JSON',
                cache   : false,
                async   : false, // Important, this has to finish first!
                beforeSend: function(){
                    // Add a preloader.
                    Helper.loading_animation(Plugin.button);
                },
                success: function(response){
                    response = (typeof response.fields !== 'undefined') ? response.fields : response;
                    // Un-disable stuff.
                    Plugin.disable_stuff(false);
                    // If error.
                    if(response.error){
                        // Cycles through the response and adds them to the error_array.
                        for(var key in response.error){
                            var a = response.error[key];
                            if(a.field !== undefined){
                                var obj = {
                                    input: $('[name="' + a.field + '"]', Plugin.elem),
                                    msg  : a.msg
                                }
                                Plugin.error_array.push(obj);
                            }
                        }
                    }
                },
                error: function(xhr, ajaxOptions, thrownError){

                    console.log(thrownError);
                    fatalerror = true;
                    // Un-disable stuff.
                    Plugin.disable_stuff(false);
                    // Server error
                    var error = (xhr.responseText !== '') ? xhr.responseText : thrownError;
                    //Plugin.elem.before().html(error).fadeIn(500);
                }
            });

            return (Plugin.error_array.length === 0 && !fatalerror) ? true : false;
        }
        // No form action.
        else{
            // Error message.
            Helper.log("You must have an action defined on your form in order to use server validation.");

            return false;
        }
    }

    /**
     * Plugin.success
     * Form validated successfully.
    **/
    Plugin.success = function(type, e){
        // Un-disable stuff.
        Plugin.disable_stuff(false);
        // Clear localStorage.
        Plugin.clear_localStorage();
        // If we have a custom post function.
        if(type == 'server'){
            e.preventDefault();
            Plugin.elem.fadeOut(500, function(){
                Plugin.elem.prev(Plugin.success_element).fadeIn(300);
            });
        }
        else if(type == 'js'){
            e.preventDefault();
            $.ajax({
                type : 'POST',
                data : Plugin.elem.serialize(),
                cache: false,
                async: false,
                beforeSend: function(){
                    // Add a preloader
                    Helper.loading_animation(Plugin.button);
                },
                success: function(){
                    Plugin.elem.fadeOut(500, function(){
                        Plugin.elem.prev(Plugin.success_element).fadeIn(300);
                    });
                }
            });
        }
        else{
            return true;
        }
    }

    /**
     * Plugin.failure
     * Form validation failed.
    **/
    Plugin.failure = function(){
        // Set errors
        Helper.set_errors(Plugin.error_array, Plugin.elem);
    }

    /**
     * Plugin.process
     * Process the fields.
    **/
    Plugin.process = function(e){
        // Run setup plugin.
        Plugin.setup();
        // If we are doing server validation.
        if(Plugin.settings.serverValidation && Plugin.server_validate_fields()){
            Plugin.success('server', e);
        }
        // If we are not doing server validation check if form has passed validation.
        else if(!Plugin.settings.serverValidation && Plugin.js_validate_fields()){
            Plugin.success('js', e);
        }
        // Not validated, display errors.
        else{
            e.preventDefault();
            Plugin.failure();
        }
    }

    /**
     * Plugin.reset_form
     * Reset the form.
    **/
    Plugin.reset_form = function(){
        // Un-disable stuff.
        Plugin.disable_stuff(false);
        // Remove errors.
        Helper.reset_errors(Plugin.elem);
        // Clear localStorage.
        Plugin.clear_localStorage();
    }

})(jQuery, window);
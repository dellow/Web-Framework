/**
 * validation.js
 * $('.form').validation();
 *
 * domains               : Array. Adds to default array of top level domains for the email checker to spell check against.
 * localStorage          : Boolean. Whether to use localStorage to save the field values if the page gets refreshed.
 * serverValidation      : Boolean. Whether to use server validation or not.
 * serverID              : String. Post var to send to server side to identify AJAX response.
 * emailRegEx            : String. RegEx to check email addresses against.
 * passRegEx             : String. RegEx to check passwords against.
 * urlRegEx              : String. RegEx to check URLs against.
 * errorBoxClass         : String. Class to apply to the error box.
 * errorClass            : String. Class to apply to fields with an error.
 * successClass          : String. Description.
 * msgSep                : String. Used to separate the field label and the error message.
 * defaultErrorMsg       : String. Field error message if one isn't supplied in the HTML.
 * defaultSuccessMsg     : String. Form success message if one isn't supplied in the HTML.
 * defaultSuggestText    : String. Email suggestion text.
 * errorBoxElement       : String. HTML element type that wraps the error message.
 * preloaderHEX          : String. HEX value for the colour of the preloader spinner. Must be a full 6 character HEX value.
 * preloaderSize         : Integer. Pixel size of the preloader spinner.
 * preloaderDensity      : Integer. Density of the preloader spinner.
 * validationMessage     : jQuery Element. A valid jQuery element that holds the error message.
 * successFunction       : Function. Function to run on successful validation.
 * customValidationMethod: Function. Function containing any custom methods to validate against. Must return the element.
**/

;(function($, window, document, undefined){
    'use strict';

    $.fn.extend({
        validation: function(options){
            // Default settings
            this.defaults = {
                domains               : [],
                localStorage          : true,
                serverValidation      : true,
                serverID              : 'ajaxrequest',
                emailRegEx            : /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                passRegEx             : /^.*(?=.{8,})(?=.*[0-9])[a-zA-Z0-9]+$/,
                urlRegEx              : /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
                errorBoxClass         : 'error-box',
                errorClass            : 'error',
                successClass          : 'success',
                msgSep                : ' -',
                defaultErrorMsg       : 'Please enter a value',
                defaultSuccessMsg     : 'Form successfully submitted',
                defaultSuggestText    : 'Did you mean',
                errorBoxElement       : '<span/>',
                preloaderHEX          : '#333333',
                preloaderSize         : 15,
                preloaderDensity      : 15,
                validationMessage     : $('.error-message'),
                successFunction       : null,
                customValidationMethod: null
            };
            // Create a settings object
            var settings = $.extend({}, this.defaults, options);
            // Set up plugin object
            var plugin = {};
            // Set up utilities object
            var utilities = {};
            // Set up email_suggester object
            var email_suggester = {};
            // Array of default domains
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
            // Extend the domains array with those from the plugin settings
            var domains = $.extend(true, default_domains, settings.domains);

            /**
             * email_suggester.init
             * null.
            **/
            email_suggester.init = function(el){
                var email_val  = el.val(),
                    match_val  = email_suggester.get_match(email_val);

                this.suggestion = el.next('.suggestion');
                this.reveal_suggestion(el, match_val);
            }

            /**
             * email_suggester.get_match
             * null.
            **/
            email_suggester.get_match = function(query){
                var limit   = 99,
                    query   = query.split('@');

                for(var i = 0, ii = domains.length; i < ii; i++){
                    var distance = email_suggester.levenshtein_distance(domains[i], query[1]);
                    if(distance < limit){
                        limit = distance;
                        var domain = domains[i];
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
             * null.
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
             * null.
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
             * utilities.setup_email_field
             * Add the email suggestion div after the email field.
            **/
            utilities.setup_email_field = function(el){
                el.after($('<div class="suggestion">' + settings.defaultSuggestText + ' <a href="#" class="alternative-email"><span class="address">address</span>@<span class="domain">domain.com</span></a>?</div>').hide());

                el.on('blur', function(){
                    email_suggester.init(el);
                });
            }

            /**
             * utilities.setup_url_field
             * Adds 'http://' to URL fields.
            **/
            utilities.setup_url_field = function(el){
                el.on('blur', function(){
                    var value = el.val();
                    if(value !== '' && !value.match(/^http([s]?):\/\/.*/)){
                        el.val('http://' + value);
                    }
                });
            }

            /**
             * utilities.reset_errors
             * Remove all errors
            **/
            utilities.reset_errors = function(form){
                // Remove current classes
                $('.' + settings.errorClass, form).removeClass(settings.errorClass);
                $('.' + settings.errorBoxClass, form).remove();
            }

            /**
             * utilities.set_errors
             * Adds the error class and message to each field.
            **/
            utilities.set_errors = function(arr, form){
                // Remove errors
                utilities.reset_errors(form);
                // Add new ones
                $.each(arr, function(){
                    var a = $(this);
                    var el = a[0].input;
                    // Get error message
                    var error = a[0].msg;
                    // Separator
                    var message = (settings.msgSep) ? (error) ? settings.msgSep + ' <span class="msg">' + error + '</span>' : '' : '<span class="msg">' + error + '</span>';
                    // Apply error class to field
                    el.addClass(settings.errorClass);
                    // Field specific actions
                    if(el.attr('type') === 'checkbox' || el.attr('type') === 'radio'){
                        // Add error element to field
                        //el.offsetParent('.field').first().before($(settings.errorBoxElement).addClass(settings.errorBoxClass).html(message));
                        el.closest('.field').find('label, .label').first().append($(settings.errorBoxElement).addClass(settings.errorBoxClass).html(message));
                        // Apply to nearest label if checkbox or radio
                        el.closest('label').addClass(settings.errorClass);
                    }
                    else{
                        // Add error element to field
                        el.parent().find('label, .label').append($(settings.errorBoxElement).addClass(settings.errorBoxClass).html(message));
                    }
                });
            }

            /**
             * utilities.remove_duplicates
             * Remove duplicates from an array
            **/
            utilities.remove_duplicates = function(array){
                var result = [];
                $.each(array, function(i, e){
                    if($.inArray(e, result) == -1){
                        result.push(e);
                    }
                });

                return result;
            }

            /**
             * utilities.loading_animation
             * Creates a spinning loading animation.
            **/
            utilities.loading_animation = function(){
                // Generate an element name with a random number
                var el = 'loader-' + Math.random() * (100 - 1) + 1;
                // Generate the preloader
                $.getScript('http://heartcode-canvasloader.googlecode.com/files/heartcode-canvasloader-min-0.9.js', function(){
                    var loader = new CanvasLoader(el);
                    loader.setShape('spiral');
                    loader.setDiameter(settings.preloaderSize);
                    loader.setDensity(settings.preloaderDensity);
                    loader.setRange(0.6);
                    loader.setSpeed(1);
                    loader.setColor(settings.preloaderHEX);
                    loader.show();
                });

                // Return a loader element
                return $('<div style="display: inline-block;" id="' + el + '"></div>');
            }

            /**
             * utilities.message
             * Returns a cross-browser safe message in the console.
            **/
            utilities.message = function(message, alertlog){
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

            // Return the plugin instance to allow chaining
            return this.each(function(){
                // Global arrays
                var error_array, group_array,
                    // Cache the form element
                    form          = $(this),
                    // Action for the form
                    form_action   = form.data('action'),
                    // Cache fields
                    fields        = $('input, select, textarea', form),
                    // Cache the reset button element
                    reset         = $('button[type="reset"], input[type="reset"]', form),
                    // Cache the submit button element
                    button        = $('button[type="submit"], input[type="submit"]', form),
                    // Get button text for later
                    button_name   = button.text(),
                    // Put all required fields into array
                    fields_array  = $('[required]', form).map(function(){
                        return $(this).attr('name');
                    }),
                    // Remove duplicates (jQuery.unique only works on DOM elements, we can't use DOM elements because they are ALL unique despite the same name)
                    fields_array  = utilities.remove_duplicates(fields_array),
                    // Reverts the fields_array into an array of DOM elements
                    element_array = $.map(fields_array, function(field, i){
                        return $('[name="' + field + '"]', form);
                    });

                /**
                 * plugin.init
                 * Null
                **/
                plugin.init = function(){
                    // Add 'novalidate' attribute to form
                    form.attr('novalidate', 'novalidate');
                    // Disable the submit button
                    //plugin.disable_stuff(true);
                    // Hide all error messages if not done with CSS already
                    form.children(settings.validationMessage.hide());
                    // Process fields
                    plugin.process_fields();
                    // Get localStorage
                    plugin.get_localStorage();
                }

                /**
                 * plugin.process_fields
                 * Null
                **/
                plugin.process_fields = function(){
                    $.each(element_array, function(){
                        // Field type specific actions
                        switch($(this).attr('type')){
                            case 'email':
                                utilities.setup_email_field($(this));
                            break;
                            case 'url':
                                utilities.setup_url_field($(this));
                            break;
                        }
                    });
                }

                /**
                 * plugin.setup
                 * Setup arrays
                **/
                plugin.setup = function(){
                    // Global error array
                    error_array = [];
                    // Create an array for checkboxes and radio inputs
                    group_array = [];
                }

                /**
                 * plugin.disable_stuff
                 * Disable stuff
                **/
                plugin.disable_stuff = function(disable){
                    // Reset errors
                    utilities.reset_errors(form);
                    if(disable){
                        // Disable the submit button
                        button.attr('disabled', 'disabled');
                    }
                    else{
                        // Enable the submmit button and re-apply the button name
                        button.removeAttr('disabled').html(button_name);
                    }
                }

                /**
                 * plugin.clear_localStorage
                 * Clears all localStorage values
                **/
                plugin.clear_localStorage = function(){
                    fields.each(function(){
                        localStorage.removeItem($(this).attr('name'));
                    });
                }

                /**
                 * plugin.get_localStorage
                 * Retrieves field values from localStorage
                **/
                plugin.get_localStorage = function(){
                    if(settings.localStorage && typeof(Storage) !== 'undefined'){
                        fields.each(function(){
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
                 * plugin.save_to_localStorage
                 * Saves field entries to localStorage
                **/
                plugin.save_to_localStorage = function(el){
                    if(settings.localStorage && typeof(Storage) !== 'undefined'){
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
                 * plugin.js_validate_fields
                 * Uses jQuery to check state of fields
                **/
                plugin.js_validate_fields = function(){
                    // Put all empty fields into array
                    error_array = $.map(element_array, function(field, i){
                        var obj,
                            msg = field.closest('.field').find(settings.validationMessage).val() || field.closest('.field').find(settings.validationMessage).text();

                        // Checkboxes and radio
                        if((field.attr('type') === 'checkbox' || field.attr('type') === 'radio') && field.serializeArray().length == 0){
                            return obj = {
                                input: field,
                                msg  : msg
                            }
                        }
                        // Email fields
                        else if(field.attr('type') === 'email' && !settings.emailRegEx.test(field.val())){
                            return obj = {
                                input: field,
                                msg  : msg
                            }
                        }
                        // URL fields
                        else if(field.attr('type') === 'url' && !settings.urlRegEx.test(field.val())){
                            return obj = {
                                input: field,
                                msg  : msg
                            }
                        }
                        // Check for existence
                        else if(field.val() === '' || field.val() === 'undefined' || field.val() === undefined){
                            return obj = {
                                input: field,
                                msg  : msg
                            }
                        }
                    });
                    // Custom validation method
                    if($.isFunction(settings.customValidationMethod)){
                        error_array.push(settings.customValidationMethod());
                    }

                    return (error_array.length === 0) ? true : false;
                }

                /**
                 * plugin.server_validate_fields
                 * Uses AJAX to get a server response on field validation
                **/
                plugin.server_validate_fields = function(){
                    // Check for a form action
                    if(form_action !== ''){
                        // Use ajax to check server response
                        $.ajax({
                            type    : 'POST',
                            url     : form_action,
                            data    : form.serialize() + '&' + settings.serverID + '=true',
                            dataType: 'JSON',
                            cache   : false,
                            async   : false, // Important, this has to finish first!
                            beforeSend: function(){
                                // Add a preloader
                                button.html(utilities.loading_animation());
                            },
                            success: function(response){
                                // Un-disable stuff
                                plugin.disable_stuff(false);
                                // If error
                                if(response.error){
                                    // Reverts the fields_array into an array of DOM elements
                                    for(var key in response){
                                        var a = response[key];
                                        if(a.field !== undefined){
                                            var obj = {
                                                input: $('[name="' + a.field + '"]', form),
                                                msg  : a.msg
                                            }
                                            error_array.push(obj);
                                        }
                                    }
                                }
                            },
                            error: function(xhr, ajaxOptions, thrownError){
                                // Un-disable stuff
                                plugin.disable_stuff(false);
                                // Server error
                                var error = (xhr.responseText !== '') ? xhr.responseText : thrownError;
                                //form.before().html(error).fadeIn(500);
                            }
                        });

                        return (error_array.length === 0) ? true : false;
                    }
                    // No form action
                    else{
                        // Error message
                        utilities.message("You must have an action defined on your form in order to use server validation.");

                        return false;
                    }
                }

                /**
                 * plugin.success
                 * Form validated successfully
                **/
                plugin.success = function(type, e){
                    // Un-disable stuff
                    plugin.disable_stuff(false);
                    // Clear localStorage
                    plugin.clear_localStorage();
                    // If we have a custom post function
                    if(type == 'server' || type == 'js'){
                        e.preventDefault();
                        form.fadeOut(500, function(){
                            form.prev('.form-success').fadeIn(300);
                        });
                    }
                    else{
                        return true;
                    }
                }

                /**
                 * plugin.failure
                 * Form validation failed
                **/
                plugin.failure = function(){
                    // Set errors
                    utilities.set_errors(error_array, form);
                }

                /**
                 * plugin.process
                 * Process the fields
                **/
                plugin.process = function(e){
                    // Run setup plugin
                    plugin.setup();
                    // If we are doing server validation
                    if(settings.serverValidation && plugin.server_validate_fields()){
                        plugin.success('server', e);
                    }
                    // If we are not doing server validation check if form has passed validation
                    else if(!settings.serverValidation && plugin.js_validate_fields()){
                        plugin.success('js', e);
                    }
                    // Not validated, display errors
                    else{
                        e.preventDefault();
                        plugin.failure();
                    }
                }

                /**
                 * plugin.reset
                 * Reset the form
                **/
                plugin.reset = function(){
                    // Un-disable stuff
                    plugin.disable_stuff(false);
                    // Remove errors
                    utilities.reset_errors(form);
                    // Clear localStorage
                    plugin.clear_localStorage();
                }

                // On load
                plugin.init();
                // On submit
                form.on('submit', plugin.process);
                // On reset
                reset.on('click', plugin.reset);
                // On field change
                fields.change(function(){
                    plugin.save_to_localStorage($(this));
                });
            });
        }
    });

})(jQuery, window, document);
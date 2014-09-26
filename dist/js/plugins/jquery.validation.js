/**
 * jquery.validation.js
 * $('.form').validation();
 *
 * domains               : Array. Adds to default array of top level domains for the email checker to spell check against.
 * localStorage          : Boolean. Whether to use localStorage to save the field values if the page gets refreshed.
 * serverValidation      : Boolean. Whether to use server validation or not.
 * onlyVisibleFields     : Boolean. Whether to only validate against visible fields or not.
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
 * successElement        : jQuery Element. A valid jQuery element that holds the success message.
 * validationMessage     : jQuery Element. A valid jQuery element that holds the error message.
 * successFunction       : Function. Function to run on successful validation.
 * customValidationMethod: Function. Function containing any custom methods to validate against. Must return the element.
**/

;(function($, window, undefined){
    'use strict';

    var Plugin = function(elem, options){
        this.elem     = elem;
        this.$elem    = $(elem);
        this.options  = options;
        this.metadata = this.$elem.data('plugin-options');
    };

    Plugin.prototype = {
        defaults: {
            domains               : [],
            localStorage          : true,
            serverValidation      : true,
            onlyVisibleFields     : true,
            serverID              : 'ajaxrequest',
            emailRegEx            : /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
            passRegEx             : /^.*(?=.{8,})(?=.*[0-9])[a-zA-Z0-9]+$/,
            urlRegEx              : /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
            errorBoxClass         : 'response--error',
            errorClass            : 'error',
            successClass          : 'success',
            msgSep                : ' -',
            defaultErrorMsg       : 'Please enter a value',
            defaultSuccessMsg     : 'The form has been successfully submitted.',
            defaultSuggestText    : 'Did you mean',
            errorBoxElement       : '<span/>',
            preloaderHEX          : '#333333',
            preloaderSize         : 15,
            preloaderDensity      : 15,
            successElement        : $('.form-success'),
            validationMessage     : $('.error-message'),
            successFunction       : null,
            customValidationMethod: null
        },
        init: function(){
            // Cache this.
            var plg = this;
            // Config.
            plg.config = $.extend({}, plg.defaults, plg.options, plg.metadata);
            // Set any vars here.
            plg.default_domains = [
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
            plg.domains = $.extend(true, this.default_domains, this.config.domains);
            // Global arrays
            plg.error_array; plg.group_array;
            // Cache the form element
            plg.form = this.$elem;
            // Action for the form
            plg.form_action = (plg.form.data('action')) ? plg.form.data('action') : plg.form.attr('action');
            // Cache fields
            plg.fields = $('input, select, textarea', plg.form);
            // Cache the reset button element
            plg.reset = $('button[type="reset"], input[type="reset"]', plg.form);
            // Cache the submit button element
            plg.button = $('button[type="submit"], input[type="submit"]', plg.form);
            // Get button text for later
            plg.button_name = plg.button.text();
            // Success element
            plg.success_element = (this.config.successElement.length) ? this.config.successElement : plg.form.before($('<div class="form-success">' + this.config.defaultSuccessMsg + '</div>'));
            // Put all required fields into array
            plg.fields_array = $('[required]', plg.form).map(function(){
                if(plg.config.onlyVisibleFields){
                    if($(this).is(':visible')){
                        return $(this).attr('name');
                    }
                }
                else{
                    return $(this).attr('name');
                }
            });
            // Remove duplicates (jQuery.unique only works on DOM elements, we can't use DOM elements because they are ALL unique despite the same name)
            plg.fields_array = helper.remove_duplicates(plg.fields_array);
            // Reverts the fields_array into an array of DOM elements
            plg.element_array = $.map(plg.fields_array, function(field, i){
                return $('[name="' + field + '"]', plg.form);
            });
            // Cache plg
            Plugin.w = plg;
            // Let's go.
            plg.go();

            // On submit
            plg.form.on('submit', function(e){
                plg.process(e);
            });
            // On reset
            plg.reset.on('click', function(e){
                plg.reset_form(e)
            });
            // On field change
            plg.fields.change(function(){
                plg.save_to_localStorage($(this));
            });

            return plg;
        }
    }

    // Set helper.
    var helper = {};
    // Set up email_suggester object
    var email_suggester = {};

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

        for(var i = 0, ii = Plugin.w.domains.length; i < ii; i++){
            var distance = email_suggester.levenshtein_distance(Plugin.w.domains[i], query[1]);
            if(distance < limit){
                limit = distance;
                var domain = Plugin.w.domains[i];
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
     * helper.setup_email_field
     * Add the email suggestion div after the email field.
    **/
    helper.setup_email_field = function(el){
        el.after($('<div class="suggestion">' + Plugin.config.defaultSuggestText + ' <a href="#" class="alternative-email"><span class="address">address</span>@<span class="domain">domain.com</span></a>?</div>').hide());

        el.on('blur', function(){
            email_suggester.init(el);
        });
    }

    /**
     * helper.setup_url_field
     * Adds 'http://' to URL fields.
    **/
    helper.setup_url_field = function(el){
        el.on('blur', function(){
            var value = el.val();
            if(value !== '' && !value.match(/^http([s]?):\/\/.*/)){
                el.val('http://' + value);
            }
        });
    }

    /**
     * helper.reset_errors
     * Remove all errors
    **/
    helper.reset_errors = function(form){
        // Remove current classes
        $('.' + Plugin.config.errorClass, form).removeClass(Plugin.config.errorClass);
        $('.' + Plugin.config.errorBoxClass, form).remove();
    }

    /**
     * helper.set_errors
     * Adds the error class and message to each field.
    **/
    helper.set_errors = function(arr, form){
        // Remove errors
        helper.reset_errors(form);
        // Add new ones
        $.each(arr, function(){
            var a = $(this);
            var el = a[0].input;
            // Get error message
            var error = (a[0].msg !== '') ? a[0].msg : Plugin.config.defaultErrorMsg;
            // Separator
            var message = (Plugin.config.msgSep) ? (error) ? Plugin.config.msgSep + ' <span class="msg">' + error + '</span>' : '' : '<span class="msg">' + error + '</span>';
            // Apply error class to field
            el.addClass(Plugin.config.errorClass);
            // Field specific actions
            if(el.attr('type') === 'checkbox' || el.attr('type') === 'radio'){
                // Add error element to field
                //el.offsetParent('.field').first().before($(Plugin.config.errorBoxElement).addClass(Plugin.config.errorBoxClass).html(message));
                el.closest('.field').find('label, .label').first().append($(Plugin.config.errorBoxElement).addClass(Plugin.config.errorBoxClass).html(message));
                // Apply to nearest label if checkbox or radio
                el.closest('label').addClass(Plugin.config.errorClass);
            }
            else{
                // Add error element to field
                el.parent().find('label, .label').append($(Plugin.config.errorBoxElement).addClass(Plugin.config.errorBoxClass).html(message));
            }
        });
    }

    /**
     * helper.remove_duplicates
     * Remove duplicates from an array
    **/
    helper.remove_duplicates = function(array){
        var result = [];
        $.each(array, function(i, e){
            if($.inArray(e, result) == -1){
                result.push(e);
            }
        });

        return result;
    }

    /**
     * helper.loading_animation
     * Creates a spinning loading animation.
    **/
    helper.loading_animation = function(){
        // Generate an element name with a random number
        var el = 'loader-' + Math.random() * (100 - 1) + 1;
        // Generate the preloader
        $.getScript('http://heartcode-canvasloader.googlecode.com/files/heartcode-canvasloader-min-0.9.js', function(){
            var loader = new CanvasLoader(el);
            loader.setShape('spiral');
            loader.setDiameter(Plugin.config.preloaderSize);
            loader.setDensity(Plugin.config.preloaderDensity);
            loader.setRange(0.6);
            loader.setSpeed(1);
            loader.setColor(Plugin.config.preloaderHEX);
            loader.show();
        });

        // Return a loader element
        return $('<div style="display: inline-block; vertical-align: middle;" id="' + el + '"></div>');
    }

    /**
     * helper.message
     * Returns a cross-browser safe message in the console.
    **/
    helper.message = function(message, alertlog){
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
     * plugin.go
     * Our initial function.
    **/
    Plugin.prototype.go = function(){
        // Cache the extended options.
        Plugin.config = this.config;
        // Add 'novalidate' attribute to form
        Plugin.w.form.attr('novalidate', 'novalidate');
        // Process fields
        Plugin.prototype.process_fields();
        // Disable the submit button
        //Plugin.prototype.disable_stuff(true);
        // Hide all error messages if not done with CSS already
        Plugin.w.form.children(Plugin.config.validationMessage.hide());
        // Get localStorage
        Plugin.prototype.get_localStorage();
    }

    /**
     * Plugin.prototype.process_fields
     * Null
    **/
    Plugin.prototype.process_fields = function(){
        $.each(Plugin.w.element_array, function(){
            // Field type specific actions
            switch($(this).attr('type')){
                case 'email':
                    helper.setup_email_field($(this));
                break;
                case 'url':
                    helper.setup_url_field($(this));
                break;
            }
        });
    }

    /**
     * Plugin.prototype.setup
     * Setup arrays
    **/
    Plugin.prototype.setup = function(){
        // Global error array
        Plugin.w.error_array = [];
        // Create an array for checkboxes and radio inputs
        Plugin.w.group_array = [];
    }

    /**
     * Plugin.prototype.disable_stuff
     * Disable stuff
    **/
    Plugin.prototype.disable_stuff = function(disable){
        // Reset errors
        helper.reset_errors(Plugin.w.form);
        if(disable){
            // Disable the submit button
            Plugin.w.button.attr('disabled', 'disabled');
        }
        else{
            // Enable the submmit button and re-apply the button name
            Plugin.w.button.removeAttr('disabled').html(Plugin.w.button_name);
        }
    }

    /**
     * Plugin.prototype.clear_localStorage
     * Clears all localStorage values
    **/
    Plugin.prototype.clear_localStorage = function(){
        Plugin.w.fields.each(function(){
            localStorage.removeItem($(this).attr('name'));
        });
    }

    /**
     * Plugin.prototype.get_localStorage
     * Retrieves field values from localStorage
    **/
    Plugin.prototype.get_localStorage = function(){
        if(Plugin.config.localStorage && typeof(Storage) !== 'undefined'){
            Plugin.w.fields.each(function(){
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
     * Plugin.prototype.save_to_localStorage
     * Saves field entries to localStorage
    **/
    Plugin.prototype.save_to_localStorage = function(el){
        if(Plugin.config.localStorage && typeof(Storage) !== 'undefined'){
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
     * Plugin.prototype.js_validate_fields
     * Uses jQuery to check state of fields
    **/
    Plugin.prototype.js_validate_fields = function(){
        // Put all empty fields into array
        Plugin.w.error_array = $.map(Plugin.w.element_array, function(field, i){
            var obj,
                msg = field.closest('.field').find(Plugin.config.validationMessage).val() || field.closest('.field').find(Plugin.config.validationMessage).text();

            // Checkboxes and radio
            if((field.attr('type') === 'checkbox' || field.attr('type') === 'radio') && field.serializeArray().length == 0){
                return obj = {
                    input: field,
                    msg  : msg
                }
            }
            // Email fields
            else if(field.attr('type') === 'email' && !Plugin.config.emailRegEx.test(field.val())){
                return obj = {
                    input: field,
                    msg  : msg
                }
            }
            // URL fields
            else if(field.attr('type') === 'url' && !Plugin.config.urlRegEx.test(field.val())){
                return obj = {
                    input: field,
                    msg  : msg
                }
            }
            // Check for existence
            else if(field.val() === '' || field.val() === 'undefined' || field.val() === undefined || field.val() === '-'){
                return obj = {
                    input: field,
                    msg  : msg
                }
            }
        });
        // Custom validation method
        if($.isFunction(Plugin.config.customValidationMethod)){
            Plugin.w.error_array.push(Plugin.config.customValidationMethod());
        }

        return (Plugin.w.error_array.length === 0) ? true : false;
    }

    /**
     * Plugin.prototype.server_validate_fields
     * Uses AJAX to get a server response on field validation
    **/
    Plugin.prototype.server_validate_fields = function(){
        // Check for a form action
        if(Plugin.w.form_action !== ''){
            var fatalerror = false;
            // Use ajax to check server response

            $.ajax({
                type    : 'POST',
                url     : Plugin.w.form_action,
                data    : Plugin.w.form.serialize() + '&' + Plugin.config.serverID + '=true',
                dataType: 'JSON',
                cache   : false,
                async   : false, // Important, this has to finish first!
                beforeSend: function(){
                    // Add a preloader
                    Plugin.w.button.html(helper.loading_animation());
                },
                success: function(response){
                    response = (typeof response.fields !== 'undefined') ? response.fields : response;
                    // Un-disable stuff
                    Plugin.prototype.disable_stuff(false);
                    // If error
                    if(response.error){
                        // Cycles through the response and adds them to the error_array
                        for(var key in response.error){
                            var a = response.error[key];
                            if(a.field !== undefined){
                                var obj = {
                                    input: $('[name="' + a.field + '"]', Plugin.w.form),
                                    msg  : a.msg
                                }
                                Plugin.w.error_array.push(obj);
                            }
                        }
                    }
                },
                error: function(xhr, ajaxOptions, thrownError){
                    fatalerror = true;
                    // Un-disable stuff
                    Plugin.prototype.disable_stuff(false);
                    // Server error
                    var error = (xhr.responseText !== '') ? xhr.responseText : thrownError;
                    //Plugin.w.form.before().html(error).fadeIn(500);
                }
            });

            return (Plugin.w.error_array.length === 0 && !fatalerror) ? true : false;
        }
        // No form action
        else{
            // Error message
            helper.message("You must have an action defined on your form in order to use server validation.");

            return false;
        }
    }

    /**
     * Plugin.prototype.success
     * Form validated successfully
    **/
    Plugin.prototype.success = function(type, e){
        // Un-disable stuff
        Plugin.prototype.disable_stuff(false);
        // Clear localStorage
        Plugin.prototype.clear_localStorage();
        // If we have a custom post function
        if(type == 'server'){
            e.preventDefault();
            Plugin.w.form.fadeOut(500, function(){
                Plugin.w.form.prev(Plugin.w.success_element).fadeIn(300);
            });
        }
        else if(type == 'js'){
            e.preventDefault();
            $.ajax({
                type : 'POST',
                data : Plugin.w.form.serialize(),
                cache: false,
                async: false,
                beforeSend: function(){
                    // Add a preloader
                    Plugin.w.button.html(helper.loading_animation());
                },
                success: function(){
                    Plugin.w.form.fadeOut(500, function(){
                        Plugin.w.form.prev(Plugin.w.success_element).fadeIn(300);
                    });
                }
            });
        }
        else{
            return true;
        }
    }

    /**
     * Plugin.prototype.failure
     * Form validation failed
    **/
    Plugin.prototype.failure = function(){
        // Set errors
        helper.set_errors(Plugin.w.error_array, Plugin.w.form);
    }

    /**
     * Plugin.prototype.process
     * Process the fields
    **/
    Plugin.prototype.process = function(e){
        // Run setup plugin
        Plugin.prototype.setup();
        // If we are doing server validation
        if(Plugin.config.serverValidation && Plugin.prototype.server_validate_fields()){
            Plugin.prototype.success('server', e);
        }
        // If we are not doing server validation check if form has passed validation
        else if(!Plugin.config.serverValidation && Plugin.prototype.js_validate_fields()){
            Plugin.prototype.success('js', e);
        }
        // Not validated, display errors
        else{
            e.preventDefault();
            Plugin.prototype.failure();
        }
    }

    /**
     * Plugin.prototype.reset_form
     * Reset the form
    **/
    Plugin.prototype.reset_form = function(){
        // Un-disable stuff
        Plugin.prototype.disable_stuff(false);
        // Remove errors
        helper.reset_errors(Plugin.w.form);
        // Clear localStorage
        Plugin.prototype.clear_localStorage();
    }

    /**
     * $.fn.validation
     * The plugin instance.
    **/
    $.fn.validation = function(options){
        return this.each(function(){
            new Plugin(this, options).init();
        });
    };

})(jQuery, window);
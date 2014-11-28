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
     * $.fn.validation
     * Return a unique plugin instance.
    **/
    $.fn.validation = function(options){
        return this.each(function(){
            new Plugin(this, options).init();
        });
    };

    /**
     * $.fn.validation.defaults
     * Default options.
    **/
    $.fn.validation.defaults = {
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

    /**
     * Plugin.prototype
     * Init.
    **/
    Plugin.prototype = {
        init: function(){
            // this
            var _self = this;

            // Global settings.
            _self.settings = $.extend({}, $.fn.validation.defaults, _self.options);
            $.fn.validation.settings = _self.settings;
            // Global arrays
            _self.error_array; _self.group_array;
            // Action for the form.
            _self.form_action = (_self.$elem.data('action')) ? _self.$elem.data('action') : _self.$elem.attr('action');
            // Cache fields.
            _self.fields      = $('input, select, textarea', _self.$elem);
            // Cache the reset button element.
            _self.reset       = $('button[type="reset"], input[type="reset"]', _self.$elem);
            // Cache the submit button element.
            _self.button      = $('button[type="submit"], input[type="submit"]', _self.$elem);
            // Get button text for later.
            _self.button_name = _self.button.text();
            // Success element.
            _self.success_element = (_self.settings.successElement.length) ? _self.settings.successElement : _self.$elem.before($('<div class="form-success">' + _self.settings.defaultSuccessMsg + '</div>'));
            // Put all required fields into array.
            _self.fields_array = $('[required]', _self.$elem).map(function(){
                if(_self.settings.onlyVisibleFields){
                    if($(this).is(':visible')){
                        return $(this).attr('name');
                    }
                }
                else{
                    return $(this).attr('name');
                }
            });
            // Remove duplicates (jQuery.unique only works on DOM elements, we can't use DOM elements because they are ALL unique despite the same name).
            _self.fields_array = helpers.remove_duplicates(_self.fields_array);
            // Reverts the fields_array into an array of DOM elements.
            _self.$element_array = $.map(_self.fields_array, function(field, i){
                return $('[name="' + field + '"]', _self.$elem);
            });

            // Do jQuery event binds.
            _self.binds();
            // Run the plugin.
            _self.run();

            return _self;
        },
        binds: function(){
            var _self = this;

            // On submit.
            _self.$elem.on('submit', function(e){
                _self.process(e);
            });
            // On reset.
            _self.reset.on('click', function(e){
                _self.reset_form(e)
            });
            // On field change.
            _self.fields.change(function(){
                _self.save_to_localStorage($(this));
            });
        },
        run: function(){
            // Add 'novalidate' attribute to form.
            this.$elem.attr('novalidate', 'novalidate');
            // Process fields.
            this.process_fields();
            // Disable the submit button.
            //this.disable_stuff(true);
            // Hide all error messages if not done with CSS already.
            this.$elem.children(this.settings.validationMessage.hide());
            // Get localStorage.
            this.get_localStorage();
        },
        process_fields: function(){
            var _self = this;

            $.each(_self.$element_array, function(){
                // Field type specific actions.
                switch($(this).attr('type')){
                    case 'email':
                        _self.setup_email_field($(this));
                    break;
                    case 'url':
                        _self.setup_url_field($(this));
                    break;
                }
            });
        },
        setup: function(){
            // Global error array.
            this.error_array = [];
            // Create an array for checkboxes and radio inputs.
            this.group_array = [];
        },
        disable_stuff: function(disable){
            // Reset errors.
            this.reset_errors(this.$elem);
            if(disable){
                // Disable the submit button.
                this.button.attr('disabled', 'disabled');
            }
            else{
                // Enable the submmit button and re-apply the button name.
                this.button.removeAttr('disabled').html(this.button_name);
            }
        },
        clear_localStorage: function(){
            this.fields.each(function(){
                localStorage.removeItem($(this).attr('name'));
            });
        },
        get_localStorage: function(){
            if(this.settings.localStorage && typeof(Storage) !== 'undefined'){
                this.fields.each(function(){
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
        },
        save_to_localStorage: function(el){
            if(this.settings.localStorage && typeof(Storage) !== 'undefined'){
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
        },
        js_validate_fields: function(){
            var _self = this;

            // Put all empty fields into array
            _self.error_array = $.map(_self.$element_array, function(field, i){
                var obj,
                    msg = field.closest('.field').find(_self.settings.validationMessage).val() || field.closest('.field').find(_self.settings.validationMessage).text();

                // Checkboxes and radio.
                if((field.attr('type') === 'checkbox' || field.attr('type') === 'radio') && field.serializeArray().length == 0){
                    return obj = {
                        input: field,
                        msg  : msg
                    }
                }
                // Email fields.
                else if(field.attr('type') === 'email' && !_self.settings.emailRegEx.test(field.val())){
                    return obj = {
                        input: field,
                        msg  : msg
                    }
                }
                // URL fields.
                else if(field.attr('type') === 'url' && !_self.settings.urlRegEx.test(field.val())){
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
            if($.isFunction(_self.settings.customValidationMethod)){
                _self.error_array.push(_self.settings.customValidationMethod());
            }

            return (_self.error_array.length === 0) ? true : false;
        },
        server_validate_fields: function(){
            var _self = this;

            // Check for a form action.
            if(_self.form_action !== ''){
                var fatalerror = false;
                // Use ajax to check server response.
                $.ajax({
                    type    : 'POST',
                    url     : _self.form_action,
                    data    : _self.$elem.serialize() + '&' + _self.settings.serverID + '=true',
                    dataType: 'JSON',
                    cache   : false,
                    async   : false, // Important, this has to finish first!
                    beforeSend: function(){
                        // Add a preloader.
                        helpers.loading_animation(_self.button);
                    },
                    success: function(response){
                        response = (typeof response.fields !== 'undefined') ? response.fields : response;
                        // Un-disable stuff.
                        _self.disable_stuff(false);
                        // If error.
                        if(response.error){
                            // Cycles through the response and adds them to the error_array.
                            for(var key in response.error){
                                var a = response.error[key];
                                if(a.field !== undefined){
                                    var obj = {
                                        input: $('[name="' + a.field + '"]', _self.$elem),
                                        msg  : a.msg
                                    }
                                    _self.error_array.push(obj);
                                }
                            }
                        }
                    },
                    error: function(xhr, ajaxOptions, thrownError){
                        // Log it.
                        helpers.log(thrownError);
                        // Set error.
                        fatalerror = true;
                        // Un-disable stuff.
                        _self.disable_stuff(false);
                        // Server error
                        var error = (xhr.responseText !== '') ? xhr.responseText : thrownError;
                        //_self.$elem.before().html(error).fadeIn(500);
                    }
                });

                return (_self.error_array.length === 0 && !fatalerror) ? true : false;
            }
            // No form action.
            else{
                // Error message.
                helpers.log("You must have an action defined on your form in order to use server validation.");

                return false;
            }
        },
        setup_email_field: function(el){
            el.after($('<div class="suggestion">' + this.settings.defaultSuggestText + ' <a href="#" class="alternative-email"><span class="address">address</span>@<span class="domain">domain.com</span></a>?</div>').hide());

            el.on('blur', function(){
                EmailSuggester.init(el);
            });
        },
        setup_url_field: function(el){
            el.on('blur', function(){
                var value = el.val();
                if(value !== '' && !value.match(/^http([s]?):\/\/.*/)){
                    el.val('http://' + value);
                }
            });
        },
        reset_errors: function(){
            this.$elem.removeClass('invalid');
            // Remove current classes.
            $('.' + this.settings.errorClass, this.$elem).removeClass(this.settings.errorClass);
            $('.' + this.settings.errorBoxClass, this.$elem).remove();
        },
        set_errors: function(arr){
            var _self = this;

            // Remove errors.
            _self.reset_errors(_self.$elem);
            // Add error class to form.
            _self.$elem.addClass('invalid');
            // Add new ones.
            $.each(arr, function(){
                var a = $(this);
                var el = a[0].input;
                // Get error message.
                var error = (a[0].msg !== '') ? a[0].msg : _self.settings.defaultErrorMsg;
                // Separator.
                var message = (_self.settings.msgSep) ? (error) ? _self.settings.msgSep + ' <span class="msg">' + error + '</span>' : '' : '<span class="msg">' + error + '</span>';
                // Apply error class to field.
                el.addClass(_self.settings.errorClass).parent('.field').addClass('field-has-errors');
                // Field specific actions.
                if(el.attr('type') === 'checkbox' || el.attr('type') === 'radio'){
                    // Add error element to field.
                    el.closest('.field').find('label, .label').first().append($(_self.settings.errorBoxElement).addClass(_self.settings.errorBoxClass).html(message));
                    // Apply to nearest label if checkbox or radio.
                    el.closest('label').addClass(_self.settings.errorClass);
                }
                else{
                    if(_self.settings.appendErrorToPlaceholder){
                        el.parent().find('label, .label').addClass(_self.settings.errorClass);
                        el.attr('placeholder', error);
                    }
                    else{
                        // Add error element to field.
                        el.parent().find('label, .label').addClass(_self.settings.errorBoxClass).append($(_self.settings.errorBoxElement).addClass(_self.settings.errorBoxClass).html(message));
                    }
                }
                // Add class to form.
                _self.$elem.addClass('form-has-errors');
            });
        },
        success: function(type, e){
            var _self = this;

            // Un-disable stuff.
            _self.disable_stuff(false);
            // Clear localStorage.
            _self.clear_localStorage();
            // If we have a custom post function.
            if(type == 'server'){
                e.preventDefault();
                _self.$elem.fadeOut(500, function(){
                    _self.$elem.prev(_self.success_element).fadeIn(300);
                });
            }
            else if(type == 'js'){
                e.preventDefault();
                $.ajax({
                    type : 'POST',
                    data : _self.$elem.serialize(),
                    cache: false,
                    async: false,
                    beforeSend: function(){
                        // Add a preloader
                        helpers.loading_animation(_self.button);
                    },
                    success: function(){
                        _self.$elem.fadeOut(500, function(){
                            _self.$elem.prev(_self.success_element).fadeIn(300);
                        });
                    }
                });
            }
            else{
                return true;
            }
        },
        failure: function(){
            // Set errors
            this.set_errors(this.error_array, this.$elem);
        },
        process: function(e){
            // Run setup this.
            this.setup();
            // If we are doing server validation.
            if(this.settings.serverValidation && this.server_validate_fields()){
                this.success('server', e);
            }
            // If we are not doing server validation check if form has passed validation.
            else if(!this.settings.serverValidation && this.js_validate_fields()){
                this.success('js', e);
            }
            // Not validated, display errors.
            else{
                e.preventDefault();
                this.failure();
            }
        },
        reset_form: function(){
            // Un-disable stuff.
            this.disable_stuff(false);
            // Remove errors.
            this.reset_errors(this.$elem);
            // Clear localStorage.
            this.clear_localStorage();
        }
    }

    // Email suggester object.
    var EmailSuggester = {};

    /**
     * EmailSuggester.init
     * NULLED.
    **/
    EmailSuggester.init = function(el){
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
        this.domains = $.extend(true, default_domains, $.fn.validation.settings.domains);

        var email_val = el.val(),
            match_val = EmailSuggester.get_match(email_val);

        this.suggestion = el.next('.suggestion');
        this.reveal_suggestion(el, match_val);
    }

    /**
     * EmailSuggester.get_match
     * NULLED.
    **/
    EmailSuggester.get_match = function(query){
        var limit   = 99,
            query   = query.split('@');

        for(var i = 0, ii = this.domains.length; i < ii; i++){
            var distance = EmailSuggester.levenshtein_distance(this.domains[i], query[1]);
            if(distance < limit){
                limit = distance;
                var domain = this.domains[i];
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
     * EmailSuggester.levenshtein_distance
     * NULLED.
    **/
    EmailSuggester.levenshtein_distance = function(a, b){
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
     * EmailSuggester.reveal_suggestion
     * NULLED.
    **/
    EmailSuggester.reveal_suggestion = function(el, result){
        if(result){
            $('.address', this.suggestion).text(result.address);
            $('.domain', this.suggestion).text(result.domain);
            this.suggestion.stop(true, false).slideDown(350);

            $('.alternative-email').on('click', function(e){
                e.preventDefault();
                el.val(result.address + '@' + result.domain);
                EmailSuggester.suggestion.stop(true, false).slideUp(350);
            });
        }
    }

    // Set helpers.
    var helpers = {};

    /**
     * helpers.remove_duplicates
     * Remove duplicates from an array.
    **/
    helpers.remove_duplicates = function(array){
        var result = [];
        $.each(array, function(i, e){
            if($.inArray(e, result) == -1){
                result.push(e);
            }
        });

        return result;
    }

    /**
     * helpers.loading_animation
     * Creates a spinning loading animation.
    **/
    helpers.loading_animation = function(el){
        el.addClass('loading');
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
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
 * Setting Error Messages:
 * If no error message is set a generic one will be used (this can be changed in options). You can set an error message by
 * one of two ways. Either by using the `data-validation-message` HTML attribute on the field in question or by entering
 * a validation message in a hidden HTML element. You must pass the class of this HTML element in the options. The default
 * element is: $('.error-message').
 *
 * Callback:
 * You can supply a callback function which is called on success in the options like so:
 *      $('.js-validate').validation({
 *          ...
 *          successCallback  : function(parameters){
 *              console.log(parameters);
 *          }
 *      });
 * If you are using server validation, the `parameters` argument will supply the results of the validation.
 *
 *
 * domains                 : Array. Adds to default array of top level domains for the email checker to spell check against.
 * localStorage            : Boolean. Whether to use localStorage to save the field values if the page gets refreshed.
 * serverValidation        : Boolean. Whether to use server validation or not.
 * disableAjax             : Boolean. Disables AJAX. serverValidation must be false.
 * onlyVisibleFields       : Boolean. Whether to only validate against visible fields or not.
 * appendErrorToPlaceholder: Boolean. Append the error message to the form field placeholder.
 * disableButtons          : Boolean. Disable the form buttons while processing.
 * scrollToError           : Boolean. If enabled animates a scroll to the first field with an error.
 * fadeOutAnimationSpeed   : Integer. Speed to fade out the form on success.
 * serverID                : String. Post var to send to server side to identify AJAX response.
 * emailRegEx              : String. RegEx to check email addresses against.
 * passRegEx               : String. RegEx to check passwords against.
 * urlRegEx                : String. RegEx to check URLs against.
 * errorBoxClass           : String. Class to apply to the error box.
 * errorClass              : String. Class to apply to fields with an error.
 * msgSep                  : String. Used to separate the field label and the error message.
 * defaultErrorMsg         : String. Field error message if one isn't supplied in the HTML.
 * defaultSuccessMsg       : String. Form success message if one isn't supplied in the HTML.
 * defaultSuggestText      : String. Email suggestion text.
 * errorBoxElement         : String. HTML element type that wraps the error message.
 * preloaderTemplate       : String. HTML template for the preloader. Can include inline styles or use in external stylesheet.
 * validateElement         : jQuery Element. A valid jQuery element to specify fields that aren't required but should be validated if entered.
 * successElement          : jQuery Element. A valid jQuery element that holds the success message.
 * validationMessage       : jQuery Element. A valid jQuery element that holds the error message.
 * customValidationMethod  : Function. Function containing any custom methods to validate against. Must return the element.
 * successCallback         : Function. Function to be called on success of validation. Provides array of fields as parameter if using server validation.
 *
**/

;(function($, window, undefined){
    'use strict';

    // Email suggester object.
    var suggester = {};

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
        disableAjax             : false,
        onlyVisibleFields       : false,
        appendErrorToPlaceholder: false,
        disableButtons          : false,
        scrollToError           : false,
        fadeOutAnimationSpeed   : 500,
        serverID                : 'ajaxrequest',
        emailRegEx              : /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        passRegEx               : /^.*(?=.{8,})(?=.*[0-9])[a-zA-Z0-9]+$/,
        urlRegEx                : /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
        errorBoxClass           : 'response--error',
        errorClass              : 'error',
        msgSep                  : ' -',
        defaultErrorMsg         : 'Please enter a value',
        defaultSuccessMsg       : 'The form has been successfully submitted.',
        defaultSuggestText      : 'Did you mean',
        errorBoxElement         : '<span/>',
        preloaderTemplate       : '<div class="loader" title="1"><svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 50 50" style="display:block; enable-background:new 0 0 50 50;" xml:space="preserve"><path fill="#FFFFFF" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/></path></svg></div>',
        validateElement         : $('.validate'),
        successElement          : $('.form-success'),
        validationMessage       : $('.error-message'),
        customValidationMethod  : null,
        successCallback         : function(parameters){}
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
            // Success element.
            _self.success_element = (_self.settings.successElement.length) ? _self.settings.successElement : _self.$elem.before($('<div class="form-success">' + _self.settings.defaultSuccessMsg + '</div>'));
            // Empty array for elements. Set once the form is submitted.
            _self.$element_array = [];

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
                e.preventDefault();

                _self.set_fields();
                _self.process();
            });
            // On reset.
            _self.reset.on('click', function(e){
                _self.validation_reset(e);
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
            // Hide all error messages if not done with CSS already.
            this.$elem.children(this.settings.validationMessage.hide());
            // Get localStorage.
            this.get_localStorage();
        },
        set_fields: function(){
            var _self = this;

            // Put all required fields into array.
            var fields_array = $('[required]', _self.$elem).map(function(){
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
            fields_array = helpers.remove_duplicates(fields_array);
            // Reverts the fields_array into an array of DOM elements.
            _self.$element_array = $.map(fields_array, function(field, i){
                return $('[name="' + field + '"]', _self.$elem);
            });
        },
        process_fields: function(){
            var _self = this;

            // Put all required fields into array.
            var fields_array = $('[required]', _self.$elem).map(function(){
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
            fields_array = helpers.remove_duplicates(fields_array);
            // Reverts the fields_array into an array of DOM elements.
            _self.$element_array = $.map(fields_array, function(field, i){
                return $('[name="' + field + '"]', _self.$elem);
            });

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
            // Create an array for messages that have no fields.
            this.leftovers = [];
        },
        ajax_request: function(url, request){
            return $.ajax({
                type    : 'POST',
                url     : url,
                data    : request,
                dataType: 'JSON'
            });
        },
        apply_preloader: function(el, destroy){
            // Set destroy.
            destroy = (typeof destroy !== 'undefined') ? true : false;
            // Destroy?
            if(!destroy){
                // Content.
                var content = JSON.stringify(el.html());
                // Loader.
                var loader = $(this.settings.preloaderTemplate).hide();
                // Apply preloader.
                el.css({'width':el.outerWidth(),'height':el.outerHeight(),'position': 'relative'}).html(loader).attr('data-loader-content', content).addClass('loading');
                loader.css({'position':'absolute','top':'50%','left':'50%','margin-left':-loader.outerWidth()/2,'margin-top':-loader.outerHeight()/2}).show();
            }
            else{
                // Content.
                var content = JSON.parse(el.data('loader-content'));
                // Remove preloader
                el.removeClass('loading').html(content).removeAttr('data-loader-content').css({'width':'','height':'','position':''});
            }
        },
        disable_button: function(disable){
            if(this.settings.disableButtons){
                // Disable
                if(disable){
                    // Disable the submit button.
                    this.button.prop('disabled', true);
                }
                else{
                    // Enable the submit button.
                    this.button.prop('disabled', false);
                }
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
        setup_email_field: function(el){
            var _self = this;

            el.after($('<div class="suggestion">' + _self.settings.defaultSuggestText + ' <a href="#" class="alternative-email"><span class="address">address</span>@<span class="domain">domain.com</span></a>?</div>').hide());

            el.on('blur', function(){
                suggester.init(_self, el, _self.settings.domains);
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
        reset_errors: function(form){
            // Set form.
            form = (typeof form !== 'undefined') ? form : this;
            // Remove error class from form.
            form.$elem.removeClass('form-has-errors');
            // Remove generic form messages.
            $('.form-messages').empty();
            // Remove error class from fields.
            $('.field-has-errors', form.$elem).removeClass('field-has-errors');
            // Remove error class from fieldsets.
            $('.fieldset-has-errors', form.$elem).removeClass('fieldset-has-errors');
            // Hide email suggester.
            $('.suggestion', form.$elem).hide();
            // Remove current classes.
            $('.' + form.settings.errorClass, form.$elem).removeClass(form.settings.errorClass);
            $('.' + form.settings.errorBoxClass, form.$elem).remove();
        },
        attach_errors: function(arr){
            var _self = this;

            // Remove empty elements.
            arr = jQuery.grep(arr, function(n, i){
              return (n !== "" && n != null);
            });
            // Remove previous errors.
            _self.reset_errors();
            // Un-disable stuff.
            _self.disable_button(false);
            // Add error class to form.
            _self.$elem.addClass('form-has-errors');
            // Add new ones.
            $.each(arr, function(index){
                if($(this) == undefined){return;}
                var a = $(this),
                    el = a[0].input;

                // Get error message.
                var error = (a[0].msg !== '') ? a[0].msg : _self.settings.defaultErrorMsg;
                // Separator.
                var message = (_self.settings.msgSep) ? (error) ? _self.settings.msgSep + ' <span class="msg">' + error + '</span>' : '' : '<span class="msg">' + error + '</span>';

                // Check element exists in the DOM.
                if(el.length && el.is(':input') && el.attr('type') !== 'hidden'){
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
                            el.parent().find('label, .label').append($(_self.settings.errorBoxElement).addClass(_self.settings.errorBoxClass).html(message));
                        }
                    }
                    // Set errors on fieldset.
                    el.closest('fieldset').addClass('fieldset-has-errors');
                    // Scroll to first error field.
                    if(index == 0 && _self.settings.scrollToError){
                        $('html,body').animate({
                            scrollTop: (el.offset().top - 25)
                        }, 500);
                    }
                }
                else if(!el.is(':input')){
                    el.prepend('<p>' + error + '</p>').show();
                }
                else{
                    _self.leftovers.push(error);
                }
            });
        },
        field_checker: function(field){
            var _self = this;
            var obj;
            var msg = field.data('validation-message') || field.closest('.field').find(_self.settings.validationMessage).val() || field.closest('.field').find(_self.settings.validationMessage).text();

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
        },
        js_validate_fields: function(){
            var _self = this;

            // Put all empty fields into array.
            _self.error_array = $.map(_self.$element_array, function(field, i){
                return _self.field_checker(field);
            });
            // Custom validation method.
            if($.isFunction(_self.settings.customValidationMethod)){
                _self.error_array.push(_self.settings.customValidationMethod());
            }
            // Validate non required fields with length.
            _self.$elem.find(_self.settings.validateElement).each(function(){
                if($(this).val() !== ''){
                    _self.error_array.push(_self.field_checker($(this)));
                }
            });

            // Array of elements for the callback.
            var parameters = null;

            // Outcome.
            if(_self.error_array.length === 0){
                _self.success('js', parameters);
            }
            else{
                _self.validation_error();
            }
        },
        server_validate_fields: function(){
            var _self = this;

            // Check for a form action.
            if(_self.form_action !== ''){
                // Set flag.
                var fatalerror = false;
                // Ajax request.
                var ajax_promise = _self.ajax_request(_self.form_action, _self.$elem.serialize() + '&' + _self.settings.serverID + '=true');

                // Process promise.
                ajax_promise.done(function(xhr){
                    // If error.
                    if(xhr.type == 'error'){
                        if(typeof xhr.field !== 'undefined'){
                            var obj = {
                                input: (xhr.field.indexOf('.') === 0) ? $(xhr.field) : $('[name="' + xhr.field + '"]', _self.$elem),
                                msg  : (typeof xhr.response !== 'undefined') ? xhr.response : xhr.responses[i]
                            }
                            _self.error_array.push(obj);
                        }
                        else{
                            // Loops through the response and adds them to the error_array.
                            for(var i = 0, ii = xhr.fields.length; i < ii; i++){
                                var obj = {
                                    input: (xhr.field.indexOf('.') === 0) ? $(xhr.field) : $('[name="' + xhr.fields[i] + '"]', _self.$elem),
                                    msg  : (typeof xhr.response !== 'undefined') ? xhr.response : xhr.responses[i]
                                }
                                _self.error_array.push(obj);
                            }
                        }
                    }

                    // Array of elements for the callback.
                    var parameters = _self.$elem.serializeArray();

                    // Outcome.
                    if(_self.error_array.length === 0 && !fatalerror){
                        _self.success('server', parameters);
                    }
                    else{
                        _self.validation_error();
                    }
                }).fail(function(xhr, ajaxOptions, thrownError){
                    // Log it.
                    helpers.log(xhr);
                    helpers.log(thrownError);
                    // Set error.
                    fatalerror = true;
                });
            }
            // No form action.
            else{
                // Error message.
                helpers.log("You must have an action defined on your form in order to use server validation.");

                return false;
            }
        },
        success: function(type, callback_parameters){
            var _self = this;

            // Clear localStorage.
            _self.clear_localStorage();
            // If we have a custom post function.
            if(type == 'server'){
                _self.$elem.fadeOut(_self.settings.fadeOutAnimationSpeed, function(){
                    // Validation Complete.
                    _self.validation_success();
                    // Fade in success element.
                    _self.$elem.prev(_self.success_element).fadeIn((_self.settings.fadeOutAnimationSpeed / 2));
                    // Callback
                    _self.settings.successCallback.call(_self, callback_parameters);
                });
            }
            else if(!_self.settings.disableAjax && type == 'js'){
                // Ajax request.
                var ajax_promise = _self.ajax_request(_self.form_action, _self.$elem.serialize() + '&' + _self.settings.serverID + '=true');

                // Process promise.
                ajax_promise.always(function(response){
                    _self.$elem.fadeOut(_self.settings.fadeOutAnimationSpeed, function(){
                        // Validation Complete.
                        _self.validation_success();
                        // Fade in success element.
                        _self.$elem.prev(_self.success_element).fadeIn((_self.settings.fadeOutAnimationSpeed / 2));
                        // Callback
                        _self.settings.successCallback.call(_self, callback_parameters);
                    });
                });
            }
            else{
                // Unbind submit.
                _self.$elem.unbind('submit');
                // Validation Complete.
                _self.validation_success();
                // Callback
                _self.settings.successCallback.call(_self, callback_parameters);
                // Trigger submit after unbind.
                _self.$elem.trigger('submit');
            }
        },
        process: function(){
            // Apply preloader.
            this.apply_preloader(this.button);
            // Disable stuff.
            this.disable_button(true);
            // Run setup this.
            this.setup();
            // If we are doing server validation.
            if(this.settings.serverValidation){
                this.server_validate_fields();
            }
            // If we are not doing server validation check if form has passed validation.
            else if(!this.settings.serverValidation){
                this.js_validate_fields();
            }
        },
        validation_success: function(){
            // Destroy preloader.
            this.apply_preloader(this.button, true);
            // Reset validation.
            this.validation_reset();
        },
        validation_error: function(){
            var _self = this;

            // Process for 0.5 second.
            setTimeout(function(){
                // Set errors
                _self.attach_errors(_self.error_array, _self.$elem);
                // Destroy preloader.
                _self.apply_preloader(_self.button, true);
            }, 500);
        },
        validation_reset: function(){
            // Destroy preloader.
            this.apply_preloader(this.button, true);
            // Un-disable stuff.
            this.disable_button(false);
            // Remove errors.
            this.reset_errors();
            // Clear localStorage.
            this.clear_localStorage();
            // Reset all field values.
            this.$elem.find('input[type="text"], input[type="email"], input[type="url"], textarea, select').val('');
        }
    }

    /**
     * suggester.init
     * NULLED.
    **/
    suggester.init = function(form, el, plugin_domains){
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
        this.domains = $.extend(true, default_domains, plugin_domains);

        var email_val = el.val(),
            match_val = suggester.get_match(email_val);

        this.suggestion = el.next('.suggestion');
        this.reveal_suggestion(form, el, match_val);
    }

    /**
     * suggester.get_match
     * NULLED.
    **/
    suggester.get_match = function(query){
        var limit   = 99,
            query   = query.split('@');

        for(var i = 0, ii = this.domains.length; i < ii; i++){
            var distance = suggester.levenshtein_distance(this.domains[i], query[1]);
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
     * suggester.levenshtein_distance
     * NULLED.
    **/
    suggester.levenshtein_distance = function(a, b){
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
     * suggester.reveal_suggestion
     * NULLED.
    **/
    suggester.reveal_suggestion = function(form, el, result){
        if(result){
            Plugin.prototype.reset_errors(form);
            // Set email address.
            $('.address', this.suggestion).text(result.address);
            // Set email domain.
            $('.domain', this.suggestion).text(result.domain);
            // Reveal suggestion.
            this.suggestion.stop(true, false).slideDown(350);
            // Click event.
            $('.alternative-email').on('click', function(e){
                e.preventDefault();

                // Apply suggestion.
                el.val(result.address + '@' + result.domain);
                // Hide suggestion.
                suggester.suggestion.stop(true, false).slideUp(350);
            });
        }
    }

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

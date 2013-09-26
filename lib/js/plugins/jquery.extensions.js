;(function($){

    /**
     * Centers any element vertically, horizontally or both
     * can pass an element to center relative to that element
    **/
    $.fn.extCenter = function(method, element){
        var el = (typeof element !== 'undefined') ? element : $(window);
        el.css({'position': 'relative'});
        this.css({'position': 'absolute', 'z-index': '999'});
        var methods = {
            all: function(){
                this.css('top', ((el.height() - this.outerHeight()) / 2) + el.scrollTop() + 'px');
                this.css('left', ((el.width() - this.outerWidth()) / 2) + el.scrollLeft() + 'px');
                return this;
            },
            vertical: function(){
                this.css('top', ((el.height() - this.outerHeight()) / 2) + el.scrollTop() + 'px');
                return this;
            },
            horizontal: function(){
                this.css('left', ((el.width() - this.outerWidth()) / 2) + el.scrollLeft() + 'px');
                return this;
            }
        }
        if(methods[method]){
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if(typeof method === 'object' || !method){
            return methods.all.apply(this, arguments);
        }
        else{
            $.error('Method ' +  method + ' does not exist on jQuery.extCenter');
        }
    }

    /**
     * Adds a "blur" class to any element
    **/
    $.fn.extBlur = function(method){
        var methods = {
            on: function(){
                this.addClass('js_blur');
                return this;
            },
            off: function(){
                this.removeClass('js_blur');
                return this;
            }
        };
        if(methods[method]){
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if(typeof method === 'object' || !method){
            return methods.on.apply(this, arguments);
        }
        else{
            $.error('Method ' +  method + ' does not exist on jQuery.extBlur');
        }
    }

    /**
     * Adds an error class to any element
    **/
    $.fn.extError = function(method){
        var methods = {
            on: function(){
                this.each(function(){
                    $(this).addClass('alert error');
                });
                return this;
            },
            off: function(){
                this.each(function(){
                    $(this).removeClass('alert error');
                });
                return this;
            }
        };
        if(methods[method]){
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if(typeof method === 'object' || !method){
            return methods.on.apply(this, arguments);
        }
        else{
            $.error('Method ' +  method + ' does not exist on jQuery.extError');
        }
    }

    /**
     * Creates a preloading animation
    **/
    $.fn.extPreloader = function(options){
        var loader,
            el = this,
            rn = parseInt(Math.random() * (100 - 1) + 1, 10),
            defaults = {
                loader     : 'loader-' + rn,
                loadershape: 'spiral',
                loadersize : 30,
                loaderhex  : '#333',
                loadmethod : 'html',
                loaderstyle: 'display: inline-block;'
            }

        // Extend the defaults
        var settings = $.extend({}, defaults, options);

        // Return each instance
        return this.each(function(){

            // Adding the loader
            switch(settings.loadmethod){
                case 'html' :
                    el.html('<div id="' + settings.loader + '" style="' + settings.loaderstyle + '"></div>');
                break;
                case 'after' :
                    el.after('<div id="' + settings.loader + '" style="' + settings.loaderstyle + '"></div>');
                break;
                case 'before' :
                    el.before('<div id="' + settings.loader + '" style="' + settings.loaderstyle + '"></div>');
                break;
                case 'prepend' :
                    el.prepend('<div id="' + settings.loader + '" style="' + settings.loaderstyle + '"></div>');
                break;
                case 'append' :
                    el.append('<div id="' + settings.loader + '" style="' + settings.loaderstyle + '"></div>');
                break;
                default :
                    el.html('<div id="' + settings.loader + '" style="' + settings.loaderstyle + '"></div>');
                break;
            }

            // Get the canvas loader
            $.getScript('http://heartcode-canvasloader.googlecode.com/files/heartcode-canvasloader-min-0.9.js', function(){
                loader = new CanvasLoader(settings.loader);
                loader.setShape(settings.loadershape);
                loader.setDiameter(settings.loadersize);
                loader.setDensity(13);
                loader.setRange(0.6);
                loader.setSpeed(1);
                loader.setColor(settings.loaderhex);
                loader.show();
            });

            // Destroy method
            el.destroyExtPreloader = function(){
                loader.kill();
            }
        });
    }

    /**
     * Requests confirmation before completing action
    **/
    $('.confirm-action').on({
        click: function(e){
            var custom_message = $(this).data('confirm-message'),
                message        = (custom_message !== undefined) ? custom_message : 'Are you sure?';

            return confirm(message);
        }
    });

    /**
     * Buttonless form submittal
    **/
    $('.js-send').each(function(){
        var jsform = $(this).offsetParent('form');
        $('button', jsform).hide();
        $(this).on({
            change: function(){
                jsform.submit();
            }
        });
    });

})(jQuery, window, document);

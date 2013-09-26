/**
 * ui.js
 * File description goes here.
**/
;(function(global, $){

	var ui;

	ui = global.ui || {};

	/**
	 * ui.init
	 * Init the ui module.
	**/
	ui.init = function(){
		ui.shimPlaceholder();
	}

	/**
	 * ui.shimPlaceholder
	 * Adds the placeholder attribute to legacy browsers.
	**/
	ui.shimPlaceholder = function(){
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

	/**
	 * ui.tabs
	 * Creates jQuery tabs.
	**/
	ui.tabs = function(){
        $(function(){
    		$('.tabs').each(function(){
                $('.tab', this).hide();
                $('.tab', this).first().show().addClass('active');
                $('.nav li', this).first().addClass('active');

                $('.nav li a', this).on({
                    click: function(e){
                        e.preventDefault();
                        var tabNav    = $(this).parent().parent(),
                            tabSystem = tabNav.next();
                        if(!$(this).parent().hasClass('active')){
                            var a = $(this).data('tab-target');
                            $('li.active', tabNav).removeClass('active');
                            $(this).parent().addClass('active');
                            $('.active', tabSystem).hide().removeClass('active');
                            $('#' + a, tabSystem).fadeIn(500).addClass('active');
                        }
                    }
                });
            });
        });
	}

	/**
	 * ui.accordion
	 * Creates a jQuery accordion.
	**/
	ui.accordion = function(){
        $(function(){
    		$('.accordion').each(function(){
                var accordion = $(this),
                    title     = $('.accordion-title', this),
                    content   = $('.accordion-content', this);

                // Reset the accordion
                $('.active-content', accordion).removeClass('active-content');
                $('.active-title', accordion).removeClass('active-title');

                title.css({'cursor': 'pointer'});
                title.first().show().addClass('active-title');

                content.hide();
                content.first().show().addClass('active-content');

                title.on({
                    click: function(){
                        if(!$(this).hasClass('active-title')){
                            $('.active-content', accordion).slideUp(500).removeClass('active-content');
                            $('.active-title', accordion).removeClass('active-title');
                            $('.active-title:after', accordion).css({'border-left-color': '#000'});
                            $(this).addClass('active-title', accordion).next().slideDown(500).addClass('active-content');
                        }
                    }
                });
            });
        });
	}

	// Export ui object for use.
	window.ui = ui;

})(window, jQuery);

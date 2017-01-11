// Check out the github repo
// https://github.com/Wixel/readingbar
// $('article').readingbar();

(function($) {
    $.fn.viewportOffset = function() {
        var offset = $(this).offset();

        return {
            top: offset.top + $(window).scrollTop()
        };
    };
    $.fn.readingbar = function(options) {
        if ($('.read-bar').length) {

        }else{
            $('<div class="read-bar"></div>').appendTo('body');
            $('.read-bar').css({
                position: 'fixed',
                bottom: '0',
                left: '0',
                width: '0',
                maxWidth: '100%',
            });
            var defaults = {
                backgroundColor: '#E76E66',
                height: '5px',
            };
            settings = $.extend({}, defaults, options);
            $('.read-bar').css({
                height: settings.height,
                backgroundColor: settings.backgroundColor
            });
        };
        _ = $(this);

        var readHeight = _.outerHeight();
        var startPoint = _.offset().top * 1.4;
        var currentPos = 0;

            $(document).on('scroll', function(){
              currentPos = (_.viewportOffset().top - startPoint) / readHeight * 100;
              $('.read-bar').css('width', currentPos + '%');
            });
          };
}(jQuery));
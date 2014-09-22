var FontsComLoader = (function() {

    var _get = function(url, callback) {
        var xdomain = 'XDomainRequest' in window && window.XDomainRequest !== null;
        var xhr = xdomain ? new XDomainRequest() : new XMLHttpRequest();

        if (xdomain) {
            xhr.onload = function(data) {
                callback.call(xhr, xhr.responseText);
            };
        }

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                callback.call(xhr, xhr.responseText);
            }
        }

        xhr.open("GET", url, true);
        xhr.send();
    };


    var methods = {
        init: function(url, fonts) {
            this.url = url;
            this.fonts = fonts;

            this.protocol = window.location.protocol + '//';
            this.fontscomURL = this.protocol + 'fast.fonts.net';
        },

        load: function(url, fonts) {
            if (!fonts || !url) return;

            var ins =  new methods.init(url, fonts);
            _get(ins.url, function(stylesheet) {
                ins.addStyleTag();
                ins.CSSString = stylesheet;
                ins.appendCSS(ins.parseCSS());
            });
            return ins;
        },

        parseCSS: function(css) {
            css = css || this.CSSString;

            var weight, style, regx;
            css = css.replace(/url\("\//g, 'url("' + this.fontscomURL +'/');
            css = css.replace(/url\('\//g, 'url(\'' + this.fontscomURL + '/');
            css = css.replace(/url\(\//g, 'url(' + this.fontscomURL + '/');

            for (font in this.fonts) {
                var name = font;
                var variants = this.fonts[font];

                for (matchExp in variants) {
                    regx = new RegExp('(font-family:(.*)' + matchExp + '(.*)";)', 'g');
                    weight = typeof variants[matchExp] === 'string' ? variants[matchExp] :
                           variants[matchExp].weight;

                    style = variants[matchExp].style || 'normal';
                    css = css.replace(regx, 'font-family:"' + font + '"; font-weight: ' + weight + ';' + 'font-style:' + style + ';');
                }
            }

            return css;
        },

        addStyleTag: function() {
            this.scriptTag = document.createElement('style');
            document.head.appendChild(this.scriptTag);
            this.disable();
            return this;
        },

        appendCSS: function(css) {
            css = css || this.CSSString;
            this.scriptTag.innerHTML = css;
            this.enable();
            return this;
        },

        disable: function() {
            this.scriptTag.disabled = true;
            return this;
        },

        enable: function() {
            this.scriptTag.disabled = false;
            return this;
        }
    };

    methods.init.prototype = methods;

    return methods;

})();

FontsComLoader.load('http://font-url/stylesheet.css', {
    'Font': {
        'FontName Light'     : '200',
        'FontName Regular'   : '400',
        'FontName Bold'      : '700',
        'FontName Extra Bold': '900'
    }
});
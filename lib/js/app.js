'use strict';

requirejs.config({
    baseUrl: 'lib/js/',
    shim   : {
        formValidation : {
			deps   : ['jquery'],
			exports: 'formValidation'
        },
        lightBox : {
			deps   : ['jquery'],
			exports: 'lightBox'
        },
        extensions : {
			deps   : ['jquery'],
			exports: 'extensions'
        },
        scrollto : {
			deps   : ['jquery'],
			exports: 'scrollto'
        },
        slider : {
			deps   : ['jquery'],
			exports: 'slider'
        }
    },
    paths  : {
    	// Require Modules
		req_async: 'libs/require/require.async',
    	// AMD Modules
		jquery: [
			'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
			'libs/jquery.1.10.2.min'
		],
		respond       : 'libs/respond.min',
		retina        : 'libs/retina.min',
		// Non AMD modules
		formValidation: 'plugins/jquery.formValidation.min',
		lightBox      : 'plugins/jquery.lightBox.min',
		extensions    : 'plugins/jquery.extensions.min',
		scrollto      : 'plugins/jquery.scrollto.min',
		slider        : 'plugins/jquery.bxslider.min'
    }
});

requirejs([
	'global'
]);

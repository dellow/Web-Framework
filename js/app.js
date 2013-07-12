'use strict';

requirejs.config({
	enforceDefine: true,
    baseUrl: 'js/lib',
    paths  : {
		app   : '../app',
		jquery: [
			'//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min',
			'lib/jquery.1.10.2'
		]
    }
});

requirejs(['app/global']);

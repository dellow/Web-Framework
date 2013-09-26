/**
 * main.js
 * Main JS file. Loads modules with RequireJS.
**/

'use strict';

require.config({
    baseUrl: 'lib/js/',
    paths: {
		// Libraries
		jquery        : [
			'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
			'libs/jquery.1.10.2.min'
		],
		respond       : 'libs/respond.min',
		retina        : 'libs/retina.min',
    	// Local
		helper        : 'app/helper',
		ui            : 'app/ui',
		// RequireJS Modules
		req_async     : 'libs/require/require.async',
		// Plugins
		extensions    : 'plugins/jquery.extensions.min',
		formValidation: 'plugins/jquery.formValidation.min',
		lightBox      : 'plugins/jquery.lightBox.min',
		scrollto      : 'plugins/jquery.scrollto.min',
		slider        : 'plugins/jquery.bxslider.min'
    },
    shim: {
    	/* -- Libraries -- */
        jquery: {
			exports: 'jQuery'
        },
    	/* -- Local -- */
    	// Helper: Helpers
    	helper: {
			exports: 'helper'
    	},
    	// UI: Gets all plugins
    	ui: {
			deps   : ['jquery', 'formValidation', 'lightBox', 'scrollto', 'extensions'],
			exports: 'ui'
    	},
    	// Global: Gets Helper & UI
    	global: {
			deps   : ['helper', 'ui'],
			exports: 'global'
    	},
        /* -- Extensions -- */
        // Extensions: jQuery extensions
        extensions: {
			deps   : ['jquery'],
			exports: 'extensions'
        },
        /* -- Scripts -- */
        formValidation: {
			deps   : ['jquery'],
			exports: 'formValidation'
        },
        lightBox: {
			deps   : ['jquery'],
			exports: 'lightBox'
        },
        scrollto: {
			deps   : ['jquery'],
			exports: 'scrollto'
        },
        slider: {
			deps   : ['jquery'],
			exports: 'slider'
        }
    }
});

require(['global']);

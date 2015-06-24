/**
 *
 * Application or Website name
 *
 * Copyright 2015, Author Name
 * Some information on the license.
 *
 * Jasmine Tests > General
 *
**/

// jQuery.
var $ = jQuery = require('jquery');


/* ==========================================================================
/* Simple Tests
========================================================================== */
describe('JavaScript addition operator', function(){
    it('Adds two numbers together', function(){
        expect(1 + 2).toEqual(3);
    });
});


/* ==========================================================================
/* Binds
========================================================================== */
// // Require.
// var Binds = require('../../app/module.binds');
// // Vars.
// var binds = new Binds();

// // Test.
// describe('Binds tests', function(){
//     it('Should return 20', function(){
//         expect(binds.method_name(10)).toBe(20);
//     });
// });

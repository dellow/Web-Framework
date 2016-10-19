/**
*
* Module > Test
*
* Copyright 2016, Author Name
* Some information on the license.
*
**/

/* ======================================================== */
/* Dependencies
/* ======================================================== */
require('../../common')
require('../index')

/* ======================================================== */
/* Module
/* ======================================================== */
// Get module.
var Module = require('./module.sample')

/* ======================================================== */
/* Tests
/* ======================================================== */
// Suite.
describe('Sample module', function () {
  // Spec.
  it('moduleMethod should return false', function () {
    expect(Module.moduleMethod()).toBeFalsy()
  })
})

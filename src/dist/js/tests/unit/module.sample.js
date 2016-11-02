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
require('../common')
require('../app')

/* ======================================================== */
/* Module
/* ======================================================== */
// Get module.
var Module = require('../../app/public/module.sample')

/* ======================================================== */
/* Tests
/* ======================================================== */
// Suite.
describe('Module: Sample', function () {
  // Spec.
  it('moduleMethod should return false', function () {
    expect(Module.moduleMethod()).toBeFalsy()
  })
})

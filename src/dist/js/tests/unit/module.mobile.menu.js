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
require('../../app')

/* ======================================================== */
/* Module
/* ======================================================== */
// Get module.
var Module = require('../../app/public/module.mobile.menu')

/* ======================================================== */
/* Tests
/* ======================================================== */
// Suite.
describe('Module: Mobile Menu', function () {
  // Suite.
  describe('Should have', function () {
    // Spec.
    it('settings object', function () {
      expect(typeof Module.settings).toBe('object')
    })
    // Spec.
    it('init method', function () {
      expect(typeof Module.init).toBe('function')
    })
    // Spec.
    it('setHeaderHeight method', function () {
      expect(typeof Module.setHeaderHeight).toBe('function')
    })
    // Spec.
    it('calculateHeight method', function () {
      expect(typeof Module.calculateHeight).toBe('function')
    })
    // Spec.
    it('style method', function () {
      expect(typeof Module.style).toBe('function')
    })
  })
  // Suite.
  describe('init() method', function () {
    // Spec.
    it('should call setHeaderHeight() without parameters', function () {
      spyOn(Module, 'setHeaderHeight')
      Module.init()
      expect(Module.setHeaderHeight).toHaveBeenCalledWith()
    })
    // Spec.
    it('should call style() with a DOM element and CSS object', function () {
      spyOn(Module, 'style')
      Module.init()
      expect(Module.style).toHaveBeenCalledWith($('.js--mobileMenu--menu'), {'left': '-100%', 'opacity': '0'})
    })
  })
  // Suite.
  describe('setHeaderHeight() method', function () {
    // Spec.
    it('should call calculateHeight() with a DOM element', function () {
      spyOn(Module, 'calculateHeight')
      Module.setHeaderHeight()
      expect(Module.calculateHeight).toHaveBeenCalledWith($('.js--mobileMenu--header'))
    })
  })
  // Suite.
  describe('calculateHeight() method', function () {
    // Spec.
    it('should return number', function () {
      expect(Module.calculateHeight($('<div style="height: 100px;"></div>'))).toEqual(jasmine.any(Number))
    })
  })
})

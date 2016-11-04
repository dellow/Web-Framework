/**
*
* Module > Test
*
* Copyright 2016, Author Name
* Some information on the license.
*
**/

// Set module.
var TestModule = Public.modules.MobileMenu

// Suite.
describe('Module: Mobile Menu', function () {
  // Suite.
  describe('Should have', function () {
    // Spec.
    it('settings object', function () {
      expect(typeof TestModule.settings).toBe('object')
    })
    // Spec.
    it('init method', function () {
      expect(typeof TestModule.init).toBe('function')
    })
    // Spec.
    it('setHeaderHeight method', function () {
      expect(typeof TestModule.setHeaderHeight).toBe('function')
    })
    // Spec.
    it('calculateHeight method', function () {
      expect(typeof TestModule.calculateHeight).toBe('function')
    })
    // Spec.
    it('style method', function () {
      expect(typeof TestModule.style).toBe('function')
    })
  })
  // Suite.
  describe('init() method', function () {
    // Spec.
    it('should call setHeaderHeight() without parameters', function () {
      spyOn(TestModule, 'setHeaderHeight')
      TestModule.init()
      expect(TestModule.setHeaderHeight).toHaveBeenCalledWith()
    })
    // Spec.
    it('should call style() with a DOM element and CSS object', function () {
      spyOn(TestModule, 'style')
      TestModule.init()
      expect(TestModule.style).toHaveBeenCalledWith($('.js--mobileMenu--menu'), {'left': '-100%', 'opacity': '0'})
    })
  })
  // Suite.
  describe('setHeaderHeight() method', function () {
    // Spec.
    it('should call calculateHeight() with a DOM element', function () {
      spyOn(TestModule, 'calculateHeight')
      TestModule.setHeaderHeight()
      expect(TestModule.calculateHeight).toHaveBeenCalledWith($('.js--mobileMenu--header'))
    })
  })
  // Suite.
  describe('calculateHeight() method', function () {
    // Spec.
    it('should return number', function () {
      expect(TestModule.calculateHeight($('<div style="height: 100px;"></div>'))).toEqual(jasmine.any(Number))
    })
  })
})

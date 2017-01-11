/**
*
* Module > Test
*
* Copyright 2017, Awesome Jobs
* Some information on the license.
*
**/

import MobileMenu from '../mobile.menu'

// Suite.
describe('Class/Global/MobileMenu', function () {
  // Suite.
  describe('should have', function () {
    // Spec.
    it('settings object', function () {
      expect(typeof MobileMenu._settings).toBe('object')
    })
    // Spec.
    it('init method', function () {
      expect(typeof MobileMenu.init).toBe('function')
    })
    // Spec.
    it('setHeaderHeight method', function () {
      expect(typeof MobileMenu.setHeaderHeight).toBe('function')
    })
    // Spec.
    it('calculateHeight method', function () {
      expect(typeof MobileMenu.calculateHeight).toBe('function')
    })
    // Spec.
    it('style method', function () {
      expect(typeof MobileMenu.style).toBe('function')
    })
  })
  // Suite.
  describe('startMenu() method', function () {
    // Spec.
    it('should call setHeaderHeight() without parameters', function () {
      spyOn(MobileMenu, 'setHeaderHeight')
      MobileMenu.startMenu()
      expect(MobileMenu.setHeaderHeight).toHaveBeenCalledWith()
    })
    // Spec.
    it('should call style() with a DOM element and CSS object', function () {
      spyOn(MobileMenu, 'style')
      MobileMenu.startMenu()
      expect(MobileMenu.style).toHaveBeenCalledWith($('.js--mobileMenu--menu'), {'left': '-100%', 'opacity': '0'})
    })
  })
  // Suite.
  describe('setHeaderHeight() method', function () {
    // Spec.
    it('should call calculateHeight() with a DOM element', function () {
      spyOn(MobileMenu, 'calculateHeight')
      MobileMenu.setHeaderHeight()
      expect(MobileMenu.calculateHeight).toHaveBeenCalledWith($('.js--mobileMenu--header'))
    })
  })
  // Suite.
  describe('calculateHeight() method', function () {
    // Spec.
    it('should return number', function () {
      expect(MobileMenu.calculateHeight($('<div style="height: 100px;"></div>'))).toEqual(jasmine.any(Number))
    })
  })
})

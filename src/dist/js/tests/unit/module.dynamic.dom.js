/**
*
* Module > Test
*
* Copyright 2016, Author Name
* Some information on the license.
*
**/

// Set module.
var TestModule = global.Public.modules.DynamicDOM

// Suite.
describe('Module: Dynamic DOM', function () {
  // Suite.
  describe('should have', function () {
    // Spec.
    it('settings object', function () {
      expect(typeof TestModule.settings).toBe('object')
    })
    // Spec.
    it('updateTarget method', function () {
      expect(typeof TestModule.updateTarget).toBe('function')
    })
    // Spec.
    it('reportNoTarget method', function () {
      expect(typeof TestModule.reportNoTarget).toBe('function')
    })
  })
  // Suite.
  describe('updateTarget() method', function () {
  })
  // Suite.
  describe('reportNoTarget() method', function () {
  })
})

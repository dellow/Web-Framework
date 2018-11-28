/**
*
* Module > Test
*
* Copyright 2019, Awesome Jobs
* Some information on the license.
*
**/

import DynamicDOM from '../dynamic.dom'

// Suite.
describe('Class/Global/DynamicDOM', function () {
  // Suite.
  describe('should have', function () {
    // Spec.
    it('settings object', function () {
      expect(typeof DynamicDOM._settings).toBe('object')
    })
    // Spec.
    it('events method', function () {
      expect(typeof DynamicDOM.events).toBe('function')
    })
    // Spec.
    it('updateTarget method', function () {
      expect(typeof DynamicDOM.updateTarget).toBe('function')
    })
    // Spec.
    it('reportNoTarget method', function () {
      expect(typeof DynamicDOM.reportNoTarget).toBe('function')
    })
  })
})

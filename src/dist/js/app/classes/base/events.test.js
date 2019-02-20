/**
 *
 * Test
 *
 * Copyright 2019, Author Name
 * Some information on the license.
 *
**/

// Import class.
import EventsClass from './events'

window.config = window.config || {}

const Events = new EventsClass

// Get common.
require('../../../libs/entry.js')

// Tests.
it('should register new events', () => {
  const spy = jest.spyOn(Events, 'registerEvent')
  Events.extendEvents({
    events: {
      'ready null': 'ready',
    }
  })

  expect(spy).toBeCalledWith(expect.any(String), expect.any(String))
})

it('should create a window event', () => {
  const spy = jest.spyOn(Events, 'onWindow')
  Events.extendEvents({
    events: {
      'load null': 'ready',
    }
  })

  expect(spy).toBeCalled()
})

it('should create a selector event', () => {
  const spy = jest.spyOn(Events, 'onSelector')
  Events.extendEvents({
    events: {
      'document null': 'ready',
    }
  })

  expect(spy).toBeCalled()
})

it('should create a keycode event', () => {
  const spy = jest.spyOn(Events, 'onKeycode')
  Events.extendEvents({
    events: {
      'keycode null': 'ready',
    }
  })

  expect(spy).toBeCalled()
})

it('should create a selector event', () => {
  const spy = jest.spyOn(Events, 'onKeycode')
  Events.extendEvents({
    events: {
      'click null': 'ready',
    }
  })

  expect(spy).toBeCalled()
})

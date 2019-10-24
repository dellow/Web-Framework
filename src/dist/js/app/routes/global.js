/**
 *
 * Route
 *
 * Copyright 2019, Author Name
 * Some information on the license.
 *
**/

import Events from '../classes/base/events'

class Route
{

  /**
   * Constructor for this class.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  constructor()
  {
  }

  /**
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  init()
  {
  }

  /**
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  listeners()
  {
    // Extend the events system.
    (new Events).extendEvents({
      events: {
        'click [data-js-toggle]': this.toggleElement.bind(this),
        'click [data-js-event="exampleEvent"]': this.exampleEvent.bind(this),
      }
    })
  }

  /**
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  toggleElement(e)
  {
    e[0].preventDefault()

    // Cache trigger.
    const $trigger = $(e[0].currentTarget)
    // Get data value.
    const $dataValue = $trigger.data('js-toggle')

    if ($dataValue) {
      // Parse all values.
      const values = $dataValue.split('|')
      // Loop through values.
      for (let i = 0, ii = values.length; i < ii; i++) {
        if ($('.' + values[i]).length) {
          if ($('.' + values[i]).hasClass('js-active')) {
            $('.' + values[i]).removeClass('js-active')
          } else {
            $('.' + values[i]).addClass('js-active')
          }
        }
      }
    }
  }

  /**
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  exampleEvent(e)
  {
    console.log(e)
    e[0].preventDefault()
  }

}

const RouteClass = new Route()

// Export
export default RouteClass
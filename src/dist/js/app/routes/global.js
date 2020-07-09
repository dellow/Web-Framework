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
    // Header scrolling.
    this.headerScrolling()
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
        'click [data-js-toggle]': this.toggleBodyClass.bind(this),
      }
    })
  }

  /**
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  toggleBodyClass(e)
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
        $('body').toggleClass(values[i])
      }
    }
  }

  /**
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  headerScrolling()
  {
    window.onscroll = (() => {
      // Set body.
      let $body = $('body')
      // Set buffer.
      let headerHeight = $('.layout-desktop-header').outerHeight()
      // Get document height.
      let documentHeight = $(document).outerHeight()
      // Get 1/3 of document height.
      let documentHeightThird = documentHeight / 3

      return (e) => {
        // Cache scroll top.
        let scrollTop = $(document).scrollTop()

        // Scroll past first pixel.
        if (scrollTop > 1) {
          $body.addClass('js-scrolled-past-1px')
        } else {
          $body.removeClass('js-scrolled-past-1px')
        }
        // Scroll past 1st third of the document.
        if (scrollTop > documentHeightThird) {
          $body.addClass('js-scrolled-past-third')
        } else {
          $body.removeClass('js-scrolled-past-third')
        }
        // Scroll past desktop header.
        if (scrollTop > headerHeight) {
          $body.addClass('js-scrolled-past-header')

          if (!$body.hasClass('js-header-fixed')) {
            $body.css({'paddingTop': headerHeight})
          }
        } else {
          $body.removeClass('js-scrolled-past-header')

          if (!$body.hasClass('js-header-fixed')) {
            $body.css({'paddingTop': ''})
          }
        }
      }
    })()
  }

}

const RouteClass = new Route()

// Export
export default RouteClass
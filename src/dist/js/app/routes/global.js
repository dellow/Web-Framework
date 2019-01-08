/**
 *
 * Route
 *
 * Copyright 2019, Author Name
 * Some information on the license.
 *
**/

import Menus from '../classes/global/menus'
import Email from '../classes/global/email'
import FormsNewsletter from '../classes/forms/newsletter'

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
    // Init Menus.
    Menus.init()
    // Init Email.
    Email.init()
    // Init newsletter form.
    FormsNewsletter.init()
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
    window.Events.extend({
      events: {
        'scroll null': 'scrollable',
        'click [data-js-event="mobileSearch"]': 'toggleSearchBox'
      },
      scrollable: (e) => {
        if (window.Breakpoint.current === 'mobile') {
          // Cache page header height.
          let height = Math.round($('.page-mobile-wrapper').height())
          // Cache scroll top.
          let scrollTop = $(document).scrollTop()

          if (scrollTop > height) {
            return $('body').addClass('js-scrolled-past-header').css({ 'padding-top': height })
          }

          return $('body').removeClass('js-scrolled-past-header').css({ 'padding-top': '' })
        }
      },
      toggleSearchBox: function (e) {
        return $('[data-js-target="mobileSearch"]').toggleClass('active')
      }
    })
  }

}

const RouteClass = new Route()

// Export
export default RouteClass

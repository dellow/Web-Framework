/**
 *
 * Route
 *
 * Copyright 2019, Author Name
 * Some information on the license.
 *
**/

import Events from '../classes/base/events'
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
    // Init root Vue instance and load components.
    this.loadVue()
    // Load global methods.
    this.loadMethods()
    // Load global components.
    this.loadComponents()
  }

  /**
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  loadVue() 
  {
    return new window.Vue({
      el: '[data-vue="root"]',
      components: {
      },
      mounted()
      {
        // Log it.
        window.Helpers.log('Vue root loaded')
      }
    })
  }

  /**
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  loadMethods() 
  {
  }

  /**
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  loadComponents() 
  {
    // Init Menus.
    Menus.init()
    // Init Email.
    // Email.init()
    // Init newsletter form.
    // FormsNewsletter.init()
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
        'click [data-js-event="exampleEvent"]': this.exampleEvent.bind(this)
      }
    })
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

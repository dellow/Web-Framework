/**
 *
 * Class
 *
 * Copyright 2019, Author Name
 * Some information on the license.
 *
**/

import Events from './events'

class Base extends Events 
{

  /**
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  constructor() 
  {
    super()
  }

  /**
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  init() 
  {
    // Check for an listeners method.
    if (typeof this.listeners === 'function') {
      this.listeners()
    }
  }

  /**
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  launch() 
  {
    // Log it.
    if (window.Helpers) {
      window.Helpers.log(this.constructor.name + ' GO!', 'positive')
    }
  }

}

// Export
export default Base

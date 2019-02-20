/**
 *
 * Class
 * 
 * Copyright 2019, Author Name
 * Some information on the license.
 *
**/

class Events 
{

  /**
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  constructor() 
  {
    this.events = {}
  }

  /**
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  extendEvents(args) 
  {
    // Extend.
    this.extension = $.extend({}, this, args)
    // Setup events.
    $.each(this.extension.events, (name, callback) => {
      this.registerEvent(name, callback)
    })

    return this.extension
  }

  /**
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  registerEvent(name, callback) 
  {
    // Guard :: Check for name and callback.
    if (!name || !callback) {
      return
    }
    
    // Cache event.
    var event = name.substr(0, name.indexOf(' '))
    // Cache selector.
    var selector = name.substr(name.indexOf(' ') + 1)
    // Check event type.
    if (event === 'load' || event === 'scroll' || event === 'resize') {
      return this.onWindow(event, callback)
    } else if (event === 'document') {
      return this.onSelector(event, callback, selector)
    } else if (event === 'keycode') {
      return this.onKeycode(event, callback, selector)
    } else if (event === 'ready') {
      return this.onReady(event, callback)
    } else {
      return this.onEventSelector(event, callback, selector)
    }
  }

  /**
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  onWindow(event, callback) 
  {
    // Add event.
    $(window).on(event, (e) => {
      // Add $el to event object
      e.$el = $(this)
      // Event type.
      if (typeof event === 'function') {
        e = event(e)
      }
      // Callback type.
      if (typeof callback === 'function') {
        callback([e])
      } else {
        this.extension[callback]([e])
      }
    })
  }

  /**
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  onSelector(event, callback, selector) 
  {
    // Add event.
    $(document).on(selector, (e) => {
      // Add $el to event object
      e.$el = $(this)
      // Event type.
      if (typeof event === 'function') {
        e = event(e)
      }
      // Callback type.
      if (typeof callback === 'function') {
        callback([e])
      } else {
        this.extension[callback]([e])
      }
    })
  }

  /**
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  onKeycode(event, callback, selector) 
  {
    // Add event.
    $(document).on('keyup', (e) => {
      if (e.keyCode === parseInt(selector)) {
        // Callback type.
        if (typeof callback === 'function') {
          callback([e])
        } else {
          this.extension[callback]([e])
        }
      }
    })
  }

  /**
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  onReady(event, callback) 
  {
    const _this = this

    // Add event.
    $(function () 
    {
      // Event type.
      if (typeof event === 'function') {
        e = event(e)
      }
      // Callback type.
      if (typeof callback === 'function') {
        callback()
      } else {
        this.extension[callback]()
      }
    })
  }

  /**
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  onEventSelector(event, callback, selector) 
  {
    // Add event.
    $(document).on(event, selector, (e) => {
      // Add $el to event object.
      e.$el = $(this)
      // Event type.
      if (typeof event === 'function') {
        e = event(e)
      }
      // Callback type.
      if (typeof callback === 'function') {
        callback([e])
      } else {
        this.extension[callback]([e])
      }
    })
  }

}

// Export
export default Events

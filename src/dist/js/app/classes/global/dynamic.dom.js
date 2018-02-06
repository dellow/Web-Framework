/**
 *
 * Class
 *
 * Copyright 2018, Author Name
 * Some information on the license.
 *
**/

class DynamicDOM {

  /**
   * constructor
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  constructor (settings) {
    // Settings for this class.
    let defaultSettings = {
      failSilently: false
    }
    // Merge settings.
    this._settings = Object.assign(defaultSettings, settings)
  }

  /**
   * init
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  init () {
    this.events()
  }

  /**
   * events
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  events () {
    // Extend the events system.
    window.Events.extend({
      events: {
        'change [data-js-event="dynamicDom"]': 'dynamicDom'
      },
      dynamicDom: (e) => {
        e[0].preventDefault()

        // Get value.
        let value = $(e[0].currentTarget).val()
        // Get DOM target.
        let target = $(e[0].currentTarget).data('dynamic-dom') || false

        return (target && $(target).length) ? this.updateTarget(value, $(target)) : this.reportNoTarget()
      }
    })
  }

  /**
   * updateTarget
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  updateTarget (value, $target) {
    return $target.html(value)
  }

  /**
   * reportNoTarget
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  reportNoTarget () {
    return (!this._settings.failSilently) ? window.Helpers.throw('No DOM target specified.') : null
  }

}

const DynamicDOMClass = new DynamicDOM()

// Export
export default DynamicDOMClass

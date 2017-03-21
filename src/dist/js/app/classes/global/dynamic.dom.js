/**
 *
 * Class
 *
 * Copyright 2017, Author Name
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
  constructor () {
    this._settings = {
      failSilently: false
    }
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
    var _this = this

    // Extend the events system.
    window.Events.extend({
      events: {
        'change .js--dynamic-dom': 'updateDOM'
      },
      updateDOM: function (e) {
        e[0].preventDefault()

        // Get value.
        var value = $(e[0].currentTarget).val()
        // Get DOM target.
        var target = $(e[0].currentTarget).data('dynamic-dom') || false

        return (target && $(target).length) ? _this.updateTarget(value, $(target)) : _this.reportNoTarget()
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

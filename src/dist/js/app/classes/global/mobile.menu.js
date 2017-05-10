/**
 *
 * Class
 *
 * Copyright 2017, Author Name
 * Some information on the license.
 *
**/

class MobileMenu {

  /**
   * constructor
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  constructor () {
    // Set flag.
    this.menuOpen = false
    // Settings for this module.
    this._settings = {
      menuSize: '80',
      moveContent: true
    }
    // DOM elements for this module.
    this._dom = {
      menu: $('[data-js-target="mobile-menu"]'),
      open: $('[data-js-event="menu-open"]'),
      content: $('[data-js-target="mobile-menu-content"]'),
      header: $('[data-js-target="mobile-menu-header"]')
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
        'click [data-js-event="menu-open"]': 'toggleMenu',
        'click [data-js-event="menu-close"]': 'hideMenu'
      },
      toggleMenu: function (e) {
        return _this.startMenu((!_this.menuOpen) ? 'show' : 'hide')
      },
      hideMenu: function (e) {
        return _this.startMenu('hide')
      }
    })
  }

  /**
   * startMenu
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  startMenu (action) {
    // Set the mobile menu header height to
    // match the page mobile header height.
    this.setHeaderHeight()

    return (action === 'show') ? this.showMenu() : this.hideMenu()
  }

  /**
   * showMenu
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  showMenu () {
    // Toggle the mobile menu visiblity.
    this.style(this._dom.menu, {'width': (this._settings.menuSize), 'opacity': '1'})
    // Add no-scroll class.
    $('body').addClass('u-noscroll')
    // Add active class to button.
    this._dom.open.addClass('active')
    // Toggle the content position.
    if (this._settings.moveContent) {
      this.style(this._dom.content, {'left': this._settings.menuSize})
    }
    // Reset flag.
    this.menuOpen = true
  }

  /**
   * hideMenu
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  hideMenu () {
    // Toggle the mobile menu visiblity.
    this.style(this._dom.menu, {'width': '0', 'opacity': '0'})
    // Remove no-scroll class.
    $('body').removeClass('u-noscroll')
    // Add active class to button.
    this._dom.open.removeClass('active')
    // Toggle the content position.
    if (this._settings.moveContent) {
      this.style(this._dom.content, {'left': ''})
    }
    // Reset flag.
    this.menuOpen = false
  }

  /**
   * setHeaderHeight
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  setHeaderHeight () {
    return $('.page-mobile-menu__header').height(this.calculateHeight(this._dom.header))
  }

  /**
   * calculateHeight
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  calculateHeight (el) {
    return el.outerHeight()
  }

  /**
   * style
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  style (el, css) {
    return el.css(css)
  }

}

const MobileMenuClass = new MobileMenu()

// Export
export default MobileMenuClass

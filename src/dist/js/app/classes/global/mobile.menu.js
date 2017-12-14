/**
 *
 * Module
 *
 * Copyright 2016, Author Name
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
    this.mainMenuOpen = false
    this.subMenuOpen = false

    this._settings = {
      menuSize: '100',
      moveContent: false
    }

    this._dom = {
      menu: $('[data-js-target="mobile-menu"]'),
      open: $('[data-js-event="menu-open"]'),
      header: $('[data-js-target="mobile-menu-header"]'),
      content: $('[data-js-target="mobile-menu-content"]'),
      bodyMenu: $('.page-mobile-menu__body__menuwrapper__main'),
      bodySubMenu: $('.page-mobile-menu__body__menuwrapper__sub')
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
    // Extend the events system.
    window.Events.extend({
      events: {
        'click [data-js-event="menu-open"]': 'toggleMenu',
        'click [data-js-event="menu-close"]': 'hideMainMenu',
        'click [data-js-target="mobile-menu"] .has_sub_menu': 'toggleSubMenu'
      },
      toggleMenu: (e) => {
        return (this.subMenuOpen) ? this.startMenuChild('hide') : this.startMenuParent((!this.mainMenuOpen) ? 'show' : 'hide')
      },
      hideMainMenu: (e) => {
        return (this.subMenuOpen) ? this.startMenuChild('hide') : this.startMenuParent('hide')
      },
      toggleSubMenu: (e) => {
        e[0].preventDefault()

        return this.startMenuChild('show', $(e[0].currentTarget))
      }
    })
  }

  /**
   * startMenuParent
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  startMenuParent (action) {
    // Set the mobile menu header height to
    // match the page mobile header height.
    this.setHeaderHeight()

    return (action === 'show') ? this.showMainMenu() : this.hideMainMenu()
  }

  /**
   * startMenuChild
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  startMenuChild (action, el) {
    return (action === 'show') ? this.showSubMenu(el) : this.hideSubMenu()
  }

  /**
   * showMainMenu
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  showMainMenu () {
    // Toggle the mobile menu visibility.
    this.style(this._dom.menu, {'left': -(100 - this._settings.menuSize) + '%', 'opacity': '1'})
    // Add no-scroll class.
    $('body').addClass('u-noscroll')
    // Add active class to button.
    this._dom.open.addClass('active')
    // Toggle the content position.
    if (this._settings.moveContent) {
      this.style(this._dom.content, {'left': this._settings.menuSize + '%'})
    }
    // Set flag.
    this.mainMenuOpen = true
  }

  /**
   * hideMainMenu
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  hideMainMenu () {
    // Toggle the mobile menu visibility.
    this.style(this._dom.menu, {'left': '-100%', 'opacity': '0'})
    // Remove no-scroll class.
    $('body').removeClass('u-noscroll')
    // Add active class to button.
    this._dom.open.removeClass('active')
    // Toggle the content position.
    if (this._settings.moveContent) {
      this.style(this._dom.content, {'left': ''})
    }
    // Reset flag.
    this.mainMenuOpen = false
  }

  /**
   * showSubMenu
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  showSubMenu (el) {
    // Cache sub menu.
    let subMenu = $('.sub-menu', el)
    // Check sub menu exists.
    if (subMenu.length) {
      // Add active class to button.
      this._dom.open.removeClass('active').addClass('half')
      // Inject sub menu into the DOM.
      this.injectSubMenu(subMenu)
      // Toggle the main menu visibility.
      this.style(this._dom.bodyMenu, {'left': '100%'})
      // Toggle the sub menu visibility.
      this.style(this._dom.bodySubMenu, {'left': '0'})
      // Set flag.
      this.subMenuOpen = true
    }
  }

  /**
   * hideSubMenu
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  hideSubMenu () {
    // Add active class to button.
    this._dom.open.addClass('active').removeClass('half')
    // Clear sub menu holder.
    this.clearSubMenuHolder()
    // Toggle the main menu visibility.
    this.style(this._dom.bodyMenu, {'left': '0'})
    // Toggle the sub menu visibility.
    this.style(this._dom.bodySubMenu, {'left': '-100%'})
    // Reset flag.
    this.subMenuOpen = false
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
    return $('.page-mobile-menu').css({'top': this.calculateHeight(this._dom.header)})
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
    return el.outerHeight() - 1
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

  /**
   * injectSubMenu
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  injectSubMenu (el) {
    // Clone menu.
    let menuClone = el.clone()
    // Append sub menu.
    this._dom.bodySubMenu.empty().append(menuClone)
  }

  /**
   * clearSubMenuHolder
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  clearSubMenuHolder () {
    // Append sub menu.
    this._dom.bodySubMenu.empty()
  }

}

const MobileMenuClass = new MobileMenu()

// Export
export default MobileMenuClass

/**
 *
 * Module
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

class MenusMobile {

  /**
   * constructor
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  constructor () {
    // Settings for the class.
    this._settings = {
    }
    // Dom elements for the class.
    this._dom = {
      menu: $('[data-menu="mobile"]'),
      wrapper: $('.side')
    }
    // State for the class.
    this.state = {
      menuCreated: false,
      primaryMenu: JSON.parse(JSON.stringify(window.config.menus.primary))
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
    // Start events.
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
        'ready null': 'applyMenu',
        'resize null': 'applyMenu',
        'document mouseup': 'outsideClick',
        'keycode 27': 'closeMenu',
        'click [data-js-event="sideMenu"]': 'openMenu',
        'click [data-menu="mobile"] a': 'linkClicked',
        'click [data-js-event="toggleMenuTab"]': 'toggleTabs'
      },
      applyMenu: () => {
        // Guard :: Check for menu.
        if (this.state.menuCreated) return

        return this._dom.wrapper.append(this.buildPanelHTML())
      },
      outsideClick: (e) => {
        if (!this._dom.wrapper.is(e[0].target) && this._dom.wrapper.has(e[0].target).length === 0) {
          return this.close()
        }
      },
      openMenu: (e) => {
        return this.open()
      },
      closeMenu: (e) => {
        return this.close()
      },
      linkClicked: (e) => {
        // Does this link have a sub menu.
        if ($(e[0].currentTarget).next('.sub-menu').length) {
          e[0].preventDefault()

          return this.toggleSub($(e[0].currentTarget).next('.sub-menu'))
        }
      },
      toggleTabs: (e) => {
        e[0].preventDefault()

        return $(e[0].currentTarget).parent().parent().toggleClass('active')
      }
    })
  }

  /**
   * buildPanelHTML
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  buildPanelHTML () {
    // Get menu HTML.
    let menuHTML = this.buildMenuHTML(this.state.primaryMenu)
    // Get social menu.
    let socialMenuHTML = ($('[data-menu="social"]').length) ? $('[data-menu="social"]')[0].outerHTML : ''

    return `
      <aside class="comp-side-panel n" data-menu="mobile">
        <div class="comp-side-panel__scrollable">
          <div class="comp-side-panel__menu n">
            ` + menuHTML + `
          </div>
          <div class="comp-side-panel__spacer a"></div>
          <div class="comp-side-panel__social n">
            ` + socialMenuHTML + `
          </div>
          <div class="comp-side-panel__user">
            <div class="comp-side-panel__user__header a">
              ${(window.config.user) ? '<span>Hi ' + window.config.user.first_name + '</span>' : '<span>Welcome</span>' }
              ${(window.config.user) ? '<span><a href="/logout">Logout</a></span>' : '<span><a href="/register">Register</a></span>' }
            </div>
            <div class="comp-side-panel__user__body n">
              <ul role="menu">
                <li role="menuitem">
                  <a href="/account">
                    <i class="icon material-icons">person</i>
                    <span>My Account</span>
                  </a>
                </li>
                <li role="menuitem">
                  <a href="/account/orders">
                    <i class="icon material-icons">shopping_cart</i>
                    <span>My Orders</span>
                  </a>
                </li>
                <li role="menuitem">
                  <a href="/account/wishlist">
                    <i class="icon material-icons">favorite_border</i>
                    <span>My Favourites</span>
                  </a>
                </li>
                <li role="menuitem">
                  <a href="/returns">
                    <i class="icon material-icons">undo</i>
                    <span>Returns Information</span>
                  </a>
                </li>
              </ul>
            </div>
            <div class="comp-side-panel__user__tabs a">
              <div class="comp-side-panel__user__tabs__single">
                <div class="comp-side-panel__user__tabs__single__header">
                  <button data-js-event="toggleMenuTab">
                    <span>Help &amp; Information</span>
                    <span><i class="icon material-icons"></i></span>
                  </button>
                </div>
                <div class="comp-side-panel__user__tabs__single__body">
                  <ul role="menu">
                    <li role="menuitem"><a href="/returns">Returns</a></li>
                    <li role="menuitem"><a href="/delivery-information">Delivery Information</a></li>
                    <li role="menuitem"><a href="/contact-us">Contact</a></li>
                  </ul>
                </div>
              </div>
              <div class="comp-side-panel__user__tabs__single">
                <div class="comp-side-panel__user__tabs__single__header">
                  <button data-js-event="toggleMenuTab">
                    <span>About Us</span>
                    <span><i class="icon material-icons"></i></span>
                  </button>
                </div>
                <div class="comp-side-panel__user__tabs__single__body">
                  <ul role="menu">
                    <li role="menuitem"><a href="/blog">Our Blog</a></li>
                    <li role="menuitem"><a href="/about-us">Our Story</a></li>
                    <li role="menuitem"><a href="/link">Link #1</a></li>
                    <li role="menuitem"><a href="/link">Link #2</a></li>
                  </ul>
                </div>
              </div>
              <div class="comp-side-panel__user__tabs__single">
                <div class="comp-side-panel__user__tabs__single__header">
                  <button data-js-event="toggleMenuTab">
                    <span>More From Us</span>
                    <span><i class="icon material-icons"></i></span>
                  </button>
                </div>
                <div class="comp-side-panel__user__tabs__single__body">
                  <ul role="menu">
                    <li role="menuitem"><a href="/link">Link #1</a></li>
                    <li role="menuitem"><a href="/link">Link #2</a></li>
                    <li role="menuitem"><a href="/link">Link #3</a></li>
                    <li role="menuitem"><a href="/link">Link #4</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="comp-side-panel__footer d">
            <div class="comp-side-panel__footer__left">
              &copy; ` + (new Date()).getFullYear() + ` ` + window.config.name + `
            </div>
            <div class="comp-side-panel__footer__right">
              <a href="/privacy-policy">Privacy Policy</a>
              &nbsp; | &nbsp;
              <a href="/terms-conditions">T&Cs</a>
            </div>
          </div>
        </div>
      </aisde>
    `
  }

  /**
   * buildMenuHTML
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  buildMenuHTML (menus) {
    // Update state.
    this.state.menuCreated = true
    // Loop through menus.
    let thisMenu = menus.map((item, i) => {
      // Get CSS classes.
      let cssClasses = [item.className, (!window.Helpers.isEmpty(item.children)) ? 'has_sub_menu' : ''].filter(n => n).join(' ')

      if (item.exclude.indexOf('mobile') === -1) {
        return `
          <li class="${cssClasses}" role="menuitem">
            <a href="${item.href}"><span>${item.title}</span></a>
            ${this.buildChildMenuHTML(item.children)}
          </li>
        `
      }
    })

    return `
      <div class="comp-side-panel__menu__header">
        Menu
      </div>
      <div class="comp-side-panel__menu__body">
        <ul class="menu-mobile" role="menu">
        ` + thisMenu.join('') + `
        </ul>
      </div>
    `
  }

  /**
   * buildChildMenuHTML
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  buildChildMenuHTML (menus) {
    let HTML = ''

    if (!window.Helpers.isEmpty(menus)) {

      if (!(menus instanceof Array)) {
        var menuitems = []
        // Override menus.
        Object.keys(menus).map((key, i) => {
          menus[key].map((item, i) => {
            menuitems.push(item)
          })
        })
        // Override menus.
        menus = menuitems
      }

      let thisMenu = menus.map((item, i) => {
        if (item.exclude.indexOf('mobile') === -1) {
          // Get CSS classes.
          let cssClasses = [item.className, (!window.Helpers.isEmpty(item.children)) ? 'has_sub_menu' : ''].filter(n => n).join(' ')

          return `
            <li class="${cssClasses}" role="menuitem">
              <a href="${item.href}"><span>${item.title}</span></a>
              ${this.buildChildMenuHTML(item.children)}
            </li>
          `
        }
      })

      HTML = `<ul class="sub-menu" role="menu">` + thisMenu.join('') + `</ul>`
    }

    return HTML
  }

  /**
   * open
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  open () {
    return $('body').addClass('js-panel-open u-noscroll')
  }

  /**
   * close
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  close () {
    return $('body').removeClass('js-panel-open u-noscroll')
  }

  /**
   * toggleSub
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  toggleSub ($el) {
    return $el.toggle()
  }

}

const MenusMobileClass = new MenusMobile()

// Export
export default MenusMobileClass

/**
 *
 * Module
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

class MenusDesktop {

  /**
   * constructor
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  constructor (settings) {
    // Simple counter.
    this.counter = 0
    // Settings for the class.
    let defaultSettings = {
      bleedThreshold: 25
    }
    // Merge settings.
    this._settings = Object.assign(defaultSettings, settings)
    // Dom elements for the class.
    this._dom = {
      menu: $('[data-menu="desktop"]')
    }
    // State for the class.
    this.state = {
      primaryMenu: JSON.parse(JSON.stringify(window.config.menus.primary)),
      moreChildren: [],
      moreExists: false
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
    // Guard :: Check element exists.
    if (!$('[data-menu="desktop"]').length) return

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
        'resize null': 'applyMenu'
      },
      applyMenu: () => {
        return this._dom.menu.empty().append(this.getMenuHTML())
      }
    })
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
    let HTML = menus.map((item, i) => {
      // Get child menu.
      let childMenu = this.buildChildMenuHTML(item.type, item.children)
      // Get CSS classes.
      let cssClasses = [item.className, (!window.Helpers.isEmpty(item.children)) ? 'has_sub_menu' : '', (childMenu.type === 'mega' || childMenu.type === 'mega-titles') ? 'has_sub_menu--mega' : ''].filter(n => n).join(' ')

      if (item.exclude.indexOf('desktop') === -1) {
        return `
          <li class="${cssClasses}" role="menuitem">
            <a href="${item.href}"><span>${item.title}</span></a>
            ${childMenu.HTML}
          </li>
        `
      }
    })

    return HTML.join('')
  }

  /**
   * buildChildMenuHTML
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  buildChildMenuHTML (type, menus) {
    let HTML = ''

    if (!type || type === 'auto') {
      if (menus instanceof Array && menus.length < 6) {
        type = 'sub'
      } else if (menus instanceof Array && menus.length >= 6) {
        type = 'mega'
      } else if (typeof menus === 'object') {
        type = 'mega-titles'
      }
    }

    if (type === 'sub' && menus.length) {
      let thisMenu = menus.map((item, i) => {
        if (item.exclude.indexOf('desktop') === -1) {
          // Get child menu.
          let childMenu = this.buildChildMenuHTML(item.type, item.children)
          // Get CSS classes.
          let cssClasses = [item.className, (!window.Helpers.isEmpty(item.children)) ? 'has_sub_menu' : ''].filter(n => n).join(' ')

          return `
            <li class="${cssClasses}" role="menuitem">
              <a href="${item.href}"><span>${item.title}</span></a>
              ${childMenu.HTML}
            </li>
          `
        }
      })

      HTML = `<ul class="sub-menu" role="menu">` + thisMenu.join('') + `</ul>`
    } else if (type === 'mega' && menus.length) {
      let thisMenu = menus.map((item, i) => {
        if (item.exclude.indexOf('desktop') === -1) {
          return `
            <li role="menuitem">
              <a href="${item.href}"><span>${item.title}</span></a>
            </li>
          `
        }
      })

      HTML = `
        <div class="mega-menu">
          <ul role="menu">
            ` + thisMenu.join('') + `
          </ul>
        </div>
      `
    } else if (type === 'mega-titles' && Object.keys(menus).length) {
      let thisMenu = Object.keys(menus).map((key, i) => {
        let subMenu = menus[key].map((item, i) => {
          if (item.exclude.indexOf('desktop') === -1) {
            return `
              <li role="menuitem">
                <a href="${item.href}"><span>${item.title}</span></a>
              </li>
            `
          }
        })

        return `
          <div class="mega-menu__container__col">
            <div class="mega-menu__container__col__title">${key}</div>
            <div class="mega-menu__container__col__single">
              <ul role="menu">` + subMenu.join('') + `</ul>
            </div>
          </div>
        `
      })

      HTML = `
        <div class="mega-menu">
          <div class="mega-menu__container">
            ` + thisMenu.join('') + `
          </div>
        </div>
      `
    }

    return {
      type: (HTML !== '') ? type : '',
      HTML: HTML
    }
  }

  /**
   * getMenuHTML
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  getMenuHTML () {
    // Number of menu items.
    let menuItemsCount = this.state.primaryMenu.length
    // Set default HTML view.
    let htmlView = this.buildMenuHTML(this.state.primaryMenu)
    // Build shadow menu.
    let shadowMenu = $('<ul style="position:absolute;top:-100%;display:block;max-height:none;height:auto;visibility:hidden;">' + htmlView + '</ul>').addClass('js-shadow-menu ' + this._dom.menu.attr('class'))
    // Add shadow menu to the DOM.
    this._dom.menu.parent().append(shadowMenu)
    // Check if this menu exceeds boundaries.
    if (this._hasExceededBoundary(shadowMenu)) {
      // Don't recur more times than the amount of menu items.
      if (this.counter < menuItemsCount) {
        // Get penultimate item in array.
        let penultimateMenuIndex = this.state.primaryMenu.length - 2
        // Add to more children.
        this.state.moreChildren.push(this.state.primaryMenu[penultimateMenuIndex])
        // Add 'more' item to menus.
        if (!this.state.moreExists) {
          this.state.primaryMenu.push(this._moreItemMenu())
        }
        // Remove item from array.
        this.state.primaryMenu.splice(penultimateMenuIndex, 1)
        // Increase counter.
        this.counter++

        return this.getMenuHTML()
      }
    }
    // else if (this._hasExceededBoundary(shadowMenu) > 20) {
    //   // // Get first item from more menu.
    //   // let firstItemFromMore = this.state.moreChildren[1]
    //   // // Add to main menus.
    //   // this.state.primaryMenu.push(firstItemFromMore)
    //   // // Remove item from array.
    //   // this.state.moreChildren.splice(1, 1)
    //   //
    //   // return this.getMenuHTML()
    // }
    // Remove from DOM.
    $('.js-shadow-menu').remove()

    return htmlView
  }

  /**
   * _moreItemMenu
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  _moreItemMenu () {
    // Update state.
    this.state.moreExists = true

    return {
      title: 'More<i class="icon material-icons">keyboard_arrow_down</i>',
      href: '#',
      className: 'nav-more',
      children: this.state.moreChildren,
      type: 'sub',
      exclude: []
    }
  }

  /**
   * _hasExceededBoundary
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  _hasExceededBoundary ($menu) {
    // Get total width of menu contents.
    let totalWidth = this._calculateMenuTotalWidth($menu) + this._settings.bleedThreshold // Bleed threshold, just to make sure.
    // Get menu boundary.
    let menuBoundary = this._calculateMenuBoundary()
    // Calculate difference.
    let difference = Math.abs(Math.round(((totalWidth - menuBoundary) / totalWidth) * 100))

    // return difference
    return (totalWidth > menuBoundary)
  }

  /**
   * _calculateMenuTotalWidth
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  _calculateMenuTotalWidth ($menu) {
    // Set default width.
    let width = 0;
    // Calculate width of children.
    $menu.children().each((index, el) => {
      width += $(el).outerWidth()
    })

    return Math.round(width)
  }

  /**
   * _calculateMenuBoundary
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  _calculateMenuBoundary () {
    return this._dom.menu.width()
  }

}

const MenusDesktopClass = new MenusDesktop()

// Export
export default MenusDesktopClass

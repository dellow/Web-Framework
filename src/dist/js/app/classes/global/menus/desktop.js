/**
 *
 * Module
 *
 * Copyright 2019, Author Name
 * Some information on the license.
 *
**/

class MenusDesktop 
{

  /**
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  constructor() 
  {
    // Simple counter.
    this.counter = 0
    // Settings for the class.
    this._settings = {
      bleedThreshold: 25
    }
    // Dom elements for the class.
    this._dom = {
      menu: $('[data-menu="desktop"]')
    }
    // State for the class.
    this.state = {
      primaryMenu: (window.config.menus.primary) ? JSON.parse(JSON.stringify(window.config.menus.primary)) : [],
      moreChildren: [],
      moreExists: false
    }
  }

  /**
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  init() 
  {
    // Guard :: Check element exists.
    if (!$('[data-menu="desktop"]').length) return

    return this._dom.menu.empty().append(this.getMenuHTML())
  }

  /**
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  buildMenuHTML(menus) 
  {
    let HTML = menus.map((item, i) => {
      // Get child menu.
      let childMenu = this.buildChildMenuHTML(item.type, item.children)
      // Get CSS classes.
      let cssClasses = [item.className, (!window.Helpers.isEmpty(item.children)) ? 'has_sub_menu' : '', (childMenu.type === 'mega' || childMenu.type === 'mega-titles') ? 'has_sub_menu--mega' : ''].filter(n => n).join(' ')

      if (item.exclude.indexOf('desktop') === -1) {
        return `
          <li class="${cssClasses}" role="menuitem">
            <a href="${item.href}" target="${(item.target) ? item.target : '_self'}"><span>${item.title}</span></a>
            ${childMenu.HTML}
          </li>
        `
      }
    })

    return HTML.join('')
  }

  /**
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  buildChildMenuHTML(type, menus) 
  {
    let HTML = ''

    if (!window.Helpers.isEmpty(menus) && (!type || type === 'auto')) {
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
              <a href="${item.href}" target="${(item.target) ? item.target : '_self'}"><span>${item.title}</span></a>
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
              <a href="${item.href}" target="${(item.target) ? item.target : '_self'}"><span>${item.title}</span></a>
            </li>
          `
        }
      })

      let menuChunks = []
      while (thisMenu.length > 0) {
        menuChunks.push(thisMenu.splice(0, 3))
      }

      HTML = `
        <div class="mega-menu">
          <div class="mega-menu__container">
            ${menuChunks.map((menu) => {
              return `
                <div class="mega-menu__container__col">
                  <div class="mega-menu__container__col__single">
                    <ul role="menu">
                      ` + menu.join('') + `
                    </ul>
                  </div>
                </div>
              `
            }).join('')}
          </div>
        </div>
      `
    } else if (type === 'mega-titles' && Object.keys(menus).length) {
      let thisMenu = Object.keys(menus).map((key, i) => {
        let subMenu = menus[key].map((item, i) => {
          if (item.exclude.indexOf('desktop') === -1) {
            return `
              <li role="menuitem">
                <a href="${item.href}" target="${(item.target) ? item.target : '_self'}"><span>${item.title}</span></a>
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
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  getMenuHTML() 
  {
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
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  _moreItemMenu() 
  {
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
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  _hasExceededBoundary($menu) 
  {
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
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  _calculateMenuTotalWidth($menu) 
  {
    // Set default width.
    let width = 0;
    // Calculate width of children.
    $menu.children().each((index, el) => {
      width += $(el).outerWidth()
    })

    return Math.round(width)
  }

  /**
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  _calculateMenuBoundary() 
  {
    return this._dom.menu.width()
  }

}

const MenusDesktopClass = new MenusDesktop()

// Export
export default MenusDesktopClass

/**
 *
 * Module
 *
 * Copyright 2019, Author Name
 * Some information on the license.
 *
**/

import MenusDesktop from './desktop'
import MenusMobile from './mobile'

class Menus {

  /**
   * constructor
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  constructor () {
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
    // Guard :: Make sure there is a menus property.
    if (!window.config.hasOwnProperty('menus')) return

    MenusDesktop.init()
    MenusMobile.init()
  }

}

const MenusClass = new Menus()

// Export
export default MenusClass

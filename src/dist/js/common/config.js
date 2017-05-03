/**
 *
 * Config
 *
 * Copyright 2017, Author Name
 * Some information on the license.
 *
**/

/*
|--------------------------------------------------------------------------
| config
|--------------------------------------------------------------------------
|
| Set config var.
|
*/
window.config = window.config || {}

/*
|--------------------------------------------------------------------------
| ga_active
|--------------------------------------------------------------------------
|
| Checks if Google Analytics is active on the page.
|
*/
window.config.ga_active = (window.ga && window.ga.create)

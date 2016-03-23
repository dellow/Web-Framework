/**
 *
 * Application or Website name
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

window.config.helper_log = (Helpers.isEmpty(window.gulp_env) || window.gulp_env == 'development') ? true : false;
window.config.ga_active  = (Helpers.isEmpty(window.ga)) ? false : true;
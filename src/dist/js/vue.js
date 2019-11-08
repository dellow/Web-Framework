/**
 *
 * Vue Components
 *
 * Copyright 2019, Author Name
 * Some information on the license.
 *
**/

const files = require.context('./app/vue', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Create a root Vue component.
new window.Vue({
  el: '[data-vue="root"]',
  mounted()
  {
    // Log it.
    window.Helpers.log('Vue root loaded')
  }
})
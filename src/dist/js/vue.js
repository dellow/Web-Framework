/**
 *
 * Vue Components
 *
 * Copyright 2019, Author Name
 * Some information on the license.
 *
**/

const CookieBar = Vue.component('cookie-bar', require('./app/vue/cookie-bar.vue').default)

// Create a root Vue component.
new window.Vue({
  el: '[data-vue="root"]',
  components: {
    CookieBar,
  },
  mounted()
  {
    // Log it.
    window.Helpers.log('Vue root loaded')
  }
})
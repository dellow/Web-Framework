/**
 *
 * Vue Components
 *
 * Copyright 2019, Author Name
 * Some information on the license.
 *
**/

// Create a root Vue component.
new window.Vue({
  el: '[data-vue="root"]',
  components: {
  },
  mounted()
  {
    // Log it.
    window.Helpers.log('Vue root loaded')
  }
})
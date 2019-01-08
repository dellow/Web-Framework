/**
 *
 * Class
 *
 * Copyright 2019, Author Name
 * Some information on the license.
 *
**/

class FormsNewsletter 
{

  /**
   * Constructor for this class.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  constructor() 
  {
  }

  /**
   * Registers methods.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  init() 
  {
    // Guard :: Check element exists.
    if (!$('[data-vue="newsletterForm"]').length) {
      return
    }

    this.events()
    this.vmNewsletter = this.vmNewsletterComponent()
  }

  /**
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  events() 
  {
    // Extend the events system.
    window.Events.extend({
      events: {
        'document mouseup': 'documentClick'
      },
      documentClick: (e) => {
      }
    })
  }

  /**
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
  **/
  vmNewsletterComponent() 
  {
    const _this = this

    return new window.Vue({
      el: '[data-vue="newsletterForm"]',
      data: {
        hasErrors: false,
        emailaddress: '',
        feedback: ''
      },
      methods: {
        submitForm() 
        {
          // Make ajax request.
          window.Axios.get('/core/wp-admin/admin-ajax.php?action=sp_subscribe_user', {params: {email: this.emailaddress}}).then((res) => {
            // Check response is valid.
            if (res.status === 200 && res.data.status === 'success') {
              // Update state.
              this.hasErrors = false
              this.feedback = res.data.message
            } else if (res.data.status === 'error') {
              // Update state.
              this.hasErrors = true
              this.emailaddress = ''
              this.feedback = res.data.message
            }
          }).catch((err) => {
            // Throw it.
            window.Helpers.throw(err)
          })
        }
      }
    })
  }

}

const FormsNewsletterClass = new FormsNewsletter()

// Export
export default FormsNewsletterClass
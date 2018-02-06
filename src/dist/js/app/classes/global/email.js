/**
 *
 * Class
 *
 * Copyright 2018, Author Name
 * Some information on the license.
 *
**/

// Default list of domains to check.
const domains = [
  'aol.com',
  'bellsouth.net',
  'btinternet.com',
  'btopenworld.com',
  'blueyonder.co.uk',
  'comcast.net',
  'cox.net',
  'gmail.com',
  'google.com',
  'googlemail.com',
  'hotmail.co.uk',
  'hotmail.com',
  'hotmail.fr',
  'hotmail.it',
  'icloud.com',
  'live.com',
  'mac.com',
  'mail.com',
  'me.com',
  'msn.com',
  'o2.co.uk',
  'orange.co.uk',
  'orangehome.co.uk',
  'outlook.com',
  'outlook.co.uk',
  'sbcglobal.net',
  'verizon.net',
  'virginmedia.com',
  'yahoo.com',
  'yahoo.co.uk',
  'yahoo.com.tw',
  'yahoo.es',
  'yahoo.fr',
  'zoho.com'
]

class Email {

  /**
   * init
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  init (settings) {
    // Settings for this class.
    let defaultSettings = {
      typingTimer: null,
      timerThreshold: 500
    }
    // Merge settings.
    this._settings = Object.assign(defaultSettings, settings)

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
        'keyup input[type="email"]': 'emailChecker',
        'click [data-js-event="selectEmail"]': 'populateEmailAddress'
      },
      emailChecker: (e) => {
        e[0].preventDefault()

        // Clear old timer.
        clearTimeout(this._settings.typingTimer)
        // Get current email element.
        this.$el = $(e[0].currentTarget)
        // Get current email value.
        this.emailValue = this.$el.val()
        // Check email string contains an @.
        if (this.emailValue.indexOf('@') !== -1) {
          // Start timer.
          this._settings.typingTimer = setTimeout(() => {
            // Check for a match.
            let emailMatch = this.getMatch(this.emailValue)

            if (emailMatch) {
              this.emailMatch = emailMatch.complete

              return this.renderMatch()
            }
          }, this._settings.timerThreshold)
        } else {
          // Remove suggester.
          this._clearSuggester()
        }
      },
      populateEmailAddress: (e) => {
        e[0].preventDefault()

        // Update email address.
        this.$el.val(this.emailMatch)
        // Remove suggester.
        this._clearSuggester()
      }
    })
  }

  /**
   * renderMatch
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  renderMatch () {
    // Set button.
    let $btn = '<button data-js-event="selectEmail">' + this.emailMatch + '</button>'
    // Check for a suggestion.
    if ($('.obj-email-suggestion').length) {
      $('.obj-email-suggestion').html('<span>Did you mean ' + $btn + '?</span>')
    } else {
      this.$el.parent().append('<div class="obj-email-suggestion"><span>Did you mean ' + $btn + '?</span></div>')
    }
  }

  /**
   * getMatch
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  getMatch (email) {
    var limit = 99
    var email = email.split('@')

    for (var i = 0, ii = domains.length; i < ii; i++) {
      var distance = this.levenshteinDistance(domains[i], email[1])
      if (distance < limit) {
        limit = distance
        var domain = domains[i]
      }
    }
    if (limit <= 2 && domain !== null && domain !== email[1]) {
      return{
        address: email[0],
        domain: domain,
        complete: email[0] + '@' + domain
      }
    } else {
      return false
    }
  }

  /**
   * levenshteinDistance
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  levenshteinDistance (a, b) {
    var c = 0
    var d = 0
    var e = 0
    var f = 0
    var g = 5

    if (a == null || a.length === 0) {
      if (b == null || b.length === 0) {
        return 0
      } else {
        return b.length
      }
    }
    if (b == null || b.length === 0) {
      return a.length
    }

    while (c + d < a.length && c + e < b.length) {
      if (a[c + d] == b[c + e]) {
        f++
      } else {
        d = 0
        e = 0
        for (var h = 0; h < g; h++) {
          if (c + h < a.length && a[c + h] == b[c]) {
            d = h
            break
          }
          if (c + h < b.length && a[c] == b[c + h]) {
            e = h
            break
          }
        }
      }
      c++
    }
    return (a.length + b.length) / 2 - f
  }

  /**
   * _clearSuggester
   * NULLED.
   *
   * @since 1.0.0
   * @version 1.0.0
   * @access public
  **/
  _clearSuggester () {
    // Remove suggester.
    $('.obj-email-suggestion').remove()
  }

}

const EmailClass = new Email()

// Export
export default EmailClass

/**
 *
 * Class
 *
 * Copyright 2017, SureCommerce
 * Some information on the license.
 *
**/

import React from 'react'
import ReactDOM from 'react-dom'
import { Component } from 'react'

class FormsNewsletter extends Component {

  /**
   * constructor
   * NULLED.
   *
   * @type Built In
   * @access Public
   * @since 1.0.0
   * @version 1.0.0
  **/
  constructor (props) {
    super(props)

    this.state = {
      emailaddress: '',
      error: null,
      success: false
    }
  }

  /**
   * componentWillMount
   * NULLED.
   *
   * @type Built In
   * @access Public
   * @since 1.0.0
   * @version 1.0.0
  **/
  componentWillMount () {
    // Init methods.
    this.handleFieldUpdate = this.handleFieldUpdate.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  /**
   * componentDidMount
   * NULLED.
   *
   * @type Built In
   * @access Public
   * @since 1.0.0
   * @version 1.0.0
  **/
  componentDidMount () {
  }

  /**
   * render
   * NULLED.
   *
   * @type Built In
   * @access Public
   * @since 1.0.0
   * @version 1.0.0
  **/
  render () {
    if (this.state.success) {
      return (
        <div className="text--color-green">{this.state.success}</div>
      )
    }

    // Set placeholder.
    let placeholder = (this.state.error) ? this.state.error : this.props.placeholder
    // Set classes.
    let validationClass = {
      field: (this.state.error) ? 'validation-field-has-errors validation-field-error' : ''
    }

    return (
      <form onSubmit={this.handleFormSubmit} noValidate>
        <div className="obj-form-field">
          <div className="obj-form-field__container">
            <input type="email" name="emailaddress" id="newsletter__emailaddress" className={validationClass.field} value={this.state.emailaddress} placeholder={placeholder} onChange={this.handleFieldUpdate} />
            <button type="submit" className="btn btn--large btn--common">Sign Up</button>
          </div>
        </div>
      </form>
    )
  }

  /**
   * handleFieldUpdate
   * NULLED.
   *
   * @type Custom
   * @access Public
   * @since 1.0.0
   * @version 1.0.0
  **/
  handleFieldUpdate (e) {
    // Update state.
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  /**
   * handleFormSubmit
   * NULLED.
   *
   * @type Custom
   * @access Public
   * @since 1.0.0
   * @version 1.0.0
  **/
  handleFormSubmit (e) {
    e.preventDefault()

    // Make ajax request.
    window.Axios.get('/SUBSCRIBER_ENDPOINT_HERE', {params: {email: this.state.emailaddress}}).then((res) => {
      // Check response is valid.
      if (res.status === 200 && res.data.status === 'success') {
        // Update state.
        this.setState({
          success: res.data.message
        })
      } else if (res.data.status === 'error') {
        // Update state.
        this.setState({
          emailaddress: '',
          error: res.data.message
        })
      }
    }).catch((err) => {
      // Throw it.
      window.Helpers.throw(err)
    })
  }

}

// Export.
export default FormsNewsletter
/* eslint-enable */

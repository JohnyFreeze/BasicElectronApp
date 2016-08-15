'use strict'

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Modal from 'react-modal'
import { Link } from 'react-router'

class App extends Component {
  /**
   * Requires component properties
   * @param {Object} props
   */
  constructor (props) {
    super(props)

    // Init modal root element
    Modal.setAppElement(document.getElementById('root'))
  }

  /**
   * Render component'
   * @return {ReactElement}
   */
  render () {
    return (
        <div>
          <nav><Link to="/series">series</Link></nav>
          <div className='inherit-size'>
            {this.props.children}
          </div>
        </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
   series: state.series
  }
}

export default connect(mapStateToProps)(App)

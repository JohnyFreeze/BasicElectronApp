'use strict'

import React, {Component,PropTypes} from 'react'
import { connect } from 'react-redux'
import SeriesForm from './seriesForm'
import SeriesList from './seriesList'
import { addSerie } from '../../actions'

class SeriesContainer extends Component {

  /**
   * Render component
   *
   * @return {ReactElement}
   */
  render () {
    return (
      <div className='container no-min-width'>
        <SeriesList series={this.props.series}/>
        <SeriesForm handlerAddingSerie={this.props.onAddSerie}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    series: state.series
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onAddSerie: (serie) => {
      dispatch(addSerie(serie))
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SeriesContainer)

'use strict'

import React from 'react'
import {Route, IndexRedirect} from 'react-router'
import App from './modules/app'
import SeriesContainer from './modules/series/seriesContainer'
import SeriesEdit from './modules/series/seriesEdit'

export default (
  <Route path='/' component={App}>
    <IndexRedirect to='/series'/>
    <Route path='series' component={SeriesContainer}/>
    <Route path='series/:id' component={SeriesEdit}/>
  </Route>
)

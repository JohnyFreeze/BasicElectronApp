'use strict'

import {createStore, applyMiddleware, compose} from 'redux'
import {persistState} from 'redux-devtools'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import {hashHistory} from 'react-router'
import {routerMiddleware} from 'react-router-redux'
import rootReducer from '../reducers'

/**
 * Store configuration for hot development
 * @param {Object} initialState
 * @return {Store}
 */
export default function configureStore (initialState) {
  const store = createStore(
    // Connect reducers
    rootReducer,
    // Connect initial states
    initialState,

    // Composes functions from right to left.
    compose(
      // Combine all middleware together
      applyMiddleware(
        thunk,
        routerMiddleware(hashHistory),
        createLogger({
          level: 'info',
          collapsed: true
        })
      ),
      persistState(
        window.location.href.match(
          /[?&]debug_session=([^&]+)\b/
        )
      )
    ))

  // Hot loading for reducers
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    )
  }
  return store
}

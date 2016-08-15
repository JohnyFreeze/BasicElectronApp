import { combineReducers } from 'redux'
import series from './series'
import { routerReducer } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
    series,
    routing: routerReducer,
    form: formReducer
})
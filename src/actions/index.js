/**
 * Created by janmraz on 05/08/16.
 */
import { ADD_SERIE, EDIT_SERIE,GET_SERIES } from './actionTypes'


export function addSerie(serie) {
    return { type: ADD_SERIE, serie }
}
export function editSerie(serie) {
    return { type: EDIT_SERIE, serie }
}
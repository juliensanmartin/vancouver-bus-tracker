import {
  SET_EVO_VISIBILITY,
  SET_CAR2GO_VISIBILITY,
  SET_BUS_VISIBILITY,
  SET_MOBI_VISIBILITY,
  SET_MODO_VISIBILITY,
  SET_MODO_HOURS_AVAILABLE,
  GET_VISIBLE_CARS,
  CARS_LOADED,
  ON_REGION_CHANGE
 } from './actions.type'
import { combineReducers } from 'redux'
import { unionBy } from 'lodash'

const visibleCars = (state = [], action) => {
  switch (action.type) {
    case GET_VISIBLE_CARS:
      return unionBy(action.vehicles, state, 'id')
    default:
      return state
  }
}

const carLoaded = (state = false, action) => {
  switch (action.type) {
    case CARS_LOADED:
      return action.loaded
    case ON_REGION_CHANGE:
      return true
    default:
      return state
  }
}

const car2go = (state = {visible:false}, action) => {
  switch (action.type) {
    case SET_CAR2GO_VISIBILITY:
      return {
        visible: action.visible
      }
    default:
      return state
  }
}

const evo = (state = {visible:false}, action) => {
  switch (action.type) {
    case SET_EVO_VISIBILITY:
      return {
        visible: action.visible
      }
    default:
      return state
  }
}

const translink = (state = {visible:true}, action) => {
  switch (action.type) {
    case SET_BUS_VISIBILITY:
      return {
        visible: action.visible
      }
    default:
      return state
  }
}

const mobi = (state = {visible:false}, action) => {
  switch (action.type) {
    case SET_MOBI_VISIBILITY:
      return {
        visible: action.visible
      }
    default:
      return state
  }
}

const modo = (state = {visible:false, hoursAvailable:2}, action) => {
  switch (action.type) {
    case SET_MODO_VISIBILITY:
      return { ...state, visible: action.visible }
    case SET_MODO_HOURS_AVAILABLE:
      return { ...state, hoursAvailable: action.hoursAvailable }
    default:
      return state
  }
}

const currentRegion = (state = {
  latitude: 49.2800565,
  longitude: -123.1212937,
  latitudeDelta: 0.00461,
  longitudeDelta: 0.002105
}, action) => {
  switch (action.type) {
    case ON_REGION_CHANGE:
      return { ...action.region }
    default:
      return state
  }
}

export default car = combineReducers({
	car2go, evo, translink, visibleCars, carLoaded, currentRegion, mobi, modo
})

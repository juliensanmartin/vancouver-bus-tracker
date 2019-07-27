import {
  GET_CURRENT_DISTANCE,
  GET_CURRENT_DIRECTION,
  CHECK_POSITION_IN_VANCOUVER,
  RESET_DIRECTION
 } from './actions.type'
 import { combineReducers } from 'redux'

const distance = (state = {}, action) => {
  switch (action.type) {
    case GET_CURRENT_DISTANCE:
      return action.distance
    default:
      return state
  }
}

const direction = (state = [], action) => {
  switch (action.type) {
    case GET_CURRENT_DIRECTION:
      return action.coords
    case RESET_DIRECTION:
      return action.coords
    default:
      return state
  }
}

const positionInVancouver = (state = false, action) => {
  switch (action.type) {
    case CHECK_POSITION_IN_VANCOUVER:
      return action.positionInVancouver
    default:
      return state
  }
}

export default distance = combineReducers({
	distance, direction, positionInVancouver
})

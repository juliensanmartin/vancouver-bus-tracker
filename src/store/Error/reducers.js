import { combineReducers } from 'redux';
import { PROPAGATE_ERROR, RESET_ERROR, PROPAGATE_ERROR_LINKING } from './actions.type';

const errorApi = (state = '', action) => {
  switch (action.type) {
    case PROPAGATE_ERROR:
      return action.message;
    case RESET_ERROR:
      return action.message;
    default:
      return state;
  }
};

const errorLinking = (state = '', action) => {
  switch (action.type) {
    case PROPAGATE_ERROR_LINKING:
      return action.message;
    case RESET_ERROR:
      return action.message;
    default:
      return state;
  }
};

export default combineReducers({
  errorApi,
  errorLinking
});

import { PROPAGATE_ERROR, RESET_ERROR, PROPAGATE_ERROR_LINKING } from './actions.type';

export const propagateError = message => dispatch => {
  return dispatch({
    type: PROPAGATE_ERROR,
    message
  });
};

export const propagateErrorLinking = message => dispatch => {
  return dispatch({
    type: PROPAGATE_ERROR_LINKING,
    message
  });
};

export const resetError = () => dispatch => {
  return dispatch({
    type: RESET_ERROR,
    message: ''
  });
};

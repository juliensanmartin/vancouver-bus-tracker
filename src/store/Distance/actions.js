import Polyline from '@mapbox/polyline';
import {
  GET_CURRENT_DISTANCE,
  GET_CURRENT_DIRECTION,
  CHECK_POSITION_IN_VANCOUVER,
  RESET_DIRECTION
} from './actions.type';
import { PROPAGATE_ERROR, RESET_ERROR } from '../Error/actions.type';
import { getTimeAndDistance, getDirection } from '../../services/google-map.api';

export const fetchDistance = (origin, destination) => dispatch =>
  getTimeAndDistance(origin, destination).then(
    ({ rows }) => {
      const distance = rows[0].elements[0].distance.text;
      const duration = rows[0].elements[0].duration.text;
      return dispatch({
        type: GET_CURRENT_DISTANCE,
        distance: {
          distance,
          duration
        }
      });
    },
    errors => {
      dispatch({
        type: PROPAGATE_ERROR,
        message: errors.message
      });
    }
  );

export const fetchDirection = (origin, destination) => dispatch =>
  getDirection(origin, destination).then(
    response => {
      const points = Polyline.decode(response.routes[0].overview_polyline.points);
      const coords = points.map((point, index) => ({
        latitude: point[0],
        longitude: point[1]
      }));
      return dispatch({
        type: GET_CURRENT_DIRECTION,
        coords
      });
    },
    errors => {
      dispatch({
        type: PROPAGATE_ERROR,
        message: errors.message
      });
    }
  );

export const resetDirection = () => dispatch => {
  return dispatch({
    type: RESET_DIRECTION,
    coords: []
  });
};

export const checkPositionInVancouver = position => dispatch => {
  let positionInVancouver = false;

  // Define the border to use the user GPS
  const topY = 49.450516;
  const bottomY = 49.014739;
  const leftX = -123.54015;
  const rightX = -122.260243;
  if (
    position.longitude > leftX &&
    position.longitude < rightX &&
    position.latitude > bottomY &&
    position.latitude < topY
  )
    positionInVancouver = true;
  return dispatch({
    type: CHECK_POSITION_IN_VANCOUVER,
    positionInVancouver
  });
};

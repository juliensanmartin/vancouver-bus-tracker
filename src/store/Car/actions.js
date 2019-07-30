import { reduce } from 'lodash';
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
} from './actions.type';
import { PROPAGATE_ERROR, RESET_ERROR } from '../error/actions.type';
import { getAvailableVehicleCar2Go } from '../../services/car2go.api';
import { getAvailableVehicleEvo } from '../../services/evo.api';
import { getAvailableBus } from '../../services/translink.api';
import { getAvailableMobi } from '../../services/mobi.api';
import { getModoCars } from '../../services/modo.api';
import {
  car2goVehicleNormalizer,
  evoVehicleNormalizer,
  busNormalizer,
  mobiNormalizer,
  modoVehicleNormalizer
} from './schema';

export const fetchVisibleCars = () => (dispatch, getState) => {
  dispatch({
    type: RESET_ERROR,
    message: ''
  });
  const state = getState();
  const car2GoVisible = state.car.car2go.visible;
  const evoVisible = state.car.evo.visible;
  const busVisible = state.car.translink.visible;
  const mobiVisible = state.car.mobi.visible;
  const modoVisible = state.car.modo.visible;

  const promises = [];

  if (car2GoVisible) promises.push(dispatch(fetchCar2GoCars()));
  if (evoVisible) promises.push(dispatch(fetchEvoCars()));
  if (busVisible) promises.push(dispatch(fetchBus()));
  if (mobiVisible) promises.push(dispatch(fetchMobi()));
  if (modoVisible) promises.push(dispatch(fetchModoCars()));

  Promise.all(promises).then(() => {
    return dispatch({
      type: CARS_LOADED,
      loaded: true
    });
  });
};

// this is a thunk (redux-thunk)
export const fetchCar2GoCars = () => (dispatch, getState) =>
  getAvailableVehicleCar2Go().then(
    placemarks => {
      // placemarks => [objects]
      // Normalized to entities => {objects} and result => [keys]
      normalized = car2goVehicleNormalizer(placemarks);
      console.log('CAR2GO NORMALIZED', normalized);

      const vehicles = reduce(
        normalized.entities.vehicles,
        (result, value, key) => {
          result.push({
            id: key,
            latlng: {
              latitude: value.coordinates[1],
              longitude: value.coordinates[0]
            },
            type: 'Car 2 Go',
            address: value.address,
            fuel: value.fuel,
            name: value.name
          });
          return result;
        },
        []
      );

      dispatch({
        type: GET_VISIBLE_CARS,
        vehicles
      });
    },
    errors => {
      dispatch({
        type: PROPAGATE_ERROR,
        message: errors.message
      });
    }
  );

export const setCar2GoVisibility = visible => dispatch => {
  if (visible) {
    dispatch({
      type: CARS_LOADED,
      loaded: false
    });
    dispatch(fetchCar2GoCars()).then(() => {
      return dispatch({
        type: CARS_LOADED,
        loaded: true
      });
    });
  }

  return dispatch({
    type: SET_CAR2GO_VISIBILITY,
    visible
  });
};

export const fetchEvoCars = () => (dispatch, getState) =>
  getAvailableVehicleEvo().then(
    data => {
      normalized = evoVehicleNormalizer(data);
      console.log('EVO NORMALIZED', normalized);

      const vehicles = reduce(
        normalized.entities.vehicles,
        (result, value, key) => {
          result.push({
            id: key,
            latlng: {
              latitude: value.Lat,
              longitude: value.Lon
            },
            type: 'Evo',
            address: value.Address,
            fuel: value.Fuel,
            name: value.Name
          });
          return result;
        },
        []
      );

      dispatch({
        type: GET_VISIBLE_CARS,
        vehicles
      });
    },
    errors => {
      dispatch({
        type: PROPAGATE_ERROR,
        message: errors.message
      });
    }
  );

export const setEvoVisibility = visible => dispatch => {
  if (visible) {
    dispatch({
      type: CARS_LOADED,
      loaded: false
    });
    dispatch(fetchEvoCars()).then(() => {
      return dispatch({
        type: CARS_LOADED,
        loaded: true
      });
    });
  }
  return dispatch({
    type: SET_EVO_VISIBILITY,
    visible
  });
};

export const fetchBus = () => dispatch =>
  getAvailableBus().then(
    response => {
      const normalized = busNormalizer(response);
      console.log('BUS NORMALIZED', normalized);

      const vehicles = reduce(
        normalized.entities.bus,
        (result, value, key) => {
          result.push({
            id: key,
            latlng: {
              latitude: value.Latitude,
              longitude: value.Longitude
            },
            type: 'Bus',
            address: value.Destination,
            fuel: null,
            name: value.RouteNo,
            direction: value.Direction
          });
          return result;
        },
        []
      );

      dispatch({
        type: GET_VISIBLE_CARS,
        vehicles
      });
    },
    errors => {
      dispatch({
        type: PROPAGATE_ERROR,
        message: errors.message
      });
    }
  );

export const setBusVisibility = visible => dispatch => {
  if (visible) {
    dispatch({
      type: CARS_LOADED,
      loaded: false
    });
    dispatch(fetchBus()).then(() => {
      return dispatch({
        type: CARS_LOADED,
        loaded: true
      });
    });
  }
  return dispatch({
    type: SET_BUS_VISIBILITY,
    visible
  });
};

export const fetchMobi = () => dispatch =>
  getAvailableMobi().then(
    response => {
      // const normalized = mobiNormalizer(response)
      // console.log(normalized)
      const vehicles = reduce(
        response,
        (result, value, key) => {
          result.push({
            id: key,
            latlng: {
              latitude: value.geometry.coordinates[1],
              longitude: value.geometry.coordinates[0]
            },
            type: 'Mobi Bike',
            address: value.properties.name,
            avlBikes: value.properties.avl_bikes,
            freeSlots: value.properties.free_slots
          });
          return result;
        },
        []
      );

      dispatch({
        type: GET_VISIBLE_CARS,
        vehicles
      });
    },
    errors => {
      dispatch({
        type: PROPAGATE_ERROR,
        message: errors.message
      });
    }
  );

export const setMobiVisibility = visible => dispatch => {
  if (visible) {
    dispatch({
      type: CARS_LOADED,
      loaded: false
    });
    dispatch(fetchMobi()).then(() => {
      return dispatch({
        type: CARS_LOADED,
        loaded: true
      });
    });
  }
  return dispatch({
    type: SET_MOBI_VISIBILITY,
    visible
  });
};

export const updateRegion = region => dispatch => {
  dispatch({
    type: ON_REGION_CHANGE,
    region
  });
  return dispatch({
    type: CARS_LOADED,
    loaded: true
  });
};

export const activateLoader = () => dispatch => {
  return dispatch({
    type: CARS_LOADED,
    loaded: false
  });
};

// this is a thunk (redux-thunk)
export const fetchModoCars = (hoursRequested = 2) => dispatch =>
  getModoCars(hoursRequested).then(
    cars => {
      normalized = modoVehicleNormalizer(cars);
      console.log('MODO NORMALIZED', normalized);

      const vehicles = reduce(
        normalized.entities.vehicles,
        (result, value, key) => {
          result.push({
            id: key,
            latlng: {
              latitude: parseFloat(value.Latitude),
              longitude: parseFloat(value.Longitude)
            },
            type: 'Modo',
            address: value.LocationName,
            name: value.CarDescription,
            duration: secondsToHm(value.Duration)
          });
          return result;
        },
        []
      );

      dispatch({
        type: GET_VISIBLE_CARS,
        vehicles
      });
    },
    errors => {
      dispatch({
        type: PROPAGATE_ERROR,
        message: errors.message
      });
    }
  );

const secondsToHm = seconds => {
  seconds = Number(seconds);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours} hours and ${minutes} minutes`;
};

export const setModoHoursAvailable = hoursRequested => dispatch => {
  dispatch({
    type: CARS_LOADED,
    loaded: false
  });
  dispatch({
    type: SET_MODO_HOURS_AVAILABLE,
    hoursAvailable: hoursRequested
  });
  dispatch(fetchModoCars(hoursRequested)).then(() => {
    return dispatch({
      type: CARS_LOADED,
      loaded: true
    });
  });
};

export const setModoVisibility = visible => dispatch => {
  if (visible) {
    dispatch({
      type: CARS_LOADED,
      loaded: false
    });
    dispatch(fetchModoCars()).then(() => {
      return dispatch({
        type: CARS_LOADED,
        loaded: true
      });
    });
  }
  return dispatch({
    type: SET_MODO_VISIBILITY,
    visible
  });
};

import { createSelector } from './node_modules/reselect';
import { reduce, reject } from './node_modules/lodash';

// Selector for car model : define and transform data for component usage :
// http://redux.js.org/docs/recipes/ComputingDerivedData.html

// Select entities from state
const getCar2GoVisibility = state => state.car.car2go.visible;
const getEvoVisibility = state => state.car.evo.visible;
const getBusVisibility = state => state.car.translink.visible;
const getMobiVisibility = state => state.car.mobi.visible;
const getModoVisibility = state => state.car.modo.visible;
const getModoHoursAvailable = state => state.car.modo.hoursAvailable;
const getVisibleCars = state => state.car.visibleCars;
const isLoaded = state => state.car.carLoaded;
const currentRegion = state => state.car.currentRegion;

const getVisibleMarkers = createSelector(
  [
    getCar2GoVisibility,
    getEvoVisibility,
    getBusVisibility,
    getMobiVisibility,
    getModoVisibility,
    getVisibleCars
  ],
  (car2goVisible, evoVisible, busVisibility, mobiVisibility, modoVisibility, markers) => {
    let result = markers;
    if (!car2goVisible) {
      result = reject(result, { type: 'Car 2 Go' });
    }
    if (!evoVisible) {
      result = reject(result, { type: 'Evo' });
    }
    if (!busVisibility) {
      result = reject(result, { type: 'Bus' });
    }
    if (!mobiVisibility) {
      result = reject(result, { type: 'Mobi Bike' });
    }
    if (!modoVisibility) {
      result = reject(result, { type: 'Modo' });
    }
    return result;
  }
);

const getRegionMarkers = createSelector(
  [currentRegion, getVisibleMarkers],
  (currentRegion, markers) => {
    const topLeft = {
      latitude: currentRegion.latitude + currentRegion.latitudeDelta / 2,
      longitude: currentRegion.longitude - currentRegion.longitudeDelta / 2
    };

    const bottomRight = {
      latitude: currentRegion.latitude - currentRegion.latitudeDelta / 2,
      longitude: currentRegion.longitude + currentRegion.longitudeDelta / 2
    };

    const vehicles = reduce(
      markers,
      (result, value) => {
        if (
          value.latlng.longitude > topLeft.longitude &&
          value.latlng.longitude < bottomRight.longitude &&
          value.latlng.latitude < topLeft.latitude &&
          value.latlng.latitude > bottomRight.latitude
        ) {
          result.push(value);
        }
        return result;
      },
      []
    );

    return vehicles;
  }
);

export {
  isLoaded,
  getVisibleMarkers,
  getCar2GoVisibility,
  getEvoVisibility,
  getBusVisibility,
  getMobiVisibility,
  getModoVisibility,
  getModoHoursAvailable,
  getRegionMarkers
};

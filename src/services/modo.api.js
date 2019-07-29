import { forEach, chunk, toString, flatten, filter } from 'lodash';
import moment from 'moment';

export const getModoCars = hoursRequested => {
  return fetch('https://bookit.modo.coop/api/fleet/cars')
    .then(response => response.json())
    .then(responseJson => getModoAvailableCars(getCarIds(responseJson), hoursRequested));
};

const getCarIds = response => {
  const carIds = [];
  forEach(response.Neighbourhoods, function(value, key) {
    forEach(value.Locations, function(value, key) {
      forEach(value.Cars, function(value, key) {
        carIds.push(key);
      });
    });
  });
  return carIds;
};

export const getModoAvailableCars = (carIds, hoursRequested) => {
  // endDate is now + hoursRequested + 15 minutes gap
  const endDate = (moment().unix() + convertHoursToSeconds(hoursRequested) + 900) / 1000;
  const carIdsPack = chunk(carIds, 20);
  const promises = [];
  const result = [];
  forEach(carIdsPack, pack => {
    promises.push(getModoCarsByPack(pack, null, moment.unix(endDate), hoursRequested));
  });

  return Promise.all(promises).then(data => {
    return flatten(data);
  });
};

const getModoCarsByPack = (carIds, startDate, endDate, hoursRequested) => {
  const request = `https://bookit.modo.coop/api/availability/${startDate}/${endDate}?cars=${toString(
    carIds
  )}`;
  return fetch(request)
    .then(response => response.json())
    .then(response => {
      const availableCars = filter(response.Data, {
        Duration: (convertHoursToSeconds(hoursRequested) + 900).toString()
      });
      return availableCars;
    });
};

const convertHoursToSeconds = hours => hours * 3600;

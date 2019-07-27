const car2GoConfig = {
  key: 'CarData',
  url: 'https://www.car2go.com/api/v2.1',
  format: 'json',
  loc: 'vancouver'
};

// api key : car2gowebsite / roadzapp

const params = `?loc=${car2GoConfig.loc}&oauth_consumer_key=${car2GoConfig.key}&format=${car2GoConfig.format}`;

const getAvailableVehicleCar2Go = () => {
  return fetch(`${car2GoConfig.url}/vehicles${params}`)
    .then(response => response.json())
    .then(responseJson => {
      return responseJson.placemarks;
    });
  // .catch(error => {
  //   console.error(error);
  // });
};

export default {
  getAvailableVehicleCar2Go
};

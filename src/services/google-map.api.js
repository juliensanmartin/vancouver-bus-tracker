const googleMapConfig = {
  keyDistance: 'AIzaSyAokG_foEe_P5uO2jxtVfEadnAjzHP6fsA',
  urlDistanceMatrix: 'https://maps.googleapis.com/maps/api/distancematrix/json',
  keyDirection: 'AIzaSyBHAP0kn6wYPfWifJw1BtJunnJ1PN0pwfQ',
  urlDirection: 'https://maps.googleapis.com/maps/api/directions/json'
};

export const getTimeAndDistance = (origin, destination) => {
  const url = `${googleMapConfig.urlDistanceMatrix}?origins=${origin.latitude},${origin.longitude}&destinations=${destination.latitude},${destination.longitude}&key=${googleMapConfig.keyDistance}&mode=walking`;
  return fetch(url).then(response => response.json());
  // .catch(error => {
  //   console.error(error)
  // })
};

export const getDirection = (origin, destination) => {
  const url = `${googleMapConfig.urlDirection}?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${googleMapConfig.keyDirection}&mode=walking`;
  return fetch(url).then(response => response.json());
  // .catch(error => {
  //   console.error(error)
  // })
};

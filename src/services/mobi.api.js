const getAvailableMobi = () => {
  //
  return fetch('https://mountainmath.ca/mobi/stations')
    .then(response => response.json())
    .then(responseJson => {
      return responseJson.features;
    });
  // .catch(error => {
  //   console.error(error)
  // })
};

export default {
  getAvailableMobi
};

const translinkConfig = {
  key: 'pbiQspKk9nYe5sFwUn04',
  url: 'https://api.translink.ca/rttiapi/v1/buses'
};

const params = `?apiKey=${translinkConfig.key}`;

const getAvailableBus = () => {
  const request = new Request(`${translinkConfig.url}${params}`, {
    headers: new Headers({
      accept: 'application/JSON'
    })
  });
  return fetch(request)
    .then(response => response.json())
    .catch(error => {
      console.error(error);
    });
};

export default {
  getAvailableBus
};

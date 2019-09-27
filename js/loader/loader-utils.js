const checkResponse = (response) => {
  if (response.ok && response.status === 200) {
    return response;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
};

const loadData = (url) => {
  return fetch(url)
    .then(checkResponse)
    .then((response) => response.json());
};

export {checkResponse, loadData};

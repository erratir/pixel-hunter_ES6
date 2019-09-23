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

const onError = (error) => {
  // console.log(error);
  // todo errorPopup
  // const errorPopup = new ErrorView(error).element;
  // document.body.prepend(errorPopup);
};

export {checkResponse, loadData, onError};

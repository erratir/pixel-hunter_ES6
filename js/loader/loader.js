import {checkResponse, onError, loadData} from './loader-utils';

const SERVER_URL = `https://es.dump.academy/pixel-hunter`;
const APP_ID = 322232;
const DEFAULT_NAME = `unknown_raccoon`;

export default class Loader {
  static loadGameData() {
    return loadData(`${SERVER_URL}/questions`);
  }

  static saveResults(data, name = DEFAULT_NAME) {
    const initOptions = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`, initOptions)
      .then(checkResponse)
      .catch((error) => onError(`Не удалось сохранить результаты игры на сервер (${error})`));
  }

  static loadResults(name = DEFAULT_NAME) {
    return loadData(`${SERVER_URL}/stats/${APP_ID}-${name}`)
      .catch((error) => onError(`Ошибка загрузки статистики с сервера (${error})`));
  }
}

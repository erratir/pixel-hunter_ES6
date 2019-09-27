import App from "../app";
import {checkResponse, loadData} from './loader-utils';
import {INITIAL_STATE} from "../data/settings";

const SERVER_URL = `https://es.dump.academy/pixel-hunter`;
const APP_ID = 322232;
const DEFAULT_NAME = INITIAL_STATE.userName;

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
      .catch((error) => App.showModalError(`Не удалось сохранить результаты игры на сервер (${error})`));
  }

  static loadResults(name = DEFAULT_NAME) {
    return loadData(`${SERVER_URL}/stats/${APP_ID}-${name}`)
      .catch((error) => App.showModalError(`Ошибка загрузки статистики с сервера (${error})`));
  }
}

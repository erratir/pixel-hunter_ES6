import StatScreen from "./screens/statistic/statistic-screen";
import GameModel from "./screens/games/games-model";
import GameScreen from "./screens/games/game-screen";
import {RULES} from "./data/settings";
import IntroScreen from "./screens/intro/intro";
import GreetingScreen from "./screens/greeting/greeting";
import RulesScreen from "./screens/rules/rules";
import Loader from "./loader/loader";
import {adapterServerData} from "./data/data-adapter";
import ModalErrorController from "./loader/modal-error-controler";

let gameData;

export default class App {

  static showIntro() {
    const introScreen = new IntroScreen();
    introScreen.show();

    // Load data from server and splash screen - spinner
    const spinnerStop = introScreen.spinnerStart();
    Loader.loadGameData()
      .then((data) => {
        gameData = adapterServerData(data);
        return data;
      }).finally(() => setTimeout(spinnerStop, RULES.spinnerRotationTime))
      .catch((error) => {
        // gameData = [...GAME_DATA]; // в случае ошибки используем моковые данные и продолжить игру?
        App.showModalError(`Ошибка загрузки данных  с сервера (${error})`);
      });
  }

  static showGreeting() {
    const greetingScreen = new GreetingScreen();
    greetingScreen.show();
  }

  static showRules() {
    const rulesScreen = new RulesScreen();
    rulesScreen.show();
  }

  static showGame(userName) {
    const model = new GameModel(userName);
    const gameScreen = new GameScreen(model, gameData);
    gameScreen.start();
  }

  static showStats(state) {
    // в таком виде сохраняем на сервер: { answers: ['correct', 'wrong', 'fast', ..],  lives: 0 }
    // в таком виде получаем userResults:
    // [{"answers":["fast","wrong","fast", ...],"lives":0,"date":1569318288998}, {"answers":[],"lives": 1,"date": ...}]
    const data = {answers: state.answers, lives: state.lives};
    const userName = state.userName;

    // сохраняем статистику на сервер
    Loader.saveResults(data, userName)
    // загружаем всю статистику по игроку
      .then(() => Loader.loadResults(userName))
      .then((userResults) => {
        const statScreen = new StatScreen(userName, userResults);
        statScreen.show();
      });
  }

  static showModalError(error) {
    const modal = new ModalErrorController(error);
    modal.render();
  }

}

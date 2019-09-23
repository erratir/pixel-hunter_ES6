import StatScreen from "./screens/statistic/statistic";
import GameModel from "./screens/games/games-model";
import GameScreen from "./screens/games/game-screen";
import {GAME_DATA, RULES} from "./data/settings";
import IntroScreen from "./screens/intro/intro";
import GreetingScreen from "./screens/greeting/greeting";
import RulesScreen from "./screens/rules/rules";
import Loader from "./loader/loader";
import {adapterServerData} from "./data/data-adapter";
import {onError} from "./loader/loader-utils";

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
        // в случае ошибки используем моковые данные
        gameData = [...GAME_DATA];
        onError(`Ошибка загрузки данных (${error}) с сервера, но мы все равно сыграем =)`);
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
    const statScreen = new StatScreen(state);
    statScreen.show();
  }
}

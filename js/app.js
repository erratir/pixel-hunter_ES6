import StatScreen from "./screens/statistic/statistic";
import GameModel from "./screens/games/games-model";
import GameScreen from "./screens/games/game-screen";
import {GAME_DATA} from "./data/settings";
import IntroScreen from "./screens/intro/intro";
import GreetingScreen from "./screens/greeting/greeting";
import RulesScreen from "./screens/rules/rules";

export default class App {

  static showIntro() {
    const introScreen = new IntroScreen();
    introScreen.show();
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
    const gameScreen = new GameScreen(model, GAME_DATA);
    gameScreen.start();
  }

  static showStats(state) {
    const statScreen = new StatScreen(state);
    statScreen.show();
  }


}

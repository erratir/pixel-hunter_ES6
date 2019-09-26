// Презентер (MV Presenter) - связывает модель игры с представлением
import HeaderView from "../header-view";
import FooterView from "../footer-view";
import StatStringView from "../stat-string-view";
import App from "../../app";
import Game3View from "./game3-view";
import Game1View from "./game1-view";
import Game2View from "./game2-view";
import {AnswerType, RULES} from "../../data/settings";
import {changeView} from "../../utils/utils";


export default class GameScreen {
  constructor(model, data) {
    // Инициализация и настройка игры
    this.model = model;
    this.gameData = data;
    this.headerView = new HeaderView(this.model.state);
    this.gameView = GameScreen.getGameView(this.gameData[this.model.state.currentLevel]);
    this.statStringView = new StatStringView(this.model.state.answers);
    this.footerView = new FooterView();

    this.root = document.querySelector(`main.central`);
    this.root.appendChild(this.headerView.element);
    this.root.appendChild(this.gameView.element);
    this.gameNode = this.root.querySelector(`.${this.gameView.element.className}`);
    this.gameNode.appendChild(this.statStringView.element);
    this.root.appendChild(this.footerView.element);
    this._timer = null;
  }

  get element() {
    return this.root;
  }

  stop() {
    // Остановка игры
    clearTimeout(this._timer);
  }

  start() {
    // Старт игры
    changeView(this.headerView.element, this.gameView.element, this.footerView.element);
    this.changeLevel();
    this.model.resetTime();
    this._tick();
  }

  restart() {
    // Продолжение или сброс игры
    if (this.model.isDead()) {
      this.model.restart();
    }
    this.start();
  }

  end() {
    App.showStats(this.model.state);
  }

  exit() {
    // Выход из игры
    // todo рендерить модалку?
    App.showStats(this.model);
  }

  renderNextScreen() {
    if (!this.model.isDead() && (this.model.state.currentLevel + 1) <= RULES.levels - 1) { // если не умер и есть следующий уровень
      this.model.nextLevel();
      this.start();
    } else {
      this.end();
    }
  }

  updateHeader() {
    // Обновление статистики игрока
    const header = new HeaderView(this.model.state);
    header.onWelcomeScreen = this._onWelcomeScreen.bind(this);
    this.root.replaceChild(header.element, this.root.firstChild);
  }

  changeLevel() {
    // Обновление текущего уровня
    this.updateHeader();
    const gameView = GameScreen.getGameView(this.gameData[this.model.state.currentLevel]);
    gameView.onAnswer = this._onAnswer.bind(this);
    this._changeGameView(gameView);
  }

  _tick() {
    this.model.tick();
    this.updateHeader();
    this._timer = setTimeout(() => this._tick(), RULES.tickTime);

    // если время вышло
    if (this.model.state.time === 0) {
      this._onAnswer(false);
    }
  }

  _changeGameView(view) {
    // смена игрового экрана
    this.root.replaceChild(view.element, this.gameView.element);
    this.gameView = view;
    this.gameNode = this.root.querySelector(`.${this.gameView.element.className}`);
    this._changeStatString();
    this._debug();
  }

  _changeStatString() {
    // смена строки состояния (строка результатов ответов)
    this.statStringView = new StatStringView(this.model.state.answers);
    this.gameNode.appendChild(this.statStringView.element);
  }

  _onAnswer(answer) {
    // Обрабтка ответа пользователя
    this.stop();
    const answerSpeed = RULES.gameTime - this.model.state.time;
    let answerType;
    if (answer) {
      answerType = GameScreen.getAnswerType(answer, answerSpeed);
    } else {
      this.model.die();
      answerType = AnswerType.WRONG;
    }
    this.model.addAnswer(answerType);
    this.renderNextScreen();
  }

  _onWelcomeScreen() {
    this.stop();
    this.model.restart();
    App.showGreeting();
  }

  _debug() {
    if (RULES.debug) {
      // eslint-disable-next-line no-console
      console.error(`debag mode ON`);
      // eslint-disable-next-line no-console
      this.gameData[this.model.state.currentLevel].answers.map((answer) => console.log(answer.type));
    }
  }

  static getGameView(game) {
    switch (game.type) {
      case `paint-or-photo`:
        return new Game1View(game);
      case `two-of-two`:
        return new Game2View(game);
      case `one-of-three`:
        return new Game3View(game);
      default:
        return new Error(`Не удалось получить представление игры`);
    }
  }

  static getAnswerType(answer, answerSpeed) {

    if (answerSpeed < RULES.quickTime) {
      return AnswerType.FAST;
    }
    if (answerSpeed > RULES.slowTime) {
      return AnswerType.SLOW;
    }
    return AnswerType.CORRECT;
  }
}

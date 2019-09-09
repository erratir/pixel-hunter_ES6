import Game1View from "./game1-view";
import Game2View from "./game2-view";
import Game3View from "./game3-view";
import {ANSWER_TYPE, GAME_DATA, INITIAL_STATE, RULES} from "../../data/data";
import {clearScreen, show} from "../../utils/utils";
import renderStatScreen from "../statistic/statistic";
import HeaderView from "../header-view";
import FooterView from "../footer-view";
import renderGreeting from "../greeting/greeting";
import StatStringView from "../stat-string-view";


function getGameView(game) {
  switch (game.type) {
    case `paint-or-photo`:
      return new Game1View(game);
    case `two-of-two`:
      return new Game2View(game);
    case `one-of-three`:
      return new Game3View(game);
    default:
      return new Error(`Не удалось, сформировать шаблон игры.`);
  }
}


function renderGame(state = Object.assign({}, INITIAL_STATE), game = GAME_DATA[0]) {
  clearScreen();
  state.countOfGameScreens++;

  /**
   * Проверить результат (в зависимости от типа игры)
   * @param {array} answers Массив ответов e.g., [painting, photo]
   * @return {boolean}
   */
  function isCorrectAnswers(answers) {
    let isCorrect = false;

    switch (game.type) {
      case `paint-or-photo`:
      case `two-of-two`:
        isCorrect = answers.every((answer, i) => {
          return answer === game.answers[i].type;
        });
        break;
      case `one-of-three`:
        // Найдите рисунок среди изображений
        let answerStr = answers[0]; // e.g. "Option 2"
        let userAnswerNumber = parseInt(answerStr.slice(-1), 10); // "Option 2".slice(-1) вернет "2"
        isCorrect = game.answers[userAnswerNumber - 1].type === `painting`; // массив с нуля game.answers[0], а ответы с еденицы "Option 1", "Option 2"
        break;
    }
    return isCorrect;
  }

  function renderNextScreen() {
    // console.log(state.lives);
    if (state.countOfGameScreens < RULES.levels && state.lives > -1) {
      renderGame(state, GAME_DATA[state.countOfGameScreens]);
    } else {
      renderStatScreen(state);
    }
  }

  // header
  const headerView = new HeaderView(state);
  show(headerView.element);
  headerView.onWelcomeScreen = () => {
    renderGreeting();
  };

  // game
  const currentGameView = getGameView(game);
  show(currentGameView.element);
  currentGameView.onAnswers = (answers) => {
    // Изменить state в зависимости от корректности ответа юзера
    if (isCorrectAnswers(answers)) {
      state.answers.push(ANSWER_TYPE.correct);
    } else {
      state.answers.push(ANSWER_TYPE.wrong);
      --state.lives;
    }
    renderNextScreen();
  };

  // stat_string
  const statStringView = new StatStringView(state);
  show(statStringView.element, document.querySelector(`.game`));

  // footer
  const footerView = new FooterView();
  show(footerView.element);

}


export {renderGame};

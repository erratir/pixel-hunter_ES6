import {getGameView} from "./screen-templates/games";
import {headerTemplate} from "./screen-templates/games-header";
import footerTemplate from "./screen-templates/footer";
import {statStringTemplate} from "./screen-templates/games-stat-string";
import {INITIAL_STATE, GAME_DATA, RULES} from "./data/data";
import {changeScreen, createDomElement} from "./utils";

const gameScreenTemplate = (game) => {
  return `<section class="game">
    <p class="game__task">${game.question}</p>
    ${getGameView(game)}
    ${statStringTemplate()}
  </section>`;
};

/**
 * Функция отрисовки экранов игры
 * @param {object} state Текущее состояние игры
 * @param {object} game Параметры игры
 * todo Тестируем вручную - вызывая renderGame с разными типами игры GAME_DATA[1]
 */
function renderGame(state = Object.assign({}, INITIAL_STATE), game = GAME_DATA[2]) {
  if (state.countOfGameScreens <= RULES.levels) {
    state.countOfGameScreens += 1;
    let gameDOM = createDomElement(`div`, headerTemplate(state) + gameScreenTemplate(game) + footerTemplate);
    changeScreen(gameDOM);
    addBehaviour(game, gameDOM, state);
  }
}

/**
 * Временная функция.. или todo дописать логику
 * @param {string} msg
 */
const renderNextGameScreen = (msg) => {
  console.log(msg, `и дальше рендерим экран следующей игры`);
};

/**
 * Проверяет правильность ответа пользователя
 * @param {object} currentGame
 * @param {object} answers
 * @param {object} state
 */
const checkAnswers = (currentGame, answers, state) => {
  //  console.log(answers);

  let isCorrectAnswer = false;

  switch (currentGame.type) {
    case `paint-or-photo`:
    case `two-of-two`:
      isCorrectAnswer = answers.every((answer, i) => {
        return answer === currentGame.answers[i].type;
      });
      break;
    case `one-of-three`:
      // Найдите рисунок среди изображений
      let userAnswerNumber = parseInt(answers.slice(-1), 10); // "Option 2".slice(-1) вернет "2"
      isCorrectAnswer = currentGame.answers[userAnswerNumber - 1].type === `painting`;
      break;
  }

  // todo измеять state и редерить новую игру
  let msg = isCorrectAnswer ? `Верно!` : `Не верно!`;
  renderNextGameScreen(msg);
};

/**
 * Функция добавляет модель поведения (логику переключения экранов игры), навешивая обработчики
 * @param {object} currentGame
 * @param {Node} node
 * @param {object} state
 */
function addBehaviour(currentGame, node, state) {
  const formGame = node.querySelector(`.game__content`);

  switch (currentGame.type) {
    case `paint-or-photo`:
    case `two-of-two`:
      formGame.addEventListener(`change`, () => {
        const answerCheckBoxes = document.querySelectorAll(`input:checked`); // выбрать все чекнутые  type="radio"
        if (answerCheckBoxes.length === currentGame.answers.length) { // если их столько же сколько ответов(картинок) в игре
          let answers = Array.from(answerCheckBoxes).map((checkBox) => checkBox.value);
          checkAnswers(currentGame, answers, state);
        }
      });
      break;
    case `one-of-three`:
      formGame.addEventListener(`click`, (evt) => {
        checkAnswers(currentGame, evt.target.alt, state);
      });
      break;
  }
}

export {renderGame};

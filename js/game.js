import {getGameView} from "./screen-templates/games";
import {headerTemplate} from "./screen-templates/games-header";
import footerTemplate from "./screen-templates/footer";
import {statStringTemplate} from "./screen-templates/games-stat-string";
import {INITIAL_STATE, GAME_DATA, RULES, ANSWER_TYPE} from "./data/data";
import {changeScreen, createDomElement} from "./utils";
import {renderStatScreen} from "./screen-templates/stats";

const gameScreenTemplate = (game, state) => {
  return `<section class="game">
    <p class="game__task">${game.question}</p>
    ${getGameView(game)}
    ${statStringTemplate(state)}
  </section>`;
};

/**
 * Функция отрисовки экранов игры
 * @param {object} state Текущее состояние игры
 * @param {object} game Параметры игры
 * todo Тестируем вручную - вызывая renderGame с разными типами игры GAME_DATA[1]
 */
function renderGame(state = Object.assign({}, INITIAL_STATE), game = GAME_DATA[0]) {
  if (state.countOfGameScreens < RULES.levels) {
    state.countOfGameScreens += 1;
    let gameDOM = createDomElement(`div`, headerTemplate(state) + gameScreenTemplate(game, state) + footerTemplate);
    changeScreen(gameDOM);
    addBehaviour(game, gameDOM, state);
  }
}

/**
 * Рендерит экран с новой игрой или экран статистики, если пройдены все игры
 * @param {object} currentGame
 * @param {object} state
 */
const renderNextGameScreen = (currentGame, state) => {
  if (state.countOfGameScreens < RULES.levels) {
    renderGame(state, GAME_DATA[state.countOfGameScreens]);
  } else {
    renderStatScreen(state);
  }
};

/**
 * Проверяет правильность ответа пользователя и пишет результат в state
 * e.g., state.answers:  [`correct`, `correct`, `wrong`, `fast`, `slow`]
 * @param {object} currentGame
 * @param {object} answers
 * @param {object} state
 */
const checkAnswers = (currentGame, answers, state) => {
  let isCorrectAnswer = false;

  // Проверить результат (в зависимости от типа игры)
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

  // Изменить state в зависимости от корректности ответа юзера
  if (isCorrectAnswer) {
    state.answers.push(ANSWER_TYPE.correct);
  } else {
    state.answers.push(ANSWER_TYPE.wrong);
  }

  renderNextGameScreen(currentGame, state);
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

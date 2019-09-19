import {AnswerType, INITIAL_STATE, RULES} from "./data";

/**
 * Функция подсчёта очков при окончании игры / Scoring function at the end of the game
 * Returns the total result to display on the statistics page
 * @param {object} state - состояние игры. Cм. INITIAL_STATE
 * state.lives {number} - Количество оставшихся жизней
 * state.answers {array} - Массив ответов хранит данные об ответах пользователя на каждый вопрос по порядку.
 *                          варианты ответов: см - RULES.answersPoints
 * @return {object} totalResult - объект со статистикой игры
 */
export const calculateStatistic = (state) => {

  let {lives, answers} = state;

  // скопируем объект totalResult (см. INITIAL_STATE)
  let totalResult = Object.assign({}, INITIAL_STATE.totalResult);

  /**
   *   Если игрок ответил меньше, чем на 10 вопросов, то игра считается не пройденной и функция должна вернуть -1;
   *   Жизней может быть 0-3 type@ integer
   */
  if (!Number.isInteger(lives) || !Array.isArray(answers) || answers.length !== RULES.levels || lives < 0 || lives > 3) {
    totalResult.score = -1;
    totalResult.title = `Вы проиграли.. `;
    return totalResult;
  }

  // true - false
  totalResult.sucsses = state.getCountOfAnswers(`wrong`) < RULES.lives;
  totalResult.title = totalResult.sucsses ? `Победа!` : `Вы проиграли..`;

  // подсчет очков
  totalResult.totalAnswersCount = answers.length;
  totalResult.correctAnswersCount = state.getCountOfAnswers(AnswerType.CORRECT);
  totalResult.fastAnswersCount = state.getCountOfAnswers(AnswerType.FAST);
  totalResult.slowAnswersCount = state.getCountOfAnswers(AnswerType.SLOW);
  totalResult.wrongAnswersCount = state.getCountOfAnswers(AnswerType.WRONG);


  totalResult.score =
    totalResult.correctAnswersCount * RULES.answersPoints.correct +
    totalResult.fastAnswersCount * RULES.answersPoints.fast +
    totalResult.slowAnswersCount * RULES.answersPoints.slow +
    state.lives * RULES.liveBonus;

  return totalResult;
};

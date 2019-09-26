import {AnswerType, INITIAL_STATE, RULES} from "./settings";

/**
 * Returns count of answers specified type
 * If answers type not specified, returns total count of answers
 * @param {array} answers
 * @param {string | boolean} answerType  / ex.: `CORRECT`, `WRONG`, `FAST`, `SLOW`
 * @return {number}
 */
const getCountOfAnswers = (answers, answerType = false) => {
  if (answerType) {
    return answers.filter((element) => element === answerType).length;
  }

  return answers.length;
};

/**
 * Функция подсчёта очков при окончании игры / Scoring function at the end of the game
 * Returns the total result to display on the statistics page
 *
 * @param {Object} result - результаты игры. Cм. INITIAL_STATE
 * @param {array} result.answers - Массив ответов пользователя на каждый вопрос по порядку.
 *                                 Варианты ответов: см - RULES.answersPoints
 * @param {number} result.lives - Количество оставшихся жизней
 * @return {object} gameResult - объект со статистикой игры
 */
export const calculateStatistic = (result) => {

  let {answers, lives} = result;

  // скопируем объект gameResult (см. INITIAL_STATE)
  let gameResult = Object.assign({}, INITIAL_STATE.gameResult);

  /**
   *   Если игрок ответил меньше, чем на 10 вопросов, то игра считается не пройденной и функция должна вернуть -1;
   *   Жизней может быть 0-3 type@ integer
   */
  if (!Number.isInteger(lives) || !Array.isArray(answers) || answers.length !== RULES.levels || lives < 0 || lives > 3) {
    gameResult.score = -1;
    return gameResult;
  }

  // true - false
  gameResult.success = getCountOfAnswers(answers, AnswerType.WRONG) < RULES.lives;

  // подсчет очков
  gameResult.totalAnswersCount = getCountOfAnswers(answers);
  gameResult.correctAnswersCount = getCountOfAnswers(answers, AnswerType.CORRECT);
  gameResult.fastAnswersCount = getCountOfAnswers(answers, AnswerType.FAST);
  gameResult.slowAnswersCount = getCountOfAnswers(answers, AnswerType.SLOW);
  gameResult.wrongAnswersCount = getCountOfAnswers(answers, AnswerType.WRONG);


  gameResult.score =
    gameResult.correctAnswersCount * RULES.answersPoints.correct +
    gameResult.fastAnswersCount * RULES.answersPoints.fast +
    gameResult.slowAnswersCount * RULES.answersPoints.slow +
    lives * RULES.liveBonus;

  return gameResult;
};

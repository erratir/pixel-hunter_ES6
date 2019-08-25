import {INITIAL_STATE, RULES} from "./data";

/**
 * Функция подсчёта очков при окончании игры / Scoring function at the end of the game
 * @param {number} lives - Количество оставшихся жизней
 * @param {array} answers - Массив ответов хранит данные об ответах пользователя на каждый вопрос по порядку.
 *                          варианты ответов: см - RULES.answersPoints
 * @return {object} newGame - объект со статистикой игры
 */
export const calculateStatistic = ({lives, answers}) => {

  // скопируем объект INITIAL_STATE
  const newGame = Object.assign({}, INITIAL_STATE);

  /**
   *   Если игрок ответил меньше, чем на 10 вопросов, то игра считается не пройденной и функция должна вернуть -1;
   *   Жизней может быть 0-3 type@ integer
   */
  if (!Number.isInteger(lives) || !Array.isArray(answers) || answers.length !== RULES.levels || lives < 0 || lives > 3) {
    newGame.totalResult.score = -1;
    return newGame;
  } else {
    newGame.totalResult.success = true;
  }

  // подсчет кол-ва различных ответов
  answers.forEach((item) => {
    if (item === `correct`) {
      newGame.correctAnswersCount += 1;
    } else if (item === `fast`) {
      newGame.fastAnswersCount += 1;
    } else if (item === `slow`) {
      newGame.slowAnswersCount += 1;
    }
  });

  newGame.livesBonus = lives * RULES.liveBonus;

  newGame.totalResult.score =
    newGame.correctAnswersCount * RULES.answersPoints.correct +
    newGame.fastAnswersCount * RULES.answersPoints.fast +
    newGame.slowAnswersCount * RULES.answersPoints.slow +
    newGame.livesBonus;

  return newGame;
};

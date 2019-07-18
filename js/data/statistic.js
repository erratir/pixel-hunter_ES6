/**
 * object settings rules of the game
 * @type {{levels: number, gameTime: number, warningTime: number, slowTime: number, quickTime: number, lives: number, liveBonus: number, answersPoints: {wrong: number, correct: number, fast: number, slow: number}}}
 */
const RULES = Object.freeze({
  levels: 10, // количество уровней (вопросов)
  gameTime: 30,
  warningTime: 5,
  slowTime: 20, // slow answer time
  quickTime: 10, // fast answer time
  lives: 3, // Кол-во жизней (кол-во возможных ошибок)
  liveBonus: 50, // Бонус за каждую сохраненную жизнь
  answersPoints: { // к-во очков за ответы:
    wrong: 0, // за неверный ответ
    correct: 100, // за верный ответ произведенный за Хсек (quickTime >  Хсек < slowTime)
    fast: 150, // за верный ответ быстрый ответ ( < quickTime сек)
    slow: 50 // за верный медленный  ответ ( > slowTime сек)
  }
});

/**
 * initial game settings
 */
const INITIAL_GAME = Object.freeze({
  correctAnswersCount: 0,
  fastAnswersCount: 0,
  slowAnswersCount: 0,
  livesBonus: 0, // Бонус за сохраненные жизни
  totalResult: {
    success: false,
    score: 0,
  }
});

/**
 * Функция подсчёта очков при окончании игры / Scoring function at the end of the game
 * @param {number} lives - Количество оставшихся жизней
 * @param {array} answers - Массив ответов хранит данные об ответах пользователя на каждый вопрос по порядку.
 *                          варианты ответов: см - RULES.answersPoints
 * @return {object} newGame - объект со статистикой игры
 */
export const calculateStatistic = ({lives, answers}) => {

  // скопируем объект INITIAL_GAME
  const newGame = Object.assign({}, INITIAL_GAME);

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

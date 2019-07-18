/**
 * object settings rules of the game
 * @type {{levels: number, gameTime: number, warningTime: number, slowTime: number, quickTime: number, lives: number, liveBonus: number, answersPoints: {wrong: number, correct: number, fast: number, slow: number}}}
 */
const RULES = {
  levels: 10, // количество уровней (вопросов)
  gameTime: 30,
  warningTime: 5,
  slowTime: 20,
  quickTime: 10,
  lives: 3, // Жизней (возможно вариантов не правильных ответов)
  liveBonus: 50, // Бонус за каждую сохраненную жизнь
  answersPoints: {
    wrong: 0,
    correct: 100, // 10-20 секунд
    fast: 150, // < 10 сек
    slow: 50 // > 20 сек
  }
};

/**
 * Функция подсчёта очков при окончании игры / Scoring function at the end of the game
 * @param {number} lives - Количество оставшихся жизней
 * @param {array} answers - Массив ответов хранит данные об ответах пользователя на каждый вопрос по порядку.
 *                          варианты ответов: см - RULES.answersPoints
 * @return {number}
 */
export const calculateStatistic = ({lives, answers}) => {

  /**
   * initial game settings
   */
  const STAT = {
    correctAnswersCount: 0,
    fastAnswersCount: 0,
    slowAnswersCount: 0,
    livesBonus: 0, // Бонус за сохраненные жизни
    totalResult: {
      success: false,
      score: 0,
    }
  };

  /**
   *   Если игрок ответил меньше, чем на 10 вопросов, то игра считается не пройденной и функция должна вернуть -1;
   *   Жизней может быть 0-3 type@ integer
   */
  if (!Number.isInteger(lives) || !Array.isArray(answers) || answers.length !== RULES.levels || lives < 0 || lives > 3) {
    return -1;
  } else {
    STAT.totalResult.success = true;
  }

  // подсчет кол-ва различных ответов
  answers.forEach((item) => {
    if (item === `correct`) {
      STAT.correctAnswersCount += 1;
    } else if (item === `fast`) {
      STAT.fastAnswersCount += 1;
    } else if (item === `slow`) {
      STAT.slowAnswersCount += 1;
    }
  });

  STAT.livesBonus = lives * RULES.liveBonus;

  STAT.totalResult.score =
    STAT.correctAnswersCount * RULES.answersPoints.correct +
    STAT.fastAnswersCount * RULES.answersPoints.fast +
    STAT.slowAnswersCount * RULES.answersPoints.slow +
    STAT.livesBonus;

  return STAT.totalResult.score;
};

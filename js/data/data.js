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
const INITIAL_STATE = Object.freeze({
  lives: 1,
  time: 0,
  correctAnswersCount: 0,
  fastAnswersCount: 0,
  slowAnswersCount: 0,
  livesBonus: 0, // Бонус за сохраненные жизни
  totalResult: {
    success: false,
    score: 0,
  }
});

export {INITIAL_STATE, RULES};

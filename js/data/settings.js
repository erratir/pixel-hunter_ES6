const hash = window.location.hash.replace(`#`, ``);

const AnswerType = {
  WRONG: `wrong`,
  CORRECT: `correct`,
  FAST: `fast`,
  SLOW: `slow`,
};

/**
 * object settings rules of the game
 * @type {Readonly<{quickTime: number, gameTime: number, lives: number, answersPoints: {[p: string]: number}, tickTime: number, slowTime: number, liveBonus: number, warningTime: number, levels: number}>}
 */
const RULES = Object.freeze({
  debug: hash.toLowerCase() === `debug`, // to use debug mode add #debug to url, and see console
  spinnerRotationTime: 50, // spinner rotation time after the load data from server, in ms (intro screen)
  levels: 10, // количество уровней (вопросов)
  gameTime: 30,
  tickTime: 1000, // время обновления таймера, in ms
  warningTime: 5,
  slowTime: 20, // slow answer time
  quickTime: 10, // fast answer time
  lives: 3, // Кол-во жизней (кол-во возможных ошибок)
  liveBonus: 50, // Бонус за каждую сохраненную жизнь
  answersPoints: { // к-во очков за ответы:
    [AnswerType.WRONG]: 0, // за неверный ответ
    [AnswerType.CORRECT]: 100, // за верный ответ произведенный за Хсек (quickTime >  Хсек < slowTime)
    [AnswerType.FAST]: 150, // за верный ответ быстрый ответ ( < quickTime сек)
    [AnswerType.SLOW]: 50 // за верный медленный  ответ ( > slowTime сек)
  }
});

/**
 * initial game settings
 */
const INITIAL_STATE = Object.freeze({
  userName: `Неопознанный Енот`,
  lives: 3,
  time: 30,
  currentLevel: 0,
  answers: [], // ex.: [`CORRECT`, `CORRECT`, `WRONG`, `FAST`, `SLOW`]
  /**
   * Returns count of answers specified type
   * If answers type not specified, returns total count of answers
   * @param {string} type  / ex.: `CORRECT`, `WRONG`, `FAST`, `SLOW`
   * @return {number}
   */
  getCountOfAnswers(type) {
    if (type) {
      return this.answers.filter((element) => element === type).length;
    } else {
      return this.answers.length;
    }
  },
  totalResult: {
    score: 0,
    success: false
  },
});

// https://es.dump.academy/pixel-hunter/questions
/* eslint-disable quotes */
const GAME_DATA = [
  {
    "type": "one-of-three",
    "question": "Найдите фото среди изображений",
    "answers": [{
      "image": {"url": "https://k40.kn3.net/6A7A24F7C.jpg", "width": 304, "height": 455},
      "type": "painting"
    }, {
      "image": {"url": "https://k35.kn3.net/2B925F44D.jpg", "width": 304, "height": 455},
      "type": "painting"
    }, {"image": {"url": "http://i.imgur.com/gUeK0qE.jpg", "width": 304, "height": 455}, "type": "photo"}]
  },
  {
    "type": "one-of-three",
    "question": "Найдите рисунок среди изображений",
    "answers": [{
      "image": {"url": "http://i.imgur.com/167pXyY.jpg", "width": 304, "height": 455},
      "type": "photo"
    }, {
      "image": {"url": "https://i.redd.it/0uvt7jy0hy2y.jpg", "width": 304, "height": 455},
      "type": "photo"
    }, {"image": {"url": "https://k31.kn3.net/4BF6BBF0E.jpg", "width": 304, "height": 455}, "type": "painting"}]
  },
  {
    "type": "paint-or-photo",
    "question": "Угадай, фото или рисунок?",
    "answers": [{"image": {"url": "https://k36.kn3.net/E9B401148.jpg", "width": 705, "height": 455}, "type": "painting"}]
  },
  {
    "type": "one-of-three",
    "question": "Найдите рисунок среди изображений",
    "answers": [{
      "image": {"url": "http://i.imgur.com/W5DNOVJ.jpg", "width": 304, "height": 455},
      "type": "photo"
    }, {
      "image": {"url": "http://i.imgur.com/ncXRs5Y.jpg", "width": 304, "height": 455},
      "type": "photo"
    }, {"image": {"url": "https://k39.kn3.net/B27A12A74.jpg", "width": 304, "height": 455}, "type": "painting"}]
  },
  {
    "type": "two-of-two",
    "question": "Угадайте для каждого изображения фото или рисунок?",
    "answers": [{
      "image": {"url": "https://k37.kn3.net/695A61B3C.jpg", "width": 468, "height": 458},
      "type": "painting"
    }, {"image": {"url": "http://i.imgur.com/dWTKNtv.jpg", "width": 468, "height": 458}, "type": "photo"}]
  },
  {
    "type": "paint-or-photo",
    "question": "Угадай, фото или рисунок?",
    "answers": [{"image": {"url": "http://i.imgur.com/DKR1HtB.jpg", "width": 705, "height": 455}, "type": "photo"}]
  },
  {
    "type": "two-of-two",
    "question": "Угадайте для каждого изображения фото или рисунок?",
    "answers": [{
      "image": {"url": "https://i.redd.it/cfw21jscl03y.jpg", "width": 468, "height": 458},
      "type": "photo"
    }, {"image": {"url": "https://i.imgur.com/DiHM5Zb.jpg", "width": 468, "height": 458}, "type": "photo"}]
  },
  {
    "type": "two-of-two",
    "question": "Угадайте для каждого изображения фото или рисунок?",
    "answers": [{
      "image": {"url": "http://i.imgur.com/mz0MSsy.jpg", "width": 468, "height": 458},
      "type": "photo"
    }, {"image": {"url": "http://i.imgur.com/zHRZW1C.jpg", "width": 468, "height": 458}, "type": "photo"}]
  },
  {
    "type": "two-of-two",
    "question": "Угадайте для каждого изображения фото или рисунок?",
    "answers": [{
      "image": {"url": "https://k41.kn3.net/FF5009BF0.jpg", "width": 468, "height": 458},
      "type": "painting"
    }, {"image": {"url": "https://k32.kn3.net/42C83EF0A.jpg", "width": 468, "height": 458}, "type": "painting"}]
  },
  {
    "type": "paint-or-photo",
    "question": "Угадай, фото или рисунок?",
    "answers": [{"image": {"url": "https://i.imgur.com/KNfvQ44.jpg", "width": 705, "height": 455}, "type": "photo"}]
  }];

export {GAME_DATA, INITIAL_STATE, RULES, AnswerType};

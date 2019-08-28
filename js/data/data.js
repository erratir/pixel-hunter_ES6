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

// https://intensive-ecmascript-server-btfgudlkpi.now.sh/pixel-hunter/questions
const GAME_DATA = [
  {
    "type": `two-of-two`,
    "question": `Угадайте для каждого изображения фото или рисунок?`,
    "answers": [
      {
        "image": {
          "url": `https://k32.kn3.net/5C7060EC5.jpg`,
          "width": 468,
          "height": 458
        },
        "type": `painting`
      },
      {
        "image": {
          "url": `http://i.imgur.com/UIHVp0P.jpg`,
          "width": 468,
          "height": 458
        },
        "type": `photo`
      }
    ]
  },
  {
    "type": `paint-or-photo`,
    "question": `Угадай, фото или рисунок?`,
    "answers": [{"image": {"url": `https://k42.kn3.net/D660F0768.jpg`, "width": 705, "height": 455}, "type": `painting`}]
  },
  {"type": `one-of-three`, "question": `Найдите рисунок среди изображений`, "answers": [{"image": {"url": `http://i.imgur.com/Gvq3jc2.jpg`, "width": 304, "height": 455}, "type": `photo`}, {"image": {"url": `http://i.imgur.com/eSlWjE7.jpg`, "width": 304, "height": 455}, "type": `photo`}, {"image": {"url": `https://k35.kn3.net/2B925F44D.jpg`, "width": 304, "height": 455}, "type": `painting`}]},
  {"type": `one-of-three`, "question": `Найдите фото среди изображений`, "answers": [{"image": {"url": `https://k34.kn3.net/4244FE50B.jpg`, "width": 304, "height": 455}, "type": `painting`}, {"image": {"url": `https://k37.kn3.net/695A61B3C.jpg`, "width": 304, "height": 455}, "type": `painting`}, {"image": {"url": `http://i.imgur.com/dWTKNtv.jpg`, "width": 304, "height": 455}, "type": `photo`}]},
  {"type": `one-of-three`, "question": `Найдите рисунок среди изображений`, "answers": [{"image": {"url": `https://i.imgur.com/NXlVX48.png`, "width": 304, "height": 455}, "type": `photo`}, {"image": {"url": `http://i.imgur.com/1KegWPz.jpg`, "width": 304, "height": 455}, "type": `photo`}, {"image": {"url": `https://k43.kn3.net/27AC45B8B.jpg`, "width": 304, "height": 455}, "type": `painting`}]},
  {"type": `two-of-two`, "question": `Угадайте для каждого изображения фото или рисунок?`, "answers": [{"image": {"url": `https://i.redd.it/0uvt7jy0hy2y.jpg`, "width": 468, "height": 458}, "type": `photo`}, {"image": {"url": `https://k41.kn3.net/FF5009BF0.jpg`, "width": 468, "height": 458}, "type": `painting`}]},
  {"type": `one-of-three`, "question": `Найдите рисунок среди изображений`, "answers": [{"image": {"url": `http://i.imgur.com/167pXyY.jpg`, "width": 304, "height": 455}, "type": `photo`}, {"image": {"url": `http://i.imgur.com/mz0MSsy.jpg`, "width": 304, "height": 455}, "type": `photo`}, {"image": {"url": `https://k42.kn3.net/D2F0370D6.jpg`, "width": 304, "height": 455}, "type": `painting`}]},
  {"type": `one-of-three`, "question": `Найдите рисунок среди изображений`, "answers": [{"image": {"url": `https://i.redd.it/apoalsgb702y.jpg`, "width": 304, "height": 455}, "type": `photo`}, {"image": {"url": `https://i.imgur.com/DiHM5Zb.jpg`, "width": 304, "height": 455}, "type": `photo`}, {"image": {"url": `https://k36.kn3.net/E9B401148.jpg`, "width": 304, "height": 455}, "type": `painting`}]},
  {"type": `paint-or-photo`, "question": `Угадай, фото или рисунок?`, "answers": [{"image": {"url": `https://k43.kn3.net/1C4F7F5D5.jpg`, "width": 705, "height": 455}, "type": `painting`}]},
  {"type": `paint-or-photo`, "question": `Угадай, фото или рисунок?`, "answers": [{"image": {"url": `http://i.imgur.com/Jvzh3pk.jpg`, "width": 705, "height": 455}, "type": `photo`}]}
];
export {INITIAL_STATE, RULES, GAME_DATA};

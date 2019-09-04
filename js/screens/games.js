/** В модуле HTML шаблоны 3х типов игр. (Объеденить в один? Сложнее будет редактировать) */

/**
 * Возвращает html шаблон игры типа2: `Угадайте для каждого изображения фото или рисунок?` (`two-of-two`)
 * с двумя изображениями
 * @param {array} imageUrls
 * @return {string}
 */
const game2View = (imageUrls) => {
  let templateString;
  templateString = imageUrls.map((item, i) => {
    return `<div class="game__option">
              <img src="${item}" alt="Option ${++i}" width="468" height="458">
              <label class="game__answer game__answer--photo">
                <input class="visually-hidden" name="question${i}" type="radio" value="photo">
                <span>Фото</span>
              </label>
              <label class="game__answer game__answer--paint">
                <input class="visually-hidden" name="question${i}" type="radio" value="painting">
                <span>Рисунок</span>
              </label>
            </div>`;
  }).join(``);
  return templateString;
};

/**
 * Возвращает html шаблон игры типа1: `Угадай, фото или рисунок?` (`paint-or-photo`) с одним изображением
 * @param {array} imageUrls
 * @return {string}
 */
const game1View = (imageUrls) => {
  let templateString;
  templateString = imageUrls.map((item, i) => {
    return `<div class="game__option">
              <img src="${item}" alt="Option ${++i}" width="705" height="455">
              <label class="game__answer game__answer--photo">
                <input class="visually-hidden" name="question${i}" type="radio" value="photo">
                <span>Фото</span>
              </label>
              <label class="game__answer game__answer--paint">
                <input class="visually-hidden" name="question${i}" type="radio" value="painting">
                <span>Рисунок</span>
              </label>
            </div>`;
  }).join(``);
  return templateString;
};

/**
 * Возвращает html шаблон игры типа3: `Найдите рисунок среди изображений` (`one-of-three`)
 * @param {array} imageUrls
 * @return {string}
 */
const game3View = (imageUrls) => {
  return `
      <div class="game__option">
        <img src="${imageUrls[0]}" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="${imageUrls[1]}" alt="Option 2" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="${imageUrls[2]}" alt="Option 3" width="304" height="455">
      </div>`;
};

/**
 * Return template string for rendering, depending on game type
 * @param {object} game
 * @return {string}
 */
const getGameView = (game) => {
  // создадим массив url'ов картинок
  let imageUrls = game.answers.map((element) => {
    return element.image.url;
  });
  switch (game.type) {
    case `paint-or-photo`:
      // return game1View(imageUrls);
      return `<form class="game__content  game__content--wide">${game1View(imageUrls)}</form>`;
    case `two-of-two`:
      // return game2View(imageUrls);
      return `<form class="game__content">${game2View(imageUrls)}</form>`;
    case `one-of-three`:
      return `<form class="game__content  game__content--triple">${game3View(imageUrls)}</form>`;
    default:
      return new Error(`Не удалось, сформировать шаблон игры.`);
  }
};

export {getGameView};

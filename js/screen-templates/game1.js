/**
 * Экран <!-- Игровой экран с двумя изображениями -->
 */

import {createDomElement, changeScreen} from '../utils';
import footerTemplateHtml from "./footer";
import {game2Template, addGame2ScreenLogic} from './game2';
import {goWelcomeScreen} from './button-back-html';
import {headerTemplate} from "./header";

const screenTemplate = `<section class="game">
  <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
  <form class="game__content">
  <div class="game__option">
  <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
  <label class="game__answer game__answer--photo">
  <input class="visually-hidden" name="question1" type="radio" value="photo">
  <span>Фото</span>
  </label>
  <label class="game__answer game__answer--paint">
  <input class="visually-hidden" name="question1" type="radio" value="paint">
  <span>Рисунок</span>
  </label>
  </div>
  <div class="game__option">
  <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
  <label class="game__answer  game__answer--photo">
  <input class="visually-hidden" name="question2" type="radio" value="photo">
  <span>Фото</span>
  </label>
  <label class="game__answer  game__answer--paint">
  <input class="visually-hidden" name="question2" type="radio" value="paint">
  <span>Рисунок</span>
  </label>
  </div>
  </form>
  <ul class="stats">
  <li class="stats__result stats__result--wrong"></li>
  <li class="stats__result stats__result--slow"></li>
  <li class="stats__result stats__result--fast"></li>
  <li class="stats__result stats__result--correct"></li>
  <li class="stats__result stats__result--unknown"></li>
  <li class="stats__result stats__result--unknown"></li>
  <li class="stats__result stats__result--unknown"></li>
  <li class="stats__result stats__result--unknown"></li>
  <li class="stats__result stats__result--unknown"></li>
  <li class="stats__result stats__result--unknown"></li>
  </ul>
</section>`;

const game1Template = createDomElement(`div`, headerTemplate + screenTemplate + footerTemplateHtml); // todo refactor game1DOM?

const formGame = game1Template.querySelector(`.game__content`);

/**
 * Функция запускающая логику экрана game1.
 */
const addGame1ScreenLogic = () => {
  // обработчик на стрелку назад
  goWelcomeScreen();

  /**
   * Обработчики:
   * Если чекнуто 2 радиобатона из 4х, то переключаемся на следующий экран
   */
  formGame.addEventListener(`change`, () => {
    const answerCheckBoxes = document.querySelectorAll(`input:checked`); // выбрать все чекнутые  type="radio"
    if (answerCheckBoxes.length > 1) {
      changeScreen(game2Template);
      addGame2ScreenLogic();
    }
  });
};

export {game1Template, addGame1ScreenLogic};

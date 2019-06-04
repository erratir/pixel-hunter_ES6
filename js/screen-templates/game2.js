/**
 * Экран <!-- Игровой экран с одним изображением  -->
 */

import {createDomElement, changeScreen} from '../utils';
import footerTemplateHtml from "./footer";
import {game3Template, addGame3ScreenLogic} from './game3';
import {buttonBackHtml, goWelcomeScreen} from './button-back-html';

const templateHtml = `<header class="header">
    ${buttonBackHtml}
    <div class="game__timer">NN</div>
    <div class="game__lives">
      <img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">
      <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
      <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
    </div>
  </header>
  <section class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="http://placehold.it/705x455" alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <ul class="stats">
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--correct"></li>
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--unknown"></li>
    </ul>
</section>
  ${footerTemplateHtml}`;

const game2Template = createDomElement(`div`, templateHtml);

/**
 * Функция запускающая логику экрана game2.
 */
const addGame2ScreenLogic = () => {
  // обработчик на стрелку назад
  goWelcomeScreen();

  /**
   * Обработчики:
   * Если чекнут хотябы 1 радтобатон, то переключаемся на следующий экран
   */
  const formGame = game2Template.querySelector(`.game__content`);
  formGame.addEventListener(`change`, () => {
    const answerCheckBoxes = document.querySelectorAll(`input:checked`); // выбрать все чекнутые  type="radio"
    if (answerCheckBoxes.length > 0) {
      changeScreen(game3Template);
      addGame3ScreenLogic();
    }
  });
};

export {game2Template, addGame2ScreenLogic};

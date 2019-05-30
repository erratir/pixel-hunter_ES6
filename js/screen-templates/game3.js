/**
 * Экран <!-- Игровой экран с тремя изображениями  -->
 */

import {createDomElement, changeScreen} from '../utils';
import footerTemplateHtml from "./footer";
import {statTemplate, addStatsScreenLogic} from "./stats";
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
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="http://placehold.it/304x455" alt="Option 2" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 3" width="304" height="455">
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

const game3Template = createDomElement(templateHtml);

/**
 * Функция запускающая логику экрана game3.
 */
const addGame3ScreenLogic = () => {
  // обработчик на стрелку назад
  goWelcomeScreen();

  /**
   * Обработчики:
   * По клику на любом изображении переходим на следующий экран
   */
  const formGame = game3Template.querySelector(`.game__content`);
  formGame.addEventListener(`click`, () => {
    changeScreen(statTemplate);
    addStatsScreenLogic();
  });

};

export {game3Template, addGame3ScreenLogic};

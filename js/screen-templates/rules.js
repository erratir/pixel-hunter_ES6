/**
 * Экран <!-- Правила игры -->
 */

import {createDomElement, changeScreen} from '../utils';
import footerTemplate from './footer';
import {game1Template, addGame1ScreenLogic} from './game1';
import {buttonBack, goWelcomeScreen} from './button-back';

const template = `<header class="header">${buttonBack}</header>
<section class="rules">
  <h2 class="rules__title">Правила</h2>
  <ul class="rules__description">
  <li>Угадай 10 раз для каждого изображения фото
  <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
  <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
  <li>Фотографиями или рисунками могут быть оба изображения.</li>
  <li>На каждую попытку отводится 30 секунд.</li>
  <li>Ошибиться можно не более 3 раз.</li>
  </ul>
  <p class="rules__ready">Готовы?</p>
  <form class="rules__form">
  <input class="rules__input" type="text" placeholder="Ваше Имя" maxlength="20" minlength="3">
  <button class="rules__button  continue" type="submit" disabled>Go!</button>
  </form>
</section>${footerTemplate}`;

export const rulesTemplate = createDomElement(template);

export const addRulesScreenLogic = () => {
  // обработчик на стрелку назад
  goWelcomeScreen();

  const formInput = rulesTemplate.querySelector(`.rules__input`);
  const buttonSubmit = rulesTemplate.querySelector(`.rules__button`);

  formInput.addEventListener(`input`, (evt) => {
    if (formInput.minLength <= evt.target.value.length && evt.target.value.length <= formInput.maxLength) {
      buttonSubmit.removeAttribute(`disabled`);
      buttonSubmit.removeAttribute(`style`);
    } else {
      buttonSubmit.setAttribute(`disabled`, `disabled`);
      formInput.style.borderColor = `red`;
    }
  });

  buttonSubmit.addEventListener(`click`, () => {
    changeScreen(game1Template);
    addGame1ScreenLogic();
  });

};

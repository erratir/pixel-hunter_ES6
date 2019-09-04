// todo fix Circular dependency: js\screens\greeting.js -> js\screens\rules.js -> js\screens\button-back-html.js -> js\screens\greeting.js

import {changeScreen} from '../utils';
import {greetingTemplate, addGreetingScreenLogic} from './greeting';

const buttonBackHtml = `<button class="back">
  <span class="visually-hidden">Вернуться к началу</span>
  <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
  <use xlink:href="img/sprite.svg#arrow-left"></use>
  </svg>
  <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
  <use xlink:href="img/sprite.svg#logo-small"></use>
  </svg>
  </button>`;


/**
 * Вернутся на экран приветствия 'greeting'
 * Ф-я вешает обработчик на лого со стрелкой назад (`.back`)
 */
const goWelcomeScreen = () => {
  const arrowBack = document.querySelector(`.back`);
  arrowBack.addEventListener(`click`, () => {
    changeScreen(greetingTemplate);
    addGreetingScreenLogic();
  });
};

export {buttonBackHtml, goWelcomeScreen};

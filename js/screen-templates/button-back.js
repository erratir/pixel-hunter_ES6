// todo fix Circular dependency: js\screen-templates\greeting.js -> js\screen-templates\rules.js -> js\screen-templates\button-back.js -> js\screen-templates\greeting.js

import {changeScreen} from '../utils';
import {greetingTemplate, addGreetingScreenLogic} from './greeting';

export const buttonBack = `  <button class="back">
  <span class="visually-hidden">Вернуться к началу</span>
  <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
  <use xlink:href="img/sprite.svg#arrow-left"></use>
  </svg>
  <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
  <use xlink:href="img/sprite.svg#logo-small"></use>
  </svg>
  </button>`;

// Вернутся на экран приветствия 'greeting'
export const goWelcomeScreen = () => {
  const arrowBack = document.querySelector(`.back`);
  arrowBack.addEventListener(`click`, () => {
    // todo функция сброса состояний радиобатонов на экранах Game1-3
    changeScreen(greetingTemplate);
    addGreetingScreenLogic();
  });
};

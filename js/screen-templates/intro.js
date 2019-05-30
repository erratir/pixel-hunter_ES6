/**
 * Начальный экран -- Интро --
 */
import {createDomElement, changeScreen} from '../utils';
import footerTemplate from './footer';
import {greetingTemplate, addGreetingScreenLogic} from './greeting';

const template = `<section class="intro">
  <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
</section>${footerTemplate}`;

export const introTemplate = createDomElement(template);

export const addScreenLogic = () => {
  const starButton = introTemplate.querySelector(`.intro__asterisk`);
  starButton.addEventListener(`click`, () => {
    changeScreen(greetingTemplate);
    addGreetingScreenLogic();
  });
};

/**
 * Начальный экран -- Интро --
 */
import {createDomElement, changeScreen} from '../utils';
import footerTemplateHtml from './footer';
import {greetingTemplate, addGreetingScreenLogic} from './greeting';

const templateHtml = `<section class="intro">
  <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
</section>${footerTemplateHtml}`;

const introTemplate = createDomElement(templateHtml);

/**
 * Функция запускающая логику экрана rules.
 */
const addScreenLogic = () => {
  const starButton = introTemplate.querySelector(`.intro__asterisk`);
  starButton.addEventListener(`click`, () => {
    changeScreen(greetingTemplate);
    addGreetingScreenLogic();
  });
};

export {introTemplate, addScreenLogic};

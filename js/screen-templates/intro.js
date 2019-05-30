/**
 * Начальный экран -- Интро --
 */
import {createDomElement, changeScreen} from '../utils';

const template = `<section class="intro">
  <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
</section>`;

export const introTemplate = createDomElement(template);

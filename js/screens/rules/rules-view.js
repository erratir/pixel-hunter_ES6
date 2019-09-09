/**
 * View экрана "Правила игры"
 */

import {RULES} from "../../data/data";
import AbstractView from "../../abstract-view";

export default class RulesView extends AbstractView {
  // language=HTML <header class="header">+++++++++++</header><section class="rules"><header class="header"></header>
  get template() {
    return `<section class="rules">
    <h2 class="rules__title">Правила</h2>
    <ul class="rules__description">
        <li>Угадай ${RULES.levels} раз для каждого изображения фото
            <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
            <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
        <li>Фотографиями или рисунками могут быть оба изображения.</li>
        <li>На каждую попытку отводится ${RULES.gameTime} секунд.</li>
        <li>Ошибиться можно не более ${RULES.lives} раз.</li>
    </ul>
    <p class="rules__ready">Готовы?</p>
    <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя" maxlength="20" minlength="3">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </section>`;
  }

  onNextScreen() {
  }

  bind() {

    /**
     * Обработчики:
     * 1) На поле ввода логина (`.rules__input`). Если ввели значение между minlength="3" и maxlength="20", которые задал в html,
     * то активировать кнопку `Go`, иначе поле ввода логина обвести красной рамкой
     * 2) На кнопку Go (`.rules__button`)  - переключить на следующий экран
     */
    const formInput = this.element.querySelector(`.rules__input`);
    const buttonSubmit = this.element.querySelector(`.rules__button`);

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
      this.onNextScreen();
    });
  }
}

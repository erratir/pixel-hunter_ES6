/** View экрана "Интро" */

import AbstractView from "../../abstract-view";

export default class IntroView extends AbstractView {

  // language=HTML
  get template() {
    return `<section class="intro">
        <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </section>`;
  }
  onNextScreen() {
  }

  /**
   * Метод bind описывает поведение кнопки при нажатии на нее.
   * Не вызывает напрямую действия, которые должны произойти по нажатию на кнопку,
   * а вместо этого вызывает коллбэк onNextScreen(), который будет
   * переопределяться снаружи (паттерн «Слушатель»)
   */
  bind() {
    const starButton = this.element.querySelector(`.intro__asterisk`);
    starButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onNextScreen();
    });
  }
}

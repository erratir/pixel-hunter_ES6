/**  View игры типа3: `Найдите рисунок среди изображений` (`one-of-three`) */

import AbstractView from "../../abstract-view";

export default class extends AbstractView {
  constructor(currentGame) {
    super();
    this._curentGameData = currentGame;
    this._gameQuestion = currentGame.question;
    // создадим массив url'ов картинок
    this._imageUrls = currentGame.answers.map((element) => {
      return element.image.url;
    });
  }

  get template() {
    return `
      <section class="game">
        <p class="game__task">${this._gameQuestion}</p>
        <form class="game__content  game__content--triple">
            <div class="game__option">
                <img src="${this._imageUrls[0]}" alt="Option 1" width="304" height="455">
            </div>
            <div class="game__option  game__option--selected">
                <img src="${this._imageUrls[1]}" alt="Option 2" width="304" height="455">
            </div>
            <div class="game__option">
                <img src="${this._imageUrls[2]}" alt="Option 3" width="304" height="455">
            </div>
        </form>
      </section>`;
  }

  onAnswers() {
  }

  /**
   * Описывает поведение, при клике по картинке
   * Не вызывает напрямую действия, которые должны произойти, а вызывает коллбэк onAnswers(), который будет
   * переопределяться снаружи (паттерн «Слушатель»). В коллбэк передается массив ответов e.g., [painting]
   */
  bind() {
    this._form = this.element.querySelector(`.game__content`);
    this._form.addEventListener(`click`, (evt) => {
      this._answers = [];
      this._answers.push(evt.target.alt);
      this.onAnswers(this._answers);
    });
  }
}

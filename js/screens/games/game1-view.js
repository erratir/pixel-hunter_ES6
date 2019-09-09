/** View игры типа1: `Угадай, фото или рисунок?` (`paint-or-photo`) с одним изображением */
// todo объеденить view game1 & game2 & game3 ?

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
    this._templateString = this._imageUrls.map((item, i) => {
      return `<div class="game__option"><img src="${item}" alt="Option ${++i}" width="705" height="455">
              <label class="game__answer game__answer--photo">
                <input class="visually-hidden" name="question${i}" type="radio" value="photo">
                <span>Фото</span>
              </label>
              <label class="game__answer game__answer--paint">
                <input class="visually-hidden" name="question${i}" type="radio" value="painting">
                <span>Рисунок</span>
              </label></div>`;
    }).join(``);
    return `<section class="game"><p class="game__task">${this._gameQuestion}</p>
      <form class="game__content game__content--wide">${this._templateString}</form></section>`;
  }

  onAnswers() {
  }

  /**
   * Описывает поведение, при выборе всех доступных <input type="radio">
   * Не вызывает напрямую действия, которые должны произойти, а вызывает коллбэк onAnswers(), который будет
   * переопределяться снаружи (паттерн «Слушатель»). В коллбэк передается массив ответов e.g., [painting, photo]
   */
  bind() {
    this._form = this.element.querySelector(`.game__content`);
    this._form.addEventListener(`change`, () => {
      this._checkedRadioList = this.element.querySelectorAll(`input:checked`); // выбрать все чекнутые  type="radio"

      if (this._checkedRadioList.length === this._curentGameData.answers.length) { // если их столько же сколько ответов(картинок) в игре
        this._answers = Array.from(this._checkedRadioList).map((checkBox) => checkBox.value);
        this.onAnswers(this._answers);
      }
    });
  }
}

/** View игры типа1: `Угадай, фото или рисунок?` (`paint-or-photo`) с одним изображением todo объеденить view game1 & game2 & game3 ?*/

import AbstractView from "../../abstract-view";

export default class extends AbstractView {
  constructor(currentGame) {
    super();
    this._currentGameData = currentGame;
    this._gameQuestion = currentGame.question;
    // создадим массив картинок текущей игры
    this._images = currentGame.answers.map((element) => {
      return element.image;
    });
  }

  get template() {
    this._templateString = this._images.map((item, i) => {
      return `<div class="game__option"><img src="${item.url}" alt="Option ${++i}" width=${item.width} height=${item.height}>
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

  onAnswer() {
  }

  /**
   * Описывает поведение, при выборе всех доступных <input type="radio">
   * Не вызывает напрямую действия, которые должны произойти, а вызывает коллбэк onAnswers(), который будет
   * переопределяться снаружи (паттерн «Слушатель»). В коллбэк передается массив ответов e.g., [painting, photo]
   */
  bind() {
    const form = this.element.querySelector(`.game__content`);
    form.addEventListener(`change`, () => {
      const checkedRadioList = this.element.querySelectorAll(`input:checked`); // выбрать все чекнутые  type="radio"

      if (checkedRadioList.length === this._currentGameData.answers.length) { // если их столько же сколько ответов(картинок) в игре
        const answers = Array.from(checkedRadioList).map((checkBox) => checkBox.value);

        // проверяем ответы
        let isCorrect = answers.every((value, i) => value === this._currentGameData.answers[i].type);

        this.onAnswer(isCorrect);
      }
    });
  }
}

/**  View игры типа3: `Найдите рисунок среди изображений` (`one-of-three`) */

import AbstractView from "../../abstract-view";

export default class extends AbstractView {
  constructor(currentGame) {
    super();
    this._currentGameData = currentGame;
    this._gameQuestion = currentGame.question;
    this.correctAnswer = this._gameQuestion.includes(`Найдите фото среди изображений`) ? `photo` : `painting`;
    // создадим массив картинок текущей игры
    this._images = currentGame.answers.map((element) => {
      return element.image;
    });
  }

  // todo сократить шаблон, отдавая по диву на каждый currentGame.answers?
  get template() {
    return `
      <section class="game">
        <p class="game__task">${this._gameQuestion}</p>
        <form class="game__content  game__content--triple">
            <div class="game__option">
                <img src="${this._images[0].url}" alt="Option 1" width=${this._images[0].width} height=${this._images[0].height}>
            </div>
            <div class="game__option  game__option--selected">
                <img src="${this._images[1].url}" alt="Option 2" width=${this._images[1].width} height=${this._images[1].height}>
            </div>
            <div class="game__option">
                <img src="${this._images[2].url}" alt="Option 3" width=${this._images[2].width} height=${this._images[2].height}>
            </div>
        </form>
      </section>`;
  }

  onAnswer() {
  }

  /**
   * Описывает поведение, при клике по картинке
   * Не вызывает напрямую действия, которые должны произойти, а вызывает коллбэк onAnswers(), который будет
   * переопределяться снаружи (паттерн «Слушатель»). В коллбэк передается массив ответов e.g., [painting]
   */
  bind() {
    const form = this.element.querySelector(`.game__content`);
    form.addEventListener(`click`, (evt) => {

      // проверяем ответ
      // const answerStr = evt.target.alt; // e.g. "Option 2"
      // const userAnswerNumber = parseInt(answerStr.slice(-1), 10); // "Option 2".slice(-1) вернет "2"
      // let isCorrect = this._currentGameData.answers[userAnswerNumber - 1].type === this.correctAnswer; // массив с нуля game.answers[0], а ответы с еденицы "Option 1", "Option 2"

      // проверяем ответ
      const answer = this._currentGameData.answers.find((element) => element.image.url === evt.target.src);
      const isCorrect = answer.type === this.correctAnswer;

      this.onAnswer(isCorrect);
    });
  }
}

/**  View игры типа3: `Найдите рисунок среди изображений` (`one-of-three`) */

import AbstractView from "../../abstract-view";

export default class extends AbstractView {
  constructor(currentGame) {
    super();
    this._currentGameData = currentGame;
    this._gameQuestion = currentGame.question;
    this.correctAnswer = `painting`;
    // создадим массив url'ов картинок
    this._imageUrls = currentGame.answers.map((element) => {
      return element.image.url;
    });
  }

  // todo сократить шаблон, отдавая по диву на каждый currentGame.answers?
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

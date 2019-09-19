/** View хеадера. На экранах игр c таймером и жизнями. На статических экранах только кнопка goWelcomeScreen*/
import AbstractView from "../abstract-view";

export default class HeaderView extends AbstractView {
  constructor(state) {
    super();
    if (state) {
      this._isGameHeader = true;
      this._time = state.time;
      this._lives = state.lives;
    }
  }

  get template() {

    this._headerTemplate = ``;

    // language=HTML
    this._buttonBackView = `<button class="back">
        <span class="visually-hidden">Вернуться к началу</span>
        <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
          <use xlink:href="img/sprite.svg#arrow-left"></use>
        </svg>
        <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
          <use xlink:href="img/sprite.svg#logo-small"></use>
        </svg>
      </button>`;

    this._headerTemplate += this._buttonBackView;

    if (this._isGameHeader) {
      this._emptyHeartHtml = `<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`;
      this._fullHeartHtml = `<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`;
      this._gameTimerView = `<div class="game__timer">${this._time}</div>`;

      // [].fill().join(``) заполнить все элементы массива, объеденить в строку
      this._gameLivesView = `<div class="game__lives">
      ${new Array(3 - this._lives).fill(this._emptyHeartHtml).join(``)}
      ${new Array(this._lives).fill(this._fullHeartHtml).join(``)}</div>`;

      this._headerTemplate += this._gameTimerView + this._gameLivesView;
    }

    return `<header class="header">${this._headerTemplate}</header>`;
  }

  onWelcomeScreen() {
  }

  bind() {
    const arrowBack = this.element.querySelector(`.back`);
    arrowBack.addEventListener(`click`, () => {
      this.onWelcomeScreen();
    });
  }

}



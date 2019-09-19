/** View строки статистики. Показывается внизу на экранах игр и экране общей статистики*/
import {RULES} from "../data/data";
import AbstractView from "../abstract-view";

export default class StatStringView extends AbstractView {
  constructor(state) {
    super();
    this._gameState = state;
  }
  get template() {
    this._liStrArr = [];

    /**
     * Формируем массив <li> с нужными классами в зависимости от предыдущих ответов
     * e.g., <li class="stats__result stats__result--CORRECT"></li>   <li class="stats__result stats__result--unknown"></li>
     */
    for (let i = 0; i < RULES.levels; i++) {
      this._liStrArr.push(this._gameState.answers[i] === undefined ? `<li class="stats__result stats__result--unknown"></li>`
        : `<li class="stats__result stats__result--${this._gameState.answers[i]}"></li>`);
    }

    return `<ul class="stats">${this._liStrArr.join(``)}</ul>`;
  }
}

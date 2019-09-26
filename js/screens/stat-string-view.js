/** View строки статистики. Показывается внизу на экранах игр и экране общей статистики*/
import {RULES} from "../data/settings";
import AbstractView from "../abstract-view";

export default class StatStringView extends AbstractView {
  constructor(answers) {
    super();
    this._answers = answers;
  }
  get template() {
    this._liStrArr = [];

    /**
     * Формируем массив <li> с нужными классами в зависимости переданного массива ответов
     * e.g., <li class="stats__result stats__result--CORRECT"></li>   <li class="stats__result stats__result--unknown"></li>
     */
    for (let i = 0; i < RULES.levels; i++) {
      this._liStrArr.push(this._answers[i] ? `<li class="stats__result stats__result--${this._answers[i]}"/>`
        : `<li class="stats__result stats__result--unknown"/>`);
    }

    return `<ul class="stats">${this._liStrArr.join(``)}</ul>`;
  }
}

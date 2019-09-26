/**
 * View экрана общей статистики (все игры текущего пользователя)
 */

import AbstractView from "../../abstract-view";
import GameStatView from "./game-stat-view";
import {calculateStatistic} from "../../data/calc-statistic";

export default class TotalStatView extends AbstractView {
  constructor(userName, userResults) {
    super();

    this.userName = userName;

    userResults.reverse();
    this.title = calculateStatistic(userResults[0]).success ? `Победа!` : `Вы проиграли..`;

    this.allGamesStat = userResults.map((result, index) => {
      return new GameStatView(result, index + 1).template;
    }).join(``);
  }

  /** todo - отображать дату-время прошлых игр? из ответа сервера */
  get template() {
    return `<section class="result">
    <h2 class="result__title">${this.userName}! ${this.title}</h2>
    ${this.allGamesStat}
    </section>`;
  }
}

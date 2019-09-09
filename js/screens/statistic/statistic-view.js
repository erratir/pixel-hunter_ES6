/**
 * View экрана общей статистики
 */

import {RULES} from "../../data/data";
import StatStringView from "../stat-string-view";
import {calculateStatistic} from "../../data/calc-statistic";
import AbstractView from "../../abstract-view";


export default class StatisticView extends AbstractView {
  constructor(state) {
    super();
    this._gameState = state;
    this._statString = new StatStringView(state);
    this._totalResult = calculateStatistic(state);
  }

  /**
   * Возвращает html шаблон страницы статистики с подставленными результатами игры
   * @return {string}
   */
  get template() {
    // language=HTML
    return `<section class="result">
    <h2 class="result__title">${this._totalResult.title}</h2>
    ${this._totalResult.sucsses ?
    `<table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          ${this._statString.template}
        </td>
        <td class="result__points">× 100</td>
        <td class="result__total">${this._totalResult.correctAnswersCount * RULES.answersPoints.correct}</td>
      </tr>
    ${this._totalResult.fastAnswersCount > 0 ? `
      <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${this._totalResult.fastAnswersCount}<span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${this._totalResult.fastAnswersCount * RULES.answersPoints.fast}</td>
      </tr>`
    : ``}
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${this._gameState.lives}<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${this._gameState.lives * RULES.liveBonus}</td>
      </tr>
    ${this._totalResult.slowAnswersCount > 0 ? `
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${this._totalResult.slowAnswersCount}<span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${this._totalResult.slowAnswersCount * RULES.answersPoints.wrong}</td>
        </tr>
    ` : ``}      
      <tr>
        <td colspan="5" class="result__total  result__total--final">${this._totalResult.score}</td>
      </tr>
    </table>` :
    `<table class="result__table">
      <tr>
        <td class="result__number">2.</td>
        <td>
          ${this._statString.template}
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>`}
  </section>`;

  }
}

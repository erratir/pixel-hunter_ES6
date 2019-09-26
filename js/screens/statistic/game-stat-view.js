import {RULES} from "../../data/settings";
import StatStringView from "../stat-string-view";
import {calculateStatistic} from "../../data/calc-statistic";
import AbstractView from "../../abstract-view";

export default class GameStatView extends AbstractView {
  constructor(result, index) {
    super();
    this.index = index;
    this._gameResult = result;
    this._statString = new StatStringView(result.answers);
    this._totalResult = calculateStatistic(result);
  }

  get template() {
    // language=HTML
    // шаблон в случае выигрыша
    if (this._totalResult.success) {
      return `
        <table class="result__table">
          <tr>
              <td class="result__number">${this.index}</td>
              <td colspan="2">${this._statString.template}</td>
              <td class="result__points">× 100</td>
              <td class="result__total">${(this._totalResult.totalAnswersCount - this._totalResult.wrongAnswersCount) * RULES.answersPoints.correct}</td>
          </tr>
          ${this._totalResult.fastAnswersCount > 0 ? `<tr>
            <td></td>
                <td class="result__extra">Бонус за скорость:</td>
                <td class="result__extra">${this._totalResult.fastAnswersCount}<span class="stats__result stats__result--fast"/></td>
                <td class="result__points">× 50</td>
                <td class="result__total">${this._totalResult.fastAnswersCount * (RULES.answersPoints.fast - RULES.answersPoints.correct)}</td>
            </tr>` : ``}
          ${this._gameResult.lives > 0 ? `<tr>
             <td></td>
                <td class="result__extra">Бонус за жизни:</td>
                <td class="result__extra">2 <span class="stats__result stats__result--alive"/></td>
                <td class="result__points">× 50</td>
                <td class="result__total">100</td>
             </tr>` : ``}
          ${this._totalResult.slowAnswersCount > 0 ? `<tr>
             <td></td>
                <td class="result__extra">Штраф за медлительность:</td>
                <td class="result__extra">${this._totalResult.slowAnswersCount}<span class="stats__result stats__result--slow"/></td>
                <td class="result__points">× 50</td>
                <td class="result__total">${this._totalResult.slowAnswersCount * RULES.answersPoints.slow}</td>
             </tr>` : ``}
          <tr>
                <td colspan="5" class="result__total  result__total--final">${this._totalResult.score}</td>
          </tr>
        </table>`;
    }

    // шаблон в случае проигрыша
    return `<table class="result__table">
              <tr>
                <td class="result__number">${this.index}</td>
                <td>${this._statString.template}</td>
                <td class="result__total"/>
                <td class="result__total  result__total--final">fail</td>
              </tr>
            </table>`;
  }
}

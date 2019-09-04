/**
 * Экран <!-- Общая статистика по всем игрокам  -->
 */

import {changeScreen, createDomElement} from '../utils';
import footerTemplateHtml from "./footer";
import {buttonBackHtml, goWelcomeScreen} from './button-back-html';
import {RULES} from "../data/data";
import {statStringTemplate} from "./games-stat-string";
import {calculateStatistic} from "../data/statistic";

/**
 * Возвращает html шаблон страницы статистики с подставленными результатами игры
 * todo дописать функцию после реализации подсчета текущей статистики, таймера, иконок, etc
 * @param {object} state
 * @return {string}
 */
const getStatView = (state) => {
  const totalResult = calculateStatistic(state);
  // language=HTML
  return `
  <section class="result">
    <h2 class="result__title">${totalResult.title}</h2>
    ${totalResult.sucsses ?
    `<table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          ${statStringTemplate(state)}
        </td>
        <td class="result__points">× 100</td>
        <td class="result__total">${totalResult.correctAnswersCount * RULES.answersPoints.correct}</td>
      </tr>
    ${totalResult.fastAnswersCount > 0 ? `
      <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${totalResult.fastAnswersCount}<span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${totalResult.fastAnswersCount * RULES.answersPoints.fast}</td>
      </tr>`
    : ``}
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${state.lives}<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${state.lives * RULES.liveBonus}</td>
      </tr>
    ${totalResult.slowAnswersCount > 0 ? `
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${totalResult.slowAnswersCount}<span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${totalResult.slowAnswersCount * RULES.answersPoints.wrong}</td>
        </tr>
    ` : ``}      
      <tr>
        <td colspan="5" class="result__total  result__total--final">${totalResult.score}</td>
      </tr>
    </table>` :
    `<table class="result__table">
      <tr>
        <td class="result__number">2.</td>
        <td>
          ${statStringTemplate(state)}
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>`}
  </section>`;
};

const renderStatScreen = (stat) => {
  const statTemplate = getStatView(stat);
  const node = createDomElement(`div`, `<header class="header">${buttonBackHtml}</header>` + statTemplate + footerTemplateHtml);
  changeScreen(node);
  goWelcomeScreen();
  // todo resetStat();
};

export {renderStatScreen};

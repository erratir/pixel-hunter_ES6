/**
 * Экран <!-- Общая статистика по всем игрокам  -->
 */

import {changeScreen, createDomElement} from '../utils';
import footerTemplateHtml from "./footer";
import {buttonBackHtml, goWelcomeScreen} from './button-back-html';
import {RULES} from "../data/data";

/**
 *  Returns the total result to display on the statistics page
 * @param {object} state
 * @return {object} result
 */
const resultCalc = (state) => {
  let result = {};
  result.sucsses = state.getCountOfAnswers(`wrong`) < RULES.lives;
  result.title = result.sucsses ? `Победа!` : `Вы проиграли..`;
  result.correctAnswersCount = state.getCountOfAnswers(`correct`);
  result.fastAnswersCount = state.getCountOfAnswers(`fast`);
  result.slowAnswersCount = state.getCountOfAnswers(`slow`);
  result.wrongAnswersCount = state.getCountOfAnswers(`wrong`);
  window.console.log(result);
  return result;
};

/**
 * Возвращает html шаблон страницы статистики с подставленными результатами игры
 * todo дописать функцию после реализации подсчета текущей статистики, таймера, иконок, etc
 * @param {object} state
 * @return {string}
 */
const getStatView = (state) => {
  const totalResult = resultCalc(state);
  // language=HTML
  return `
  <section class="result">
    <h2 class="result__title">${totalResult.title}</h2>
    ${totalResult.sucsses ?
    `<table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--unknown"></li>
          </ul>
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
        <td colspan="5" class="result__total  result__total--final">950</td>
      </tr>
    </table>` :
    `<table class="result__table">
      <tr>
        <td class="result__number">2.</td>
        <td>
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--wrong"></li>
          </ul>
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

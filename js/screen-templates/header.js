import {buttonBackHtml} from "./button-back-html";

const emptyHeartHtml = `<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`;
const fullHeartHtml = `<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`;


// [].fill().join(``) заполнить все элементы массива, объеденить в строку

/**
 * Принимает на вход объект описывающий состояние игры, возвращает строку с html кодом для отрисовки header
 * @param {object} state
 * @return {string}
 */
const headerTemplate = (state) => {
  return `<header class="header">
  ${buttonBackHtml}
  <div class="game__timer">${state.time}</div>
  <div class="game__lives">
  ${new Array(3 - state.lives).fill(emptyHeartHtml).join(``)}
  ${new Array(state.lives).fill(fullHeartHtml).join(``)}
  </div>
  </header>`;
};

export {headerTemplate};

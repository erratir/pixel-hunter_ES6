import {buttonBackHtml} from "./button-back-html";
import {INITIAL_STATE} from "../data/data";

const emptyHeartHtml = `<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`;
const fullHeartHtml = `<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`;


// [].fill().join(``) заполнить все элементы массива, объеденить в строку
const headerTemplate = `<header class="header">
  ${buttonBackHtml}
  <div class="game__timer">${INITIAL_STATE.time}</div>
  <div class="game__lives">
  ${new Array(3 - INITIAL_STATE.lives).fill(emptyHeartHtml).join(``)}
  ${new Array(INITIAL_STATE.lives).fill(fullHeartHtml).join(``)}
  </div>
  </header>`;

export {headerTemplate};

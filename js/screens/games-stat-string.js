/** HTML шаблон строки статистики, внизу на экранах игр и экране общей статистики*/
import {RULES} from "../data/data";

const statStringTemplate = (state) => {

  let liStrArr = [];

  /**
   * Формируем массив <li> с нужными классами в зависимости от предыдущих ответов
   * e.g., <li class="stats__result stats__result--correct"></li>   <li class="stats__result stats__result--unknown"></li>
   */
  for (let i = 0; i < RULES.levels; i++) {
    liStrArr.push(state.answers[i] === undefined ? `<li class="stats__result stats__result--unknown"></li>`
      : `<li class="stats__result stats__result--${state.answers[i]}"></li>`);
  }

  return `<ul class="stats">${liStrArr.join(``)}</ul>`;
};

export {statStringTemplate};

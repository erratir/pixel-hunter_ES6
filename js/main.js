'use strict';

(function () {
  const mainNode = document.querySelector(`main.central`);
  // Если шаблоны в html записаны в нужном порядке, можно проще: const screenTemplates = document.querySelectorAll(`template`);
  const screenTemplates = [`greeting`, `rules`, `game-1`, `game-2`, `game-3`, `stats`]
    .map((templateId) => {
      return document.getElementById(`${templateId}`);
    });

  let currentScreen = 0;

  /**
   * Функция переключает текущий экран на step шагов вперед или -step назад
   * @param {number} step (например, может передать значения: -1, -2, 1, 2)
   */
  function showScreen(step = 0) {
    currentScreen += step;
    if (currentScreen > (screenTemplates.length - 1) || currentScreen < 0) {
      currentScreen -= step;
      return;
    }
    // console.log(screenTemplates[currentScreen].id);
    cleanNode(mainNode);
    insertTemplateContent(currentScreen);
  }

  // отобразить экран 0 - `greeting`
  showScreen(0);

  /**
   * Removes all children of DOM node.
   * Удаляет все дочерние элементы, переданного ей DOM узла.
   * @param {Object} node
   */
  function cleanNode(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  /**
   * Insert template content into DOM node (<main> by default).
   * Принимает номер шаблона и вставляет содержимое шаблона в узел DOM (по умолчанию тэг <main>)
   * @param {Number} templateId
   * @param {Object} container
   */
  function insertTemplateContent(templateId, container = mainNode) {
    let templateContent = screenTemplates[templateId].content;
    container.appendChild(templateContent.cloneNode(true));
  }

  /**
   * Обработчик на alt+стрелка(влево или вправо). Запускает переключение экранов
   */
  document.addEventListener(`keydown`, (evt) => {
    if (evt.altKey) {
      if (evt.key === `ArrowRight`) {
        showScreen(1);
      } else if (evt.key === `ArrowLeft`) {
        showScreen(-1);
      }
    }
  });

}());

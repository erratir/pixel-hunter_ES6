'use strict';

(function () {
  const mainNode = document.querySelector(`main.central`);
  // Если шаблоны в html записаны в нужно порядке, можно проще: const screenTemplates = document.querySelectorAll(`template`);
  const screenTemplates = [`greeting`, `rules`, `game-1`, `game-2`, `game-3`, `stats`]
    .map((templateId) => {
      return document.getElementById(`${templateId}`);
    });


  function showScreen(step) {
    cleanNode(mainNode);
    insertTemplateContent(step);
  }

  // отобразить экран 0
  showScreen(5);


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

}());

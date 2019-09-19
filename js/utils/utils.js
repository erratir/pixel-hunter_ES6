const mainNode = document.querySelector(`main.central`);

/**
 * Создает DOM-элемент на основе переданной в виде строки разметки (html кода).
 * Функция принимает на вход строку с разметкой и возвращать DOM-элемент.
 * @param {string} tagName - `div`, `button`, etc
 * @param {string} html
 * @return {HTMLElement}
 */
const createDomElement = (tagName, html) => {
  const template = document.createElement(tagName);
  template.innerHTML = html.trim(); // trim() - удалить пробелы вначале и конце строки
  return template;
};

const clearScreen = (container = mainNode) => {
  container.innerHTML = ``;
};

/**
 * Insert template content into DOM node (<main> by default).
 * Принимает iterableObj of HTMLElements и вставляет содержимое шаблона в узел DOM (по умолчанию тэг <main>)
  * @param {Object} container
  * @param {array} elements - iterableObj of HTMLElements
 */
const show = (container = mainNode, elements) => {
  elements.forEach((element) => container.appendChild(element));
};

const changeView = (...elements) => {
  clearScreen();
  show(mainNode, elements);
};

export {changeView, createDomElement};

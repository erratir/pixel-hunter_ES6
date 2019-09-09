const mainNode = document.querySelector(`main.central`);

// /**
//  * Создает DOM-элемент на основе переданной в виде строки разметки (html кода).
//  * Функция принимает на вход строку с разметкой и возвращать DOM-элемент.
//  * @param {string} tagName - `div`, `button`, etc
//  * @param {string} html
//  * @return {HTMLElement}
//  */
// const createDomElement = (tagName, html) => {
//   const template = document.createElement(tagName);
//   template.innerHTML = html.trim(); // trim() - удалить пробелы вначале и конце строки
//   return template;
// };

const clearScreen = (container = mainNode) => {
  container.innerHTML = ``;
};

/**
 * Insert template content into DOM node (<main> by default).
 * Принимает HTMLElement и вставляет содержимое шаблона в узел DOM (по умолчанию тэг <main>)
 * @param {HTMLElement} element
 * @param {Object} container
 */
const show = (element, container = mainNode) => {
  container.appendChild(element);
};


export {clearScreen, show};

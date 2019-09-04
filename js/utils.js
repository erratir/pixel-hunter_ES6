const mainNode = document.querySelector(`main.central`);

/**
 * Создает DOM-элемент на основе переданной в виде строки разметки (html кода).
 * Функция принимает на вход строку с разметкой и возвращать DOM-элемент.
 * @param {string} tagName - `div`, `button`, etc
 * @param {string} html
 * @return {HTMLElement}
 */
export const createDomElement = (tagName, html) => {
  const template = document.createElement(tagName);
  template.innerHTML = html.trim(); // trim() - удалить пробелы вначале и конце строки
  return template;
};

/**
 * Insert template content into DOM node (<main> by default).
 * Принимает html шаблон и вставляет содержимое шаблона в узел DOM (по умолчанию тэг <main>)
 * @param {HTMLElement} element
 * @param {Object} container
 */
export const changeScreen = (element, container = mainNode) => {
  // let templateContent = template.content;
  // container.appendChild(templateContent.cloneNode(true));
  container.innerHTML = ``;
  container.appendChild(element);
};

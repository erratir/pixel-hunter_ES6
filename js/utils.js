/**
 * Создает DOM-элемент на основе переданной в виде строки разметки (html кода).
 * Функция принимает на вход строку с разметкой и возвращать DOM-элемент.
 * @param {string} html
 * @return {HTMLElement}
 */
export const createDomElement = (html) => {
  const template = document.createElement(`div`);
  template.innerHTML = html.trim(); // trim() - удалить пробелы вначале и конце строки
  return template;
};

// todo Ф-я смены экрана
export const changeScreen = () => {};

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
  }

  /**
   * Возвращает строку, содержащую разметку. Должен быть обязательно переопределён в объектах-наследниках.
   */
  get template() {
    throw new Error(`Template is required`);
  }

  /**
   * Создает DOM-элемент с помощью метода render(), добавляет ему обработчики, с помощью метода bind()
   * и возвращает созданный элемент, соответствующий представлению.
   * Использует ленивые вычисления: элемент создается при первом обращении к геттеру с помощью метода render()
   * @return {HTMLElement}
   */
  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this._render();
    this.bind(this._element);
    return this._element;
  }

  /**
   * Создает DOM-элемент на основе переданной строки разметки (html кода).
   * @param {string} tagName - `div`, `button`, etc
   * @param {string} html
   * @return {HTMLElement}
   */
  _createDomElement(tagName, html) {
    const template = document.createElement(tagName);
    template.innerHTML = html.trim(); // trim() - удалить пробелы вначале и конце строки
    return template;
  }

  /**
   * Cоздает DOM-элемент на основе шаблона, который возвращается геттером template
   * @return {HTMLElement}
   * @private
   */
  _render() {
    return this._createDomElement(`div`, this.template);
  }

  // show() {
  //   show(this.element);
  // }

  /**
   * Добавляет обработчики событий.
   * Метод по умолчанию ничего не делает.
   * Если нужно обработать какое-то событие, то этот метод должен быть переопределён в наследнике с необходимой логикой
   */
  bind() {
    // bind handlers if required
  }

}

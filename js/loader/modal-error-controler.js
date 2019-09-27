// Модальное окно с ошибкой
import ModalErrorView from './modal-error-view';

export default class ModalErrorController {
  constructor(error) {
    this.error = error;
    this.content = new ModalErrorView(error);
  }

  render() {
    document.body.prepend(this.content.element);
  }
}

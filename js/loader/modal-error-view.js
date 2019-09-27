import AbstractView from '../abstract-view';
import App from "../app";

class ModalErrorView extends AbstractView {
  constructor(error) {
    super();
    this.error = error;
  }

  get template() {
    return `
  <section class="modal">
    <div class="modal__inner">
      <h2 class="modal__title">Произошла ошибка!</h2>
      <p class="modal__text modal__text--error">${this.error}</p> <p>Пожалуйста, перезагрузите страницу.</p>
    </div>
  </section>
    `;
  }

  bind() {
    this.element.addEventListener(`click`, () => {
      this.element.remove();
      App.showIntro();
    });
  }
}

export default ModalErrorView;



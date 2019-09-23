import {changeView} from "../../utils/utils";
import IntroView from "./intro-view";
import App from "../../app";

export default class IntroScreen {
  constructor() {
    this.introView = new IntroView();
    this.introView.onNextScreen = IntroScreen._onNextScreen.bind(this);
  }

  show() {
    changeView(this.introView.element);
  }

  spinnerStart() {
    return this.introView.spinnerRotate();
  }

  static _onNextScreen() {
    App.showGreeting();
  }
}

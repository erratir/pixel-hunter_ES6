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
    // splash screen
    const spinnerStop = this.introView.spinnerRotate();
    setTimeout(spinnerStop, 5000);
  }

  static _onNextScreen() {
    App.showGreeting();
  }
}

import GreetingView from "./greeting-view";
import {changeView} from "../../utils/utils";
import FooterView from "../footer-view";
import App from "../../app";


export default class GreetingScreen {
  constructor() {
    this.greetingView = new GreetingView();
    this.footerView = new FooterView();
    this.greetingView.onNextScreen = GreetingScreen._onNextScreen.bind(this);
  }

  show() {
    changeView(this.greetingView.element, this.footerView.element);
  }

  static _onNextScreen() {
    App.showRules();
  }
}

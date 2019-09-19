import RulesView from "./rules-view";
import {changeView} from "../../utils/utils";
import HeaderView from "../header-view";
import FooterView from "../footer-view";
import App from "../../app";

export default class RulesScreen {
  constructor() {
    this.rulesView = new RulesView();
    this.headerView = new HeaderView();
    this.footerView = new FooterView();
    this.rulesView.onNextScreen = RulesScreen._onNextScreen.bind(this);
  }

  show() {
    changeView(this.headerView.element, this.rulesView.element, this.footerView.element);
  }

  static _onNextScreen(userName) {
    App.showGame(userName);
  }

}

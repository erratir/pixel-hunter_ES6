import {changeView} from "../../utils/utils";
import FooterView from "../footer-view";
import TotalStatView from "./total-stat-view";
import HeaderView from "../header-view";
import App from "../../app";


export default class StatScreen {
  constructor(userName, userResults) {

    this.headerView = new HeaderView();
    this.headerView.onWelcomeScreen = StatScreen._onWelcomeScreen.bind(this);

    this.statisticView = new TotalStatView(userName, userResults);
    this.footerView = new FooterView();
  }

  show() {
    changeView(this.headerView.element, this.statisticView.element, this.footerView.element);
  }

  static _onWelcomeScreen() {
    App.showGreeting();
  }

}

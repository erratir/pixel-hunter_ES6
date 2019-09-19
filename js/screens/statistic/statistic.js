import {changeView} from "../../utils/utils";
import StatisticView from "./statistic-view";
import FooterView from "../footer-view";

export default class StatScreen {
  constructor(state) {
    this.statisticView = new StatisticView(state);
    this.footerView = new FooterView();
  }

  show() {
    changeView(this.statisticView.element, this.footerView.element);
  }
}

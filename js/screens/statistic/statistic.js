import {clearScreen, show} from "../../utils/utils";
import StatisticView from "./statistic-view";
import FooterView from "../footer-view";

export default (state) => {

  clearScreen();

  const statisticView = new StatisticView(state);
  show(statisticView.element);
  // todo resetStat();

  const footerView = new FooterView();
  show(footerView.element);

};

import {renderGame} from "../games/games-model";
import RulesView from "./rules-view";

import {clearScreen, show} from "../../utils/utils";
import renderGreeting from "../greeting/greeting";
import HeaderView from "../header-view";
import FooterView from "../footer-view";

export default () => {
  clearScreen();

  const headerView = new HeaderView();
  show(headerView.element);

  headerView.onWelcomeScreen = () => {
    renderGreeting();
  };

  const rulesView = new RulesView();
  show(rulesView.element);

  rulesView.onNextScreen = () => {
    renderGame();
  };

  const footerView = new FooterView();
  show(footerView.element);

};

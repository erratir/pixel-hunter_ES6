import GreetingView from "./greeting-view";
import {clearScreen, show} from "../../utils/utils";
import renderRules from "../rules/rules";
import FooterView from "../footer-view";


export default () => {
  clearScreen();
  const greetingView = new GreetingView();
  show(greetingView.element);

  greetingView.onNextScreen = () => {
    renderRules();
  };

  const footerView = new FooterView();
  show(footerView.element);

};

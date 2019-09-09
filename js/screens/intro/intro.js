import showGreeting from "../greeting/greeting";
import {clearScreen, show} from "../../utils/utils";
import IntroView from "./intro-view";
import FooterView from '../footer-view';

export default () => {

  clearScreen();

  const introView = new IntroView();
  show(introView.element);

  introView.onNextScreen = () => {
    showGreeting();
  };

  const footerView = new FooterView();
  show(footerView.element);

};

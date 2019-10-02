import App from "./app";

// include a polyfill in build (comment out if not needed)
import "core-js/stable"; // needed to polyfill ECMAScript features
import "regenerator-runtime/runtime"; // needed to use transpiled generator functions

App.showIntro();

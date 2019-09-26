import {INITIAL_STATE} from "../../data/settings";

// MODEL
export default class GameModel {
  constructor(userName) {
    this.restart();
    this._state.userName = userName;
  }

  get state() {
    return Object.freeze(this._state);
  }

  get userName() {
    return this._state.userName;
  }

  nextLevel() {
    this._state = changeLevel(this._state, this._state.currentLevel + 1);
  }

  addAnswer(answerType) {
    //  коолекционирует результаты ответа пользователя [CORRECT, SLOW, etc]
    this._state.answers.push(answerType);
  }

  die() {
    this._state = die(this.state);
  }

  restart() {
    // обнулить данные модели
    this._state = Object.assign({}, INITIAL_STATE);
    // Object.assign, не выполняят глубокого копирования (вложенные объекты передаются ссылкой).
    // JSON.parse(JSON.stringify(INITIAL_STATE)) тоже не сработает, так как в объекте есть метод
    // Поэтому либо написать метод для глубокого копирования, либо обнулить влоб:
    this._state.answers = [];
    this._state.gameResult.score = 0;
    this._state.gameResult.success = false;
  }

  isDead() {
    return this._state.lives <= 0;
  }

  tick() {
    this._state = tick(this._state);
  }

  resetTime() {
    this._state = restartTime(this._state);
  }
}

const changeLevel = (state, nextLevel) => {
  if (typeof nextLevel !== `number`) {
    throw new Error(`The level must be a number`);
  }
  if (nextLevel < 0) {
    throw new Error(`Level should not be negative value`);
  }

  return Object.assign({}, state, {
    currentLevel: nextLevel
  });
};

const tick = (state) => {
  state = Object.assign({}, state, {
    time: state.time - 1
  });
  return state;
};

const die = (state) => {
  state = Object.assign({}, state, {
    lives: state.lives - 1
  });
  return state;
};

const restartTime = (state) => {
  state = Object.assign({}, state, {
    time: INITIAL_STATE.time + 1 // + 1 чтобы после 1го тика на экране отобразилось INITIAL_STATE.time
  });
  return state;
};

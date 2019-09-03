import {assert} from 'chai'; // Using Assert style
import {calculateStatistic} from './statistic';
import {INITIAL_STATE} from "./data";

// массив ответов моковые данные

let state = Object.assign({}, INITIAL_STATE);

// let state.answers = [];
// [`correct`, `wrong`, `fast`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`];


describe(`-=== Game Statistic ===-`, () => {
  describe(`If the player answers less than 10 questions, the game is considered not passed and the function should return -1;`, () => {
    it(`should return -1 if answers.length != 10.`, () => {
      state.lives = 3;
      state.answers = [`correct`, `wrong`];
      assert.equal(calculateStatistic(state).score, -1);
      state.answers = [];
      assert.equal(calculateStatistic(state).score, -1);
      state.answers = [`correct`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`];
      assert.equal(calculateStatistic(state).score, -1);
    });
  });
  describe(`If player answered all questions and not fast and not slow, and he had all (3) lives, function should return 1150 points`, () => {
    it(`should return 1150 points`, () => {
      state.answers = [`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`];
      assert.equal(calculateStatistic(state).score, 1150);
    });
    it(`should return 1050 points`, () => {
      state.lives = 1;
      assert.equal(calculateStatistic(state).score, 1050);
    });
    it(`should return 1000 points`, () => {
      state.lives = 0;
      assert.equal(calculateStatistic(state).score, 1000);
    });
    it(`should return 1150 points`, () => {
      state.lives = 3;
      state.answers = [`fast`, `correct`, `correct`, `correct`, `wrong`, `correct`, `correct`, `correct`, `slow`, `correct`];
      assert.equal(calculateStatistic(state).score, 1050);
    });
    it(`should return 250 points`, () => {
      state.lives = 0;
      state.answers = [`wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `slow`, `slow`, `slow`, `slow`, `slow`];
      assert.equal(calculateStatistic(state).score, 250);
    });
  });
  describe(`invalid data`, () => {
    it(`should return -1`, () => {
      state.answers = [`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`];
      state.lives = 22;
      assert.equal(calculateStatistic(state).score, -1);
      state.lives = -999;
      assert.equal(calculateStatistic(state).score, -1);
      state.lives = `string`;
      assert.equal(calculateStatistic(state).score, -1);
      state.lives = true;
      assert.equal(calculateStatistic(state).score, -1);
      state.lives = [3, 2];
      state.answers = `0123456789`;
      assert.equal(calculateStatistic(state).score, -1);
      state.lives = 3;
      state.answers = `qwertyuiop`;
      assert.equal(calculateStatistic(state).score, -1);
      assert.equal(calculateStatistic(1).score, -1);
    });
  });
});

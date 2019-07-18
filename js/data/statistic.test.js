import {assert} from 'chai'; // Using Assert style
import {calculateStatistic} from './statistic';

// массив ответов моковые данные
let answers = [];
// [`correct`, `wrong`, `fast`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`];


describe(`-=== Game Statistic ===-`, () => {
  describe(`If the player answers less than 10 questions, the game is considered not passed and the function should return -1;`, () => {
    it(`should return -1 if answers.length <> 10.`, () => {
      answers = [`correct`, `wrong`];
      assert.equal(calculateStatistic({lives: 3, answers}), -1);
      answers = [];
      assert.equal(calculateStatistic({lives: 3, answers}), -1);
      answers = [`correct`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `wrong`];
      assert.equal(calculateStatistic({lives: 3, answers}), -1);
    });
  });
  describe(`If player answered all questions and not fast and not slow, and he had all (3) lives, function should return 1150 points`, () => {
    it(`should return 1150 points`, () => {
      answers = [`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`];
      assert.equal(calculateStatistic({lives: 3, answers}), 1150);
    });
    it(`should return 1050 points`, () => {
      assert.equal(calculateStatistic({lives: 1, answers}), 1050);
    });
    it(`should return 1000 points`, () => {
      assert.equal(calculateStatistic({lives: 0, answers}), 1000);
    });
    it(`should return 1150 points`, () => {
      answers = [`fast`, `correct`, `correct`, `correct`, `wrong`, `correct`, `correct`, `correct`, `slow`, `correct`];
      assert.equal(calculateStatistic({lives: 3, answers}), 1050);
    });
    it(`should return 250 points`, () => {
      answers = [`wrong`, `wrong`, `wrong`, `wrong`, `wrong`, `slow`, `slow`, `slow`, `slow`, `slow`];
      assert.equal(calculateStatistic({lives: 0, answers}), 250);
    });
  });
  describe(`invalid data`, () => {
    it(`should return -1`, () => {
      answers = [`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`];
      assert.equal(calculateStatistic({lives: 22, answers}), -1);
      answers = `0123456789`;
      assert.equal(calculateStatistic({lives: {3: 2}, answers}), -1);
      answers = `qwertyuiop`;
      assert.equal(calculateStatistic({lives: 3, answers}), -1);
      assert.equal(calculateStatistic({lives: true, answers}), -1);
      assert.equal(calculateStatistic(1), -1);
    });
  });
});

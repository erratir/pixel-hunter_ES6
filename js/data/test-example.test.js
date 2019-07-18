/* eslint-disable no-unused-vars */
/**
 * https://www.chaijs.com
 * https://github.com/chaijs/chai
 * https://www.chaijs.com/api/assert/
 * https://www.chaijs.com/api/bdd/
 *
 */

import {assert, expect} from 'chai';
import chai from 'chai';
const should = chai.should();

// const chai = require(`chai`);
// const assert = chai.assert; // Using Assert style
// const expect = chai.expect; // Using Expect style
// const should = chai.should(); // Using Should style

let foo = `bar`;
let beverages = {tea: [`chai`, `matcha`, `oolong`]};

describe(`Chai style example`, () => {
  describe(`Пробуем стиль assert`, () => {
    it(`Это должно рабоать!`, () => {
      assert.typeOf(foo, `string`); // without optional message
      assert.typeOf(foo, `string`, `foo is a string`); // with optional message
      assert.equal(foo, `bar`, `foo equal \`bar\``);
      assert.lengthOf(foo, 3, `foo\`s value has a length of 3`);
      assert.lengthOf(beverages.tea, 3, `beverages has 3 types of tea`);
    });
  });
  describe(`Пробуем стиль expect`, () => {
    it(`Это должно рабоать!`, () => {
      expect(foo, `foo должна быть строкой`).to.be.a(`string`);
      expect(foo).to.equal(`bar`);
      expect(foo).to.have.lengthOf(3);
      expect(beverages).to.have.property(`tea`).with.lengthOf(3);
      expect([1, 2]).to.be.an(`array`).that.does.not.include(3);
    });
  });
  describe(`Пробуем стиль should`, () => {
    it(`Это должно рабоать!`, () => {
      foo.should.be.a(`string`);
      foo.should.equal(`bar`);
      foo.should.have.lengthOf(3);
      beverages.should.have.property(`tea`).with.lengthOf(3);
    });
  });
});


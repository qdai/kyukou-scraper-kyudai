'use strict';

const chai = require('chai');

const expect = chai.expect;

const departments = ['economics', 'education', 'law', 'literature', 'science'];

const scrapers = require('../lib');

describe('Scraper', () => {
  departments.map(department => {
    it(`expected to support ${department}`, () => {
      expect(scrapers[department]).to.be.a('function');
    });
  });
});
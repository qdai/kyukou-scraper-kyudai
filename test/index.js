'use strict';

const chai = require('chai');

const { expect } = chai;

const departments = [
  'education',
  'law',
  'literature',
  'science'
];

const scrapers = require('../lib');

describe('Scraper', () => {
  departments.forEach(department => {
    it(`expected to support ${department}`, () => {
      expect(scrapers[department]).to.be.a('function');
    });
  });
});

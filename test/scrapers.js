'use strict';

const chai = require('chai');
const chaiShallowDeepEqual = require('chai-shallow-deep-equal');
const nock = require('nock');
const path = require('path');
const requireDir = require('require-dir');
const sinon = require('sinon');

chai.use(chaiShallowDeepEqual);

const { expect } = chai;

const scrapers = requireDir('../lib/scrapers');
const expected = requireDir('./fixtures/scraps');

describe('Scrapers', () => {
  let clock = null;
  before(() => {
    clock = sinon.useFakeTimers(new Date(2019, 3, 1, 12));
    nock('https://www.education.kyushu-u.ac.jp')
      .get('/category/%e3%81%bf%e3%81%aa%e3%81%95%e3%82%93%e3%81%b8/%e4%bc%91%e8%ac%9b/')
      .replyWithFile(200, path.join(__dirname, './fixtures/sources/education.html'));
    nock('http://www.law.kyushu-u.ac.jp')
      .get('/faculty/cancel.php')
      .replyWithFile(200, path.join(__dirname, './fixtures/sources/law.html'));
    nock('https://www2.lit.kyushu-u.ac.jp')
      .get('/~syllabus/cgi-bin/class-schedule-1.cgi')
      .replyWithFile(200, path.join(__dirname, './fixtures/sources/literature.html'));
    nock('https://www.sci.kyushu-u.ac.jp')
      .get('/student/cancel/')
      .replyWithFile(200, path.join(__dirname, './fixtures/sources/science.html'));
  });

  after(() => {
    clock.restore();
    nock.cleanAll();
  });

  Object.keys(scrapers).forEach(department => {
    describe(`/${department}`, () => {
      it(`expected to build events about ${department}`, async () => {
        const events = await scrapers[department]();
        expect(events).to.shallowDeepEqual(expected[department]);
      });
    });
  });
});

describe('Scrapers: no network connection', () => {
  before(() => {
    nock('https://www.education.kyushu-u.ac.jp')
      .get('/category/%e3%81%bf%e3%81%aa%e3%81%95%e3%82%93%e3%81%b8/%e4%bc%91%e8%ac%9b/')
      .replyWithError('network error');
    nock('http://www.law.kyushu-u.ac.jp')
      .get('/kyukou/keiji.cgi')
      .replyWithError('network error');
    nock('https://www2.lit.kyushu-u.ac.jp')
      .get('/~syllabus/cgi-bin/class-schedule.cgi')
      .replyWithError('network error');
    nock('https://www.sci.kyushu-u.ac.jp')
      .get('/student/cancel/cancel.php')
      .replyWithError('network error');
  });

  after(() => nock.cleanAll());

  Object.keys(scrapers).forEach(department => {
    describe(`/${department}`, () => {
      it(`expected to become a fetch error (${department})`, async () => {
        const [err] = await scrapers[department]();
        expect(err.name).to.deep.equal('FetchError');
      });
    });
  });
});

/* global describe, it, before, after */

'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const nock = require('nock');
const path = require('path');

chai.use(chaiAsPromised);

const expect = chai.expect;

const departments = ['economics', 'education', 'law', 'literature', 'science'];

describe('Scrapers', () => {
  before(() => {
    nock('http://www.econ.kyushu-u.ac.jp')
      .get('/student/kyuukou.php')
      .replyWithFile(200, path.join(__dirname, './fixtures/sources/economics.html'));
    nock('http://www.education.kyushu-u.ac.jp')
      .get('/topics/student_index')
      .replyWithFile(200, path.join(__dirname, './fixtures/sources/education.html'));
    nock('http://www.law.kyushu-u.ac.jp')
      .get('/kyukou/keiji.cgi')
      .replyWithFile(200, path.join(__dirname, './fixtures/sources/law.html'));
    nock('http://www2.lit.kyushu-u.ac.jp')
      .get('/~syllabus/cgi-bin/class-schedule.cgi')
      .replyWithFile(200, path.join(__dirname, './fixtures/sources/literature.html'));
    nock('http://www.sci.kyushu-u.ac.jp')
      .get('/home/cancel/cancel.php')
      .replyWithFile(200, path.join(__dirname, './fixtures/sources/science.html'));
  });

  after(() => nock.cleanAll());

  departments.forEach(department => {
    describe('/' + department, () => {
      it('expected to build events about ' + department, () => {
        const promise = require('../lib/scrapers/' + department)();
        const expected = require('./fixtures/scraps/' + department);
        return expect(promise).to.become(expected);
      });
    });
  });
});

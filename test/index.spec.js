'use strict';

const nock = require('nock');
const path = require('path');
const scrapers = require('../lib');

describe('scrapers', () => {
  beforeAll(() => {
    jest.useFakeTimers({ advanceTimers: true });
    jest.setSystemTime(new Date(2019, 3, 1, 12));
    nock('https://www.education.kyushu-u.ac.jp')
      .get('/category/%e3%81%bf%e3%81%aa%e3%81%95%e3%82%93%e3%81%b8/%e4%bc%91%e8%ac%9b/')
      .replyWithFile(200, path.join(__dirname, './__fixtures__/education.html'))
      .get('/category/%e3%81%bf%e3%81%aa%e3%81%95%e3%82%93%e3%81%b8/%e4%bc%91%e8%ac%9b/')
      .replyWithError('network error');
    nock('http://www.law.kyushu-u.ac.jp')
      .get('/faculty/cancel.php')
      .replyWithFile(200, path.join(__dirname, './__fixtures__/law.html'))
      .get('/kyukou/keiji.cgi')
      .replyWithError('network error');
    nock('https://www2.lit.kyushu-u.ac.jp')
      .get('/~syllabus/cgi-bin/class-schedule-1.cgi')
      .replyWithFile(200, path.join(__dirname, './__fixtures__/literature.html'))
      .get('/~syllabus/cgi-bin/class-schedule.cgi')
      .replyWithError('network error');
    nock('https://www.sci.kyushu-u.ac.jp')
      .get('/student/cancel/')
      .replyWithFile(200, path.join(__dirname, './__fixtures__/science.html'))
      .get('/student/cancel/cancel.php')
      .replyWithError('network error');
  });

  afterAll(() => {
    jest.useRealTimers();
    nock.cleanAll();
  });

  describe.each(Object.keys(scrapers))('/%s', department => {
    it(`expected to build events about ${department}`, async () => {
      expect.assertions(1);
      const events = await scrapers[department]();
      expect(events).toMatchSnapshot();
    });

    it(`expected to become a fetch error (${department})`, async () => {
      expect.assertions(1);
      const [err] = await scrapers[department]();
      expect(err.name).toBe('FetchError');
    });
  });
});

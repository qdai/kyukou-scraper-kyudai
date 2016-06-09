'use strict';

const fetch = require('../utils/fetch');
const normalizeText = require('../utils/normalizetext');
const parseDate = require('../utils/parse-date');

module.exports = () => {
  const baseURL = 'http://www.education.kyushu-u.ac.jp';
  const resourcePath = '/topics/student_index';
  return fetch(baseURL + resourcePath).then($ => $('#news dd').map((i, el) => {
    const $item = $(el);
    const data = {};
    const raw = normalizeText($item.find('.text').text());
    try {
      // format data
      data.raw = raw;
      if (!/休講|補講|講義室変更/.test(raw)) {
        return undefined;
      }
      data.about = raw.match(/【(\S*)】/)[1];
      data.link = baseURL + ($item.find('a').attr('href') || resourcePath);
      data.eventDate = parseDate(raw, 'M月D日', raw.match(/日\s*\((\S)\)/)[1]);
      data.pubDate = parseDate($item.find('.date').text(), 'YYYY/MM/DD');
      data.period = raw.match(/\)\s*(\S*)限/)[1];
      data.period = data.period.replace('時', '');
      data.department = '教育学部';
      data.subject = raw.match(/「(.*)」/)[1];
      data.teacher = raw.match(/」\s*\((.*)教員\)/)[1];
      if (/地区開講/.test(raw)) {
        data.campus = raw.match(/限\s*(\S*)開講/)[1];
      }
      if (/教室/.test(raw)) {
        data.room = raw.match(/教室:(.*)/)[1];
      }
      return data;
    } catch (err) {
      err.message += ` on ${raw.replace(/[\f\n\r]/g, '')}`;
      return err;
    }
  }).toArray());
};

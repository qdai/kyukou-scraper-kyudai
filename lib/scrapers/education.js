'use strict';

const ScrapError = require('../utils/scrap-error');
const fetch = require('../utils/fetch');
const normalizeText = require('../utils/normalize-text');
const parseDate = require('../utils/parse-date');

module.exports = () => {
  const baseURL = 'http://www.education.kyushu-u.ac.jp';
  const resourcePath = '/topics/student_index';
  return fetch(baseURL + resourcePath)
    .then($ => $('#news dd').map((i, el) => {
      const $item = $(el);
      const raw = normalizeText($item.find('.text').text());
      if (!/休講|補講|講義室変更/.test(raw)) {
        return undefined;
      }
      try {
        const data = {
          about: raw.match(/【(\S*)】/)[1],
          department: '教育学部',
          eventDate: parseDate(raw, 'M月D日', raw.match(/日\s*\((\S)\)/)[1]),
          link: baseURL + ($item.find('a').attr('href') || resourcePath),
          period: raw.match(/\)\s*(\S*)限/)[1].replace('時', ''),
          pubDate: parseDate($item.find('.date').text(), 'YYYY/MM/DD'),
          raw,
          subject: raw.match(/「(.*)」/)[1],
          teacher: raw.match(/」\s*\((.*)教員\)/)[1]
        };
        if (/地区開講/.test(raw)) {
          data.campus = raw.match(/限\s*(\S*)開講/)[1];
        }
        if (/教室/.test(raw)) {
          data.room = raw.match(/教室:(.*)/)[1];
        }
        return data;
      } catch (err) {
        return new ScrapError(err.message, raw);
      }
    }).toArray())
    .catch(err => [err]);
};

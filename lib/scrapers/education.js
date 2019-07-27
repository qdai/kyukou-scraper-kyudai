'use strict';

const ScrapError = require('../utils/scrap-error');
const fetch = require('../utils/fetch');
const normalizeText = require('../utils/normalize-text');
const parseDate = require('../utils/parse-date');

module.exports = async () => {
  const baseURL = 'http://www.education.kyushu-u.ac.jp';
  const resourcePath = '/topics/student_index';
  try {
    const $ = await fetch(baseURL + resourcePath);
    const events = $('#news dd').map((i, el) => {
      const $item = $(el);
      const raw = normalizeText($item.find('.text').text());
      if (!/休講|補講|講義室変更/u.test(raw)) {
        return undefined;
      }
      try {
        const data = {
          about: raw.match(/【(?<about>\S*)】/u).groups.about,
          department: '教育学部',
          eventDate: parseDate(raw, 'M月D日', raw.match(/日\s*\((?<date>\S)\)/u).groups.date),
          link: baseURL + ($item.find('a').attr('href') || resourcePath),
          period: raw.match(/\)\s*(?<period>\S*)限/u).groups.period.replace('時', ''),
          pubDate: parseDate($item.find('.date').text(), 'YYYY/MM/DD'),
          raw,
          subject: raw.match(/「(?<subject>.*)」/u).groups.subject,
          teacher: raw.match(/」\s*\((?<teacher>.*)教員\)/u).groups.teacher
        };
        if (/地区開講/u.test(raw)) {
          data.campus = raw.match(/限\s*(?<campus>\S*)開講/u).groups.campus;
        }
        if (/教室/u.test(raw)) {
          data.room = raw.match(/教室:(?<room>.*)/u).groups.room;
        }
        return data;
      } catch (err) {
        return new ScrapError(err.message, raw);
      }
    }).toArray();
    return events;
  } catch (err) {
    return [err];
  }
};

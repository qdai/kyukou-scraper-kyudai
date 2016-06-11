'use strict';

const fetch = require('../utils/fetch');
const normalizeText = require('../utils/normalize-text');
const parseDate = require('../utils/parse-date');

module.exports = () => {
  const resourceURL = 'http://www2.lit.kyushu-u.ac.jp/~syllabus/cgi-bin/class-schedule.cgi';
  return fetch(resourceURL).then($ => $('table tr:first-child table tr:not(:first-child)').map((i, el) => {
    const $item = $(el);
    const raw = $item.text();
    const periodAndSubject = normalizeText($item.find(':nth-child(3)').text());
    try {
      return {
        raw,
        about: $item.find(':nth-child(2)').text().replace(/\s*/g, ''),
        link: resourceURL,
        eventDate: parseDate(normalizeText($item.find('[nowrap]').text()), 'YYYY年M月D日'),
        pubDate: parseDate(normalizeText($item.find(':nth-child(6)').text()), 'YYYY年M月D日h時m分'),
        period: periodAndSubject.match(/.*曜(\d*)限/)[1],
        department: '文学部',
        subject: periodAndSubject.match(/限\s*(.*)$/)[1],
        teacher: $item.find(':nth-child(4)').text().replace(/\s*/g, ''),
        note: $item.find(':nth-child(5)').text().replace(/\s*/g, '')
      };
    } catch (err) {
      err.message += ` on ${raw.replace(/[\f\n\r]/g, '')}`;
      return err;
    }
  }).toArray());
};

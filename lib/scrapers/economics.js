'use strict';

const fetch = require('../utils/fetch');
const normalizeText = require('../utils/normalizetext');
const parseDate = require('../utils/parse-date');

module.exports = () => {
  const baseURL = 'http://www.econ.kyushu-u.ac.jp';
  const resourcePath = '/student/kyuukou.php';
  return fetch(baseURL + resourcePath).then($ => $('.box01 tr[bgcolor="#FFFFFF"]').map((i, el) => {
    const $item = $(el);
    const data = {};
    const raw = normalizeText($item.find('td[align="left"]').text()).replace(/、|，/g, ',');
    try {
      // format data
      data.raw = raw;
      if (!/休講/.test(raw) && !/補講/.test(raw)) {
        return undefined;
      }
      data.about = raw.match(/[【|○](\S*)[】|○]/)[1];
      data.link = baseURL + ($item.find('a').attr('href') || resourcePath);
      data.eventDate = parseDate(raw, 'M月D日', raw.match(/日\s*\((\S)\)/)[1]);
      data.pubDate = parseDate($item.find('td[align="left"] + td[align="center"]').text());
      data.period = /時限/.test(raw) ? raw.match(/\)\s*(\S*)時限/)[1] : raw.match(/\)\s*(.*)(学部|学府)/)[1].trim();
      data.department = '経済学部';
      data.subject = raw.match(/「(.*)」/)[1];
      data.teacher = raw.match(/」\s*\((.*)教員\)/)[1];
      if (/教室:/.test(raw)) {
        data.room = raw.match(/教室:(.*)/)[1];
      }
      return data;
    } catch (err) {
      err.message += ` on ${raw.replace(/[\f\n\r]/g, '')}`;
      return err;
    }
  }).toArray());
};

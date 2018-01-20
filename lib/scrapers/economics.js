'use strict';

const ScrapError = require('../utils/scrap-error');
const fetch = require('../utils/fetch');
const normalizeText = require('../utils/normalize-text');
const parseDate = require('../utils/parse-date');

module.exports = async () => {
  const baseURL = 'http://www.econ.kyushu-u.ac.jp';
  const resourcePath = '/student/kyuukou.php';
  try {
    const $ = await fetch(baseURL + resourcePath);
    const events = $('.box01 tr[bgcolor="#FFFFFF"]').map((i, el) => {
      const $item = $(el);
      const raw = normalizeText($item.find('td[align="left"]').text()).replace(/、|，/g, ',');
      if (!/休講/.test(raw) && !/補講/.test(raw)) {
        return undefined;
      }
      try {
        const data = {
          about: raw.match(/[【|○](\S*)[】|○]/)[1],
          department: '経済学部',
          eventDate: parseDate(raw, 'M月D日', raw.match(/日\s*\((\S)\)/)[1]),
          link: baseURL + ($item.find('a').attr('href') || resourcePath),
          period: /時限/.test(raw) ? raw.match(/\)\s*(\S*)時限/)[1] : raw.match(/\)\s*(.*)(学部|学府)/)[1].trim(),
          pubDate: parseDate($item.find('td[align="left"] + td[align="center"]').text()),
          raw,
          subject: raw.match(/「(.*)」/)[1],
          teacher: raw.match(/」\s*\((.*)教員\)/)[1]
        };
        if (/教室:/.test(raw)) {
          [, data.room] = raw.match(/教室:(.*)/);
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

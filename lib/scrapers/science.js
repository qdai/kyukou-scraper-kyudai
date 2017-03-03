'use strict';

const ScrapError = require('../utils/scrap-error');
const fetch = require('../utils/fetch');
const normalizeText = require('../utils/normalize-text');
const parseDate = require('../utils/parse-date');

module.exports = () => {
  const baseURL = 'http://www.sci.kyushu-u.ac.jp';
  const linkURL = `${baseURL}/index.php?type=0&sel1=11&sel2=0`;
  const resourceURL = `${baseURL}/home/cancel/cancel.php`;
  return fetch(resourceURL)
    .then($ => {
      const items = $('table table table td table[width="100%"] tr td').text();
      /* istanbul ignore if */
      if (!items) {
        return [];
      }
      return normalizeText(items).replace(/^\[\[/, '').split('[[ ').map(item => {
        const raw = `[[ ${item.trim()}`;
        try {
          const data = {
            about: raw.match(/\[\[\s(\S*)\s]]/)[1],
            department: `理学部${raw.match(/学科:(\S*)\s*学年/)[1]}`,
            eventDate: parseDate(raw, 'M月D日', raw.match(/日\s*\((\S)\)/)[1]),
            link: linkURL,
            period: raw.match(/\)\s*(\S*)時限/)[1],
            raw,
            subject: raw.match(/科目:(.*)\(担当/)[1].trim(),
            teacher: raw.match(/担当:(.*)\)/)[1].trim()
          };
          if (/教室:/.test(raw)) {
            data.room = raw.match(/教室:(.*)/)[1].trim();
          }
          if (/連絡事項:/.test(raw)) {
            data.note = raw.match(/連絡事項:([\s\S]*)/)[1].trim();
          }
          return data;
        } catch (err) {
          return new ScrapError(err.message, raw);
        }
      });
    })
    .catch(err => [err]);
};

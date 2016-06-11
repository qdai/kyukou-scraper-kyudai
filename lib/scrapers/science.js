'use strict';

const fetch = require('../utils/fetch');
const normalizeText = require('../utils/normalize-text');
const parseDate = require('../utils/parse-date');

module.exports = () => {
  const baseURL = 'http://www.sci.kyushu-u.ac.jp';
  const linkURL = `${baseURL}/index.php?type=0&sel1=11&sel2=0`;
  const resourceURL = `${baseURL}/home/cancel/cancel.php`;
  return fetch(resourceURL).then($ => {
    const items = $('table table table td table[width="100%"] tr td').text();
    /* istanbul ignore if */
    if (!items) {
      return [];
    }
    return normalizeText(items).replace(/^\[\[/, '').split('[[ ').map(item => {
      const raw = `[[ ${item.trim()}`;
      try {
        const data = {
          raw,
          about: raw.match(/\[\[\s(\S*)\s\]\]/)[1],
          link: linkURL,
          eventDate: parseDate(raw, 'M月D日', raw.match(/日\s*\((\S)\)/)[1]),
          period: raw.match(/\)\s*(\S*)時限/)[1],
          department: `理学部${raw.match(/学科:(\S*)\s*学年/)[1]}`,
          subject: raw.match(/科目:(\S*.*\S)\s*\(担当/)[1].replace(/\s/g, ''),
          teacher: raw.match(/担当:(.*)\)/)[1].replace(/\s/g, '')
        };
        if (/連絡事項:/.test(raw)) {
          data.note = raw.match(/連絡事項:(\S*)/)[1];
        }
        if (/教室:/.test(raw)) {
          data.room = raw.match(/教室:(\S*)/)[1];
        }
        return data;
      } catch (err) {
        err.message += ` on ${raw.replace(/[\f\n\r]/g, '')}`;
        return err;
      }
    });
  });
};

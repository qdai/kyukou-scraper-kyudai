'use strict';

const moment = require('moment');

const fetch = require('../utils/fetch');
const isValidDate = require('../utils/isvaliddate');
const normalizeText = require('../utils/normalizetext');

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
      const data = {};
      const raw = `[[ ${item.trim()}`;
      try {
        data.raw = raw;
        data.about = raw.match(/\[\[\s(\S*)\s\]\]/)[1];
        data.link = linkURL;
        const eventDate = moment(raw, 'M月D日');
        if (isValidDate(eventDate, raw.match(/日\s*\((\S)\)/)[1])) {
          data.eventDate = eventDate.toDate();
        } else {
          throw new Error('Invalid eventDate');
        }
        data.period = raw.match(/\)\s*(\S*)時限/)[1];
        data.department = `理学部${raw.match(/学科:(\S*)\s*学年/)[1]}`;
        data.subject = raw.match(/科目:(\S*.*\S)\s*\(担当/)[1].replace(/\s/g, '');
        data.teacher = raw.match(/担当:(.*)\)/)[1].replace(/\s/g, '');
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

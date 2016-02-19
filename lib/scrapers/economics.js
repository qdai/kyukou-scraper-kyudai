'use strict';

const moment = require('moment');

const fetch = require('../utils/fetch');
const isValidDate = require('../utils/isvaliddate');
const normalizeText = require('../utils/normalizetext');

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
      const eventDate = moment(raw, 'M月D日');
      if (isValidDate(eventDate, raw.match(/日\s*\((\S)\)/)[1])) {
        data.eventDate = eventDate.toDate();
      } else {
        throw new Error('Invalid eventDate');
      }
      data.pubDate = moment($item.find('td[align="left"] + td[align="center"]').text()).toDate();
      data.period = /時限/.test(raw) ? raw.match(/\)\s*(\S*)時限/)[1] : raw.match(/\)\s*(.*)(学部|学府)/)[1].trim();
      data.department = '経済学部';
      data.subject = raw.match(/「(.*)」/)[1];
      data.teacher = raw.match(/」\s*\((.*)教員\)/)[1];
      if (/教室:/.test(raw)) {
        data.room = raw.match(/教室:(.*)/)[1];
      }
      return data; // eslint-disable-line consistent-return
    } catch (err) {
      err.message += ` on ${raw.replace(/[\f\n\r]/g, '')}`;
      return err; // eslint-disable-line consistent-return
    }
  }).toArray());
};

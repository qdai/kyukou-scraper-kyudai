'use strict';

const ScrapError = require('../utils/scrap-error');
const fetch = require('../utils/fetch');
const normalizeText = require('../utils/normalize-text');
const parseDate = require('../utils/parse-date');

module.exports = async () => {
  const resourceURL = 'https://www.sci.kyushu-u.ac.jp/student/cancel/cancel.php';
  try {
    const $ = await fetch(resourceURL);
    const events = $('.sub-contents .cancel-wrapper').map((i, el) => {
      const $item = $(el);
      const dateAndPeriod = normalizeText($item.find('.cancel-date').text());
      const raw = normalizeText($item.text().trim());
      try {
        const data = {
          about: normalizeText($item.find('.cancel-title').text()),
          department: `理学部${normalizeText($item.find('.cancel-department').text()).match(/\((\S*) /)[1]}`,
          eventDate: parseDate(dateAndPeriod, 'YYYY年M月D日'),
          link: resourceURL,
          period: dateAndPeriod.match(/\)\s*(\d*)時限/)[1],
          raw,
          subject: normalizeText($item.find('.cancel-subject').text())
        };
        $item.find('.cancel-text').map((j, textEl) => { // eslint-disable-line array-callback-return
          const text = normalizeText($(textEl).text());
          if (/^担当:/.test(text)) {
            data.teacher = text.replace(/^担当:/, '').trim();
          }
          if (/^教室:/.test(text)) {
            data.room = text.replace(/^教室:/, '').trim();
          }
        });
        const note = normalizeText($item.find('.cancel-note').text());
        if (note) {
          data.note = note.replace(/^連絡事項:/, '').trim();
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

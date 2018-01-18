'use strict';

const ScrapError = require('../utils/scrap-error');
const fetch = require('../utils/fetch');
const normalizeText = require('../utils/normalize-text');
const parseDate = require('../utils/parse-date');

module.exports = async () => {
  const resourceURL = 'http://www.law.kyushu-u.ac.jp/faculty/cancel.php';
  try {
    const $ = await fetch(resourceURL);
    const events = $('#contents table.cancel tr:not(:first-child)').map((i, el) => {
      const $item = $(el);
      const raw = $item.text();
      try {
        const data = {
          about: normalizeText($item.find('.reason').text()),
          department: '法学部',
          eventDate: parseDate(normalizeText($item.find('.canceldate').text()), 'M月D日'),
          link: resourceURL,
          note: normalizeText($item.find(':nth-child(6)').text()),
          period: normalizeText($item.find('.canceldate').text()).match(/(\d+)限/)[1],
          pubDate: parseDate(normalizeText($item.find('.writedate').text()), 'M月D日'),
          raw,
          subject: normalizeText($item.find('.subject').text()).replace(/\(補講\)$/, ''),
          teacher: normalizeText($item.find('.author').text())
        };
        if (data.about === '公務' || data.about === 'その他') {
          if (/\(補講\)$/.test($item.find('.subject').text())) {
            data.about = '補講';
          }
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

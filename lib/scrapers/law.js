'use strict';

const ScrapError = require('../utils/scrap-error');
const fetch = require('../utils/fetch');
const normalizeText = require('../utils/normalize-text');
const parseDate = require('../utils/parse-date');

module.exports = () => {
  const resourceURL = 'http://www.law.kyushu-u.ac.jp/kyukou/keiji.cgi';
  return fetch(resourceURL).then($ => $('.article-main [style="height: 600px; overflow: auto;"] table tr:not(:first-child)').map((i, el) => {
    const $item = $(el);
    const raw = $item.text();
    try {
      const data = {
        about: $item.find(':nth-child(6)').text().replace(/\s*/g, ''),
        department: '法学部',
        eventDate: parseDate(normalizeText($item.find(':nth-child(2)').text()).replace(/\(.*/, ''), 'YYYY年M月D日'),
        link: resourceURL,
        note: $item.find(':nth-child(7)').text().replace(/\s*/g, ''),
        period: normalizeText($item.find(':nth-child(2)').text()).replace(/・/g, '').replace(/.*曜|限.*/g, ''),
        pubDate: parseDate(normalizeText($item.find(':nth-child(5)').text()), 'YYYY年M月D日h時m分'),
        raw,
        subject: normalizeText($item.find(':nth-child(3)').text()).replace(/\(補講\)$/, '').replace(/U/g, 'II'),
        teacher: $item.find(':nth-child(4)').text().replace(/\s*/g, '')
      };
      if (data.about === '公務' || data.about === 'その他') {
        if (/\(補講\)$/.test($item.find(':nth-child(3)').text())) {
          data.about = '補講';
        }
      }
      return data;
    } catch (err) {
      return new ScrapError(err.message, raw);
    }
  }).toArray());
};

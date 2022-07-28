'use strict';

const moment = require('moment');

const ScrapError = require('../lib/utils/scrap-error');
const fetch = require('../lib/utils/fetch');
const isValidDate = require('../lib/utils/is-valid-date');
const nock = require('nock');
const normalizeText = require('../lib/utils/normalize-text');
const parseDate = require('../lib/utils/parse-date');

describe('utils', () => {
  describe('./ScrapError', () => {
    it('is expected to create ScrapError', () => {
      const message = 'scrap error';
      const err = new ScrapError(message);
      expect(err.name).toBe('ScrapError');
      expect(err.message).toStrictEqual(message);
    });
  });

  describe('/fetch', () => {
    beforeAll(() => {
      nock('http://example.com')
        .get('/ok')
        .reply(200, 'ok')
        .get('/not-found')
        .reply(404, 'not-found');
    });

    it('expected to return parsed web page', async () => {
      expect.assertions(1);
      const $ = await fetch('http://example.com/ok');
      expect($().cheerio).toBe('[cheerio object]');
    });
    it('expected to be rejected', async () => {
      expect.assertions(1);
      const promise = fetch('http://example.com/not-found');
      await expect(promise).rejects.toThrow(/404/u);
    });
  });

  describe('/isValidDate', () => {
    beforeAll(() => {
      moment.locale('ja');
    });

    it('expected to return true when day is valid', () => {
      const baseDate = moment();
      const days = moment.weekdaysMin();
      for (let i = 0; i < 7; i++) {
        const date = moment(baseDate).add(i, 'days');
        for (let j = 0; j < 7; j++) {
          expect(isValidDate(date.toDate(), days[j])).toBe(j === date.day());
        }
      }
    });
  });

  describe('/normalizeText', () => {
    it('expected to trim leading space and trailing space', () => {
      expect(normalizeText('  abc  ')).toBe('abc');
      expect(normalizeText('　　abc　　')).toBe('abc');
    });

    it('expected to replace ideographic space with space', () => {
      expect(normalizeText('a　b　c')).toBe('a b c');
    });

    it('expected to replace fullwidth char with halfwidth char', () => {
      const fullwidth = '！＂＃＄％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［＼］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝～';
      const halfwidth = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
      expect(normalizeText(fullwidth)).toStrictEqual(halfwidth);
    });
  });

  describe('/parseDate', () => {
    it('expected to parse date', () => {
      expect(parseDate('2016年6月9日', 'YYYY年M月D日')).toStrictEqual(new Date('2016-06-08T15:00:00Z'));
      expect(parseDate('2016年6月9日', 'YYYY年M月D日', '木')).toStrictEqual(new Date('2016-06-08T15:00:00Z'));
    });

    it('expected to throw', () => {
      expect(() => parseDate('invalid date', 'YYYY年M月D日')).toThrow(Error);
      expect(() => parseDate('2016年6月9日', 'YYYY年M月D日', '月')).toThrow(Error);
      expect(() => parseDate('2016年6月9日', 'YYYY年M月D日', '火')).toThrow(Error);
      expect(() => parseDate('2016年6月9日', 'YYYY年M月D日', '水')).toThrow(Error);
      expect(() => parseDate('2016年6月9日', 'YYYY年M月D日', '金')).toThrow(Error);
      // eslint-disable-next-line jest/max-expects
      expect(() => parseDate('2016年6月9日', 'YYYY年M月D日', '土')).toThrow(Error);
      // eslint-disable-next-line jest/max-expects
      expect(() => parseDate('2016年6月9日', 'YYYY年M月D日', '日')).toThrow(Error);
    });
  });
});

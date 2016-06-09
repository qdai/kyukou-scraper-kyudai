'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const moment = require('moment');

chai.use(chaiAsPromised);
moment.locale('ja');

const expect = chai.expect;

const fetch = require('../lib/utils/fetch');
const isValidDate = require('../lib/utils/isvaliddate');
const normalizeText = require('../lib/utils/normalizetext');
const parseDate = require('../lib/utils/parse-date');

describe('Utils', () => {
  describe('/fetch', () => {
    it('expected to return parsed web page', () => {
      const promise = fetch('https://travis-ci.org/qdai/kyukou-scraper-kyudai').then($ => $().cheerio);
      return expect(promise).to.become('[cheerio object]');
    });
  });

  describe('/isValidDate', () => {
    it('expected to return true when day is valid', () => {
      const baseDate = moment();
      const days = moment.weekdaysMin();
      for (let i = 0; i < 7; i++) {
        const date = moment(baseDate).add(i, 'days');
        for (let j = 0; j < 7; j++) {
          expect(isValidDate(date.toDate(), days[j])).to.be.equal(j === date.day());
        }
      }
    });
  });

  describe('/normalizeText', () => {
    it('expected to trim leading space and trailing space', () => {
      expect(normalizeText('  abc  ')).to.deep.equal('abc');
      expect(normalizeText('　　abc　　')).to.deep.equal('abc');
    });

    it('expected to replace ideographic space with space', () => {
      expect(normalizeText('a　b　c')).to.deep.equal('a b c');
    });

    it('expected to replace fullwidth char with halfwidth char', () => {
      const fullwidth = '！＂＃＄％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［＼］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝～';
      const halfwidth = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
      expect(normalizeText(fullwidth)).to.deep.equal(halfwidth);
    });
  });

  describe('/parseDate', () => {
    it('expected to parse date', () => {
      expect(parseDate('2016年6月9日', 'YYYY年M月D日')).to.deep.equal(new Date('2016-06-08T15:00:00'));
      expect(parseDate('2016年6月9日', 'YYYY年M月D日', '木')).to.deep.equal(new Date('2016-06-08T15:00:00'));
    });

    it('expected to throw', () => {
      expect(() => parseDate('invalid date', 'YYYY年M月D日')).to.throw(Error);
      expect(() => parseDate('2016年6月9日', 'YYYY年M月D日', '月')).to.throw(Error);
      expect(() => parseDate('2016年6月9日', 'YYYY年M月D日', '火')).to.throw(Error);
      expect(() => parseDate('2016年6月9日', 'YYYY年M月D日', '水')).to.throw(Error);
      expect(() => parseDate('2016年6月9日', 'YYYY年M月D日', '金')).to.throw(Error);
      expect(() => parseDate('2016年6月9日', 'YYYY年M月D日', '土')).to.throw(Error);
      expect(() => parseDate('2016年6月9日', 'YYYY年M月D日', '日')).to.throw(Error);
    });
  });
});

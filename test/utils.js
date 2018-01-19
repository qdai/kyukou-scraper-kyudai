'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const moment = require('moment');

chai.use(chaiAsPromised);
moment.locale('ja');

const { expect } = chai;

const ScrapError = require('../lib/utils/scrap-error');
const fetch = require('../lib/utils/fetch');
const isValidDate = require('../lib/utils/is-valid-date');
const nock = require('nock');
const normalizeText = require('../lib/utils/normalize-text');
const parseDate = require('../lib/utils/parse-date');

describe('Utils', () => {
  describe('./ScrapError', () => {
    it('is expected to create ScrapError', () => {
      const message = 'scrap error';
      const err = new ScrapError(message);
      expect(err.name).to.deep.equal('ScrapError');
      expect(err.message).to.deep.equal(message);
    });
  });

  describe('/fetch', () => {
    before(() => {
      nock('http://example.com')
        .get('/ok')
        .reply(200, 'ok')
        .get('/not-found')
        .reply(404, 'not-found');
    });

    it('expected to return parsed web page', async () => {
      const $ = await fetch('http://example.com/ok');
      expect($().cheerio).to.deep.equal('[cheerio object]');
    });
    it('expected to be rejected', () => {
      const promise = fetch('http://example.com/not-found');
      return expect(promise).to.be.rejectedWith(Error, /404/);
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
      expect(parseDate('2016年6月9日', 'YYYY年M月D日')).to.deep.equal(new Date('2016-06-08T15:00:00Z'));
      expect(parseDate('2016年6月9日', 'YYYY年M月D日', '木')).to.deep.equal(new Date('2016-06-08T15:00:00Z'));
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

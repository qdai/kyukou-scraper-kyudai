'use strict';

/*
 * Zenkaku to hankaku
 * replace Ideographic Space and below:
 * ！＂＃＄％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？
 * ＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［＼］＾＿
 * ｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝～
 */
module.exports = text => text
  .replace(/[\uff01-\uff5e]/gu, s => String.fromCharCode(s.charCodeAt(0) - 65248))
  .replace(/\u3000/gu, '\u0020')
  .trim();

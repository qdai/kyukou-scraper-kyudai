'use strict';

/*
 * Zenkaku to hankaku
 * replace Ideographic Space and below:
 * ！＂＃＄％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？
 * ＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［＼］＾＿
 * ｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝～
 */
module.exports = text =>
  text
    .replace(/[\uff01-\uff5e]/g, s => String.fromCharCode(s.charCodeAt(0) - 65248))
    .replace(/\u3000/g, '\u0020')
    .trim();

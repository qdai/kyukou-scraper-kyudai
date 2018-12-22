'use strict';

const ScrapError = require('../../../lib/utils/scrap-error');

module.exports = [
  new ScrapError('Invalid eventDate on yyyy年mm月dd日（木） 休講 後期・通常 木曜2限 subject1 teacher1 note1 2015年9月8日(1時24分)'),
  new ScrapError('Cannot read property \'1\' of null on 2015年10月1日（木） 休講 後期・通常 木曜invalid period subject1 teacher1 note1 2015年9月8日(1時24分)'),
  {
    about: '休講',
    department: '文学部',
    eventDate: new Date('2015-10-01T00:00+09:00'),
    link: 'http://www2.lit.kyushu-u.ac.jp/~syllabus/cgi-bin/class-schedule-1.cgi',
    note: 'note1',
    period: '2',
    pubDate: new Date('2015-09-08T01:24+09:00'),
    raw: '\n          2015年10月1日（木）\n          休講\n          後期・通常\n              木曜2限\n              subject1\n          teacher1\n          note1\n          2015年9月8日(1時24分)\n        ',
    subject: 'subject1',
    teacher: 'teacher1'
  }
];

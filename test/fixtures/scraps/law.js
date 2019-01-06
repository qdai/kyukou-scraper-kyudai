'use strict';

const ScrapError = require('../../../lib/utils/scrap-error');

module.exports = [
  new ScrapError('Cannot read property \'1\' of null on         4        invalid date（木曜・1限）        subject4        teacher4        2015年10月16日18時52分        公務        note4      '),
  {
    about: '休講',
    department: '法学部',
    eventDate: new Date('2019-10-16T00:00+09:00'),
    link: 'http://www.law.kyushu-u.ac.jp/faculty/cancel.php',
    note: 'note3',
    period: '5',
    pubDate: new Date('2019-10-10T00:00+09:00'),
    raw: '\n        10月16日5限目\n        subject3\n        teacher3\n        10月10日\n        休講\n        note3\n        \n      ',
    subject: 'subject3',
    teacher: 'teacher3'
  },
  {
    about: '補講',
    department: '法学部',
    eventDate: new Date('2019-10-02T00:00+09:00'),
    link: 'http://www.law.kyushu-u.ac.jp/faculty/cancel.php',
    note: 'note2',
    period: '1',
    pubDate: new Date('2019-10-01T00:00+09:00'),
    raw: '\n        10月2日1限目\n        subject2(補講)\n        teacher2\n        10月1日\n        その他\n        note2\n        \n      ',
    subject: 'subject2',
    teacher: 'teacher2'
  },
  {
    about: '公務',
    department: '法学部',
    eventDate: new Date('2019-10-01T00:00+09:00'),
    link: 'http://www.law.kyushu-u.ac.jp/faculty/cancel.php',
    note: 'note1',
    period: '3',
    pubDate: new Date('2019-09-10T00:00+09:00'),
    raw: '\n        10月1日3限目\n        subject1\n        teacher1\n        09月10日\n        公務\n        note1\n        \n      ',
    subject: 'subject1',
    teacher: 'teacher1'
  }
];

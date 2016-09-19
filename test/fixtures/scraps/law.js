'use strict';

module.exports = [
  new TypeError('Cannot read property \'1\' of null on         4        invalid date（木曜・1限）        subject4        teacher4        2015年10月16日18時52分        公務        note4      '),
  {
    about: '休講',
    department: '法学部',
    eventDate: new Date('2015-10-16T00:00+09:00'),
    link: 'http://www.law.kyushu-u.ac.jp/kyukou/keiji.cgi',
    note: 'note3',
    period: '5',
    pubDate: new Date('2015-10-10T16:00+09:00'),
    raw: '\n        3\n        2015年10月16日（水曜・5限）\n        subject3\n        teacher3\n        2015年10月10日16時0分\n        休講\n        note3\n      ',
    subject: 'subject3',
    teacher: 'teacher3'
  },
  {
    about: '補講',
    department: '法学部',
    eventDate: new Date('2015-10-02T00:00+09:00'),
    link: 'http://www.law.kyushu-u.ac.jp/kyukou/keiji.cgi',
    note: 'note2',
    period: '1',
    pubDate: new Date('2015-10-01T08:00+09:00'),
    raw: '\n        2\n        2015年10月2日（金曜・1限）\n        subject2(補講)\n        teacher2\n        2015年10月1日8時0分\n        その他\n        note2\n      ',
    subject: 'subject2',
    teacher: 'teacher2'
  },
  {
    about: '公務',
    department: '法学部',
    eventDate: new Date('2015-10-01T00:00+09:00'),
    link: 'http://www.law.kyushu-u.ac.jp/kyukou/keiji.cgi',
    note: 'note1',
    period: '3',
    pubDate: new Date('2015-09-10T22:29+09:00'),
    raw: '\n        1\n        2015年10月1日（木曜・3限）\n        subject1\n        teacher1\n        2015年9月10日22時29分\n        公務\n        note1\n      ',
    subject: 'subject1',
    teacher: 'teacher1'
  }
];

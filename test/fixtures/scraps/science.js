'use strict';

const ScrapError = require('../../../lib/utils/scrap-error');

module.exports = [
  {
    about: '休講',
    department: '理学部化学',
    eventDate: new Date('2017-10-07T00:00+09:00'),
    link: 'https://www.sci.kyushu-u.ac.jp/student/cancel/',
    period: '2',
    raw: '休講\n    \n    \n      2017年10月7日(土) 2時限\n      subject1\n      (化学 2学年)\n      担当:teacher1',
    subject: 'subject1',
    teacher: 'teacher1'
  },
  {
    about: '補講',
    department: '理学部化学',
    eventDate: new Date('2017-10-05T00:00+09:00'),
    link: 'https://www.sci.kyushu-u.ac.jp/student/cancel/',
    note: 'note1\nmultiple line\nmultiple line',
    period: '3',
    raw: '補講\n    \n    \n      2017年10月5日(木) 3時限\n      subject1 with space\n      (化学 2学年)\n      担当:teacher1 teacher2\n      教室:room1 with space\n      連絡事項:note1\nmultiple line\nmultiple line',
    room: 'room1 with space',
    subject: 'subject1 with space',
    teacher: 'teacher1 teacher2'
  },
  {
    about: '連絡',
    department: '理学部数学',
    eventDate: new Date('2017-10-06T00:00+09:00'),
    link: 'https://www.sci.kyushu-u.ac.jp/student/cancel/',
    note: 'note2',
    period: '4',
    raw: '連絡\n    \n    \n      2017年10月6日(金) 4時限\n      subject2\n      (数学 2学年)\n      担当:teacher2\n      教室:room2\n      連絡事項:note2',
    room: 'room2',
    subject: 'subject2',
    teacher: 'teacher2'
  },
  new ScrapError('Cannot read property \'1\' of null on 休講 invalid date 4時限 subject3 (数学 4学年) 担当:teacher3 連絡事項:note3')
];

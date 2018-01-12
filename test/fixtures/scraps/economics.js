'use strict';

const ScrapError = require('../../../lib/utils/scrap-error');

module.exports = [
  new ScrapError('Invalid eventDate on 【休講】10月5日(火) 1時限 学府 「subject3」 (teacher3教員)'),
  {
    about: '休講',
    department: '経済学部',
    eventDate: new Date('2018-10-06T00:00+09:00'),
    link: 'http://www.econ.kyushu-u.ac.jp/student/kyuukou.php',
    period: '18:30~20:00',
    pubDate: new Date('2018-08-12T00:00+09:00'),
    raw: '【休講】10月6日(土) 18:30~20:00 学部 「subject2」 (teacher2教員)',
    subject: 'subject2',
    teacher: 'teacher2'
  },
  {
    about: '休講',
    department: '経済学部',
    eventDate: new Date('2018-10-03T00:00+09:00'),
    link: 'http://www.econ.kyushu-u.ac.jp/student/kyuukou_read.php?kind=&S_Category=C&S_View=&word=&page=1&B_Code=0001',
    period: '4,5',
    pubDate: new Date('2018-08-11T00:00+09:00'),
    raw: '【休講】10月3日(水) 4,5時限 学部 「subject1」 (teacher1教員)教室:room1',
    room: 'room1',
    subject: 'subject1',
    teacher: 'teacher1'
  }
];

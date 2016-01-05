'use strict';

module.exports = [
  new Error('Invalid eventDate on 【休講】10月5日(火) 1時限 学府 「subject3」 (teacher3教員)'),
  {
    raw: '【休講】10月6日(木) 18:30~20:00 学部 「subject2」 (teacher2教員)',
    about: '休講',
    link: 'http://www.econ.kyushu-u.ac.jp/student/kyuukou.php',
    eventDate: new Date('2016-10-06T00:00+09:00'),
    pubDate: new Date('2016-08-12T00:00+09:00'),
    period: '18:30~20:00',
    department: '経済学部',
    subject: 'subject2',
    teacher: 'teacher2'
  },
  {
    raw: '【休講】10月3日(月) 4,5時限 学部 「subject1」 (teacher1教員)教室:room1',
    about: '休講',
    link: 'http://www.econ.kyushu-u.ac.jp/student/kyuukou_read.php?kind=&S_Category=C&S_View=&word=&page=1&B_Code=0001',
    eventDate: new Date('2016-10-03T00:00+09:00'),
    pubDate: new Date('2016-08-11T00:00+09:00'),
    period: '4,5',
    department: '経済学部',
    subject: 'subject1',
    teacher: 'teacher1',
    room: 'room1'
  }
];

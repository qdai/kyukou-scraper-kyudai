'use strict';

const ScrapError = require('../../../lib/utils/scrap-error');

module.exports = [
  new ScrapError('Invalid eventDate on 【補講】7月10日(木)4限 「subject4」(teacher4教員)'),
  {
    about: '補講',
    department: '教育学部',
    eventDate: new Date('2019-06-13T00:00+09:00'),
    link: 'https://www.education.kyushu-u.ac.jp/topics/student_view/3',
    period: '2、3',
    pubDate: new Date('2019-05-25T00:00+09:00'),
    raw: '【補講】6月13日(木)2、3限 「subject3」(teacher3教員) 教室:room3',
    room: 'room3',
    subject: 'subject3',
    teacher: 'teacher3'
  },
  {
    about: '休講',
    campus: 'campus2地区',
    department: '教育学部',
    eventDate: new Date('2019-06-07T00:00+09:00'),
    link: 'https://www.education.kyushu-u.ac.jp/topics/student_view/2',
    period: '1',
    pubDate: new Date('2019-05-15T00:00+09:00'),
    raw: '【休講】6月7日(金)1限 campus2地区開講「subject2」(teacher2教員)',
    subject: 'subject2',
    teacher: 'teacher2'
  }
];

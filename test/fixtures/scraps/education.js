'use strict';

module.exports = [
  new Error('Invalid eventDate on 【補講】7月10日(木)4限 「subject4」(teacher4教員)'),
  {
    raw: '【補講】6月13日(月)2、3限 「subject3」(teacher3教員) 教室:room3',
    about: '補講',
    link: 'http://www.education.kyushu-u.ac.jp/topics/student_index',
    eventDate: new Date('2016-06-13T00:00+09:00'),
    pubDate: new Date('2016-05-25T00:00+09:00'),
    period: '2、3',
    department: '教育学部',
    subject: 'subject3',
    teacher: 'teacher3',
    room: 'room3'
  },
  {
    raw: '【休講】6月7日(火)1限 campus2地区開講「subject2」(teacher2教員)',
    about: '休講',
    link: 'http://www.education.kyushu-u.ac.jp/topics/student_view/2',
    eventDate: new Date('2016-06-07T00:00+09:00'),
    pubDate: new Date('2016-05-15T00:00+09:00'),
    period: '1',
    department: '教育学部',
    subject: 'subject2',
    teacher: 'teacher2',
    campus: 'campus2地区'
  }
];

'use strict';

module.exports = [
  {
    about: '休講',
    department: '理学部化学',
    eventDate: new Date('2017-10-07T00:00+09:00'),
    link: 'http://www.sci.kyushu-u.ac.jp/index.php?type=0&sel1=11&sel2=0',
    period: '2',
    raw: '[[ 休講 ]]  10月 7日 (土)  2時限学科:化学  学年:2学年\n                      科目:subject1  (担当:teacher1)',
    subject: 'subject1',
    teacher: 'teacher1'
  },
  {
    about: '補講',
    department: '理学部化学',
    eventDate: new Date('2017-10-05T00:00+09:00'),
    link: 'http://www.sci.kyushu-u.ac.jp/index.php?type=0&sel1=11&sel2=0',
    note: 'note1\nmultiple line\nmultiple line',
    period: '3',
    raw: '[[ 補講 ]]  10月 5日 (木)  3時限学科:化学  学年:2学年\n                      科目:subject1 with space  (担当:teacher1 teacher2)\n                      教室:room1 with space\n                      連絡事項:note1\nmultiple line\nmultiple line',
    room: 'room1 with space',
    subject: 'subject1 with space',
    teacher: 'teacher1 teacher2'
  },
  {
    about: '連絡',
    department: '理学部数学',
    eventDate: new Date('2017-10-06T00:00+09:00'),
    link: 'http://www.sci.kyushu-u.ac.jp/index.php?type=0&sel1=11&sel2=0',
    note: 'note2',
    period: '4',
    raw: '[[ 連絡 ]]  10月 6日 (金)  4時限学科:数学  学年:2学年\n                      科目:subject2  (担当:teacher2)\n                      教室:room2\n                      連絡事項:note2',
    room: 'room2',
    subject: 'subject2',
    teacher: 'teacher2'
  },
  new Error('Invalid eventDate on [[ 休講 ]]  10月 6日 (水)  4時限学科:数学  学年:4学年                      科目:subject3  (担当:subject3)')
];

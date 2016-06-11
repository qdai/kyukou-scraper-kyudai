'use strict';

const moment = require('moment');

module.exports = (date, youbi) => {
  const m = moment(date).locale('ja');
  return m.isValid() && m.format('dd') === youbi;
};

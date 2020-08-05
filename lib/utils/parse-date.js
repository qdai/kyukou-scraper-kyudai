'use strict';

const moment = require('moment');
const isValidDate = require('./is-valid-date');

module.exports = (str, format, youbi) => {
  const m = moment(str, format);
  if (!m.isValid() || (typeof youbi === 'string' && !isValidDate(m, youbi))) {
    throw new Error(`"${str}" is not a valid date`);
  }
  return m.toDate();
};

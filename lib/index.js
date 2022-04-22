'use strict';

const education = require('./scrapers/education');
const law = require('./scrapers/law');
const literature = require('./scrapers/literature');
const science = require('./scrapers/science');

module.exports = {
  education,
  law,
  literature,
  science
};

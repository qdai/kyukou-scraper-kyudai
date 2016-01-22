'use strict';

const cheerio = require('cheerio');
const fetch = require('node-fetch');

module.exports = url =>
  fetch(url).then(res => res.text()).then(body => cheerio.load(body));

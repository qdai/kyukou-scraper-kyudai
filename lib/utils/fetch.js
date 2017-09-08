'use strict';

const cheerio = require('cheerio');
const fetch = require('node-fetch');

module.exports = url =>
  fetch(url)
    .then(res => {
      if (res.ok) {
        return res.text();
      }
      return Promise.reject(new Error(`${res.status} ${res.statusText} (${url})`));
    })
    .then(body => cheerio.load(body));

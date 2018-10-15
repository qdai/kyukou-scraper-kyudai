'use strict';

const cheerio = require('cheerio');
const fetch = require('node-fetch');

module.exports = async url => {
  const res = await fetch(url, { redirect: 'error' });
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText} (${url})`);
  }
  const body = await res.textConverted();
  const $ = cheerio.load(body);
  return $;
};

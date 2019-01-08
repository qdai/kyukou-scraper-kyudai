'use strict';

const ScrapError = class extends Error {
  constructor (message, raw) {
    if (raw) {
      super(`${message} on ${raw.trim().replace(/\s+/gu, ' ')}`);
    } else {
      super(message);
    }
    this.name = this.constructor.name;
  }
};

module.exports = ScrapError;

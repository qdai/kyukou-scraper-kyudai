'use strict';

const config = {
  collectCoverageFrom: ['lib/**/*.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov']
};

module.exports = config;

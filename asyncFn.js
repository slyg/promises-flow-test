"use strict";

var Promise = require('bluebird'),
	casual = require('casual');

module.exports = Promise.promisify(function (delay, next) {
  setTimeout(function(){
    var result = {};
    result[casual.word] = casual.word;
    next(null, result);
  }, delay);
});

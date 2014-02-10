"use strict";

var Promise = require('bluebird'),
    _ = require('lodash'),
    asyncFn = require('./asyncFn');

module.exports = function (promise, next){

  var transport = {};

  Promise.join(
    asyncFn(100).then(function(data){ _.merge(transport, data); }),
    asyncFn(50).then(function(data){ _.merge(transport, data); }),
    promise
  )
    .then(function(){
      next(null, transport);
    })
    .caught(function(err){
      next(err);
    });

};

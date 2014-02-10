var Promise = require('bluebird');
var expect = require('chai').expect;

var eatPromise = require('./../index.js');


describe('the promise chain', function(){

  it('should pass when given promise fulfills', function(done){

    eatPromise(
      Promise.resolve({message : 'fullfilled'}),
      function(err, result){

        expect(result).to.be.ok;
        expect(err).to.be.falsy;

        done();
      }
    );

  });

  it('should fail when given promise fails synchronously', function(done){

    eatPromise(
      Promise.reject({reason : 'pas envie'}),
      function(err, result){

        expect(result).to.be.falsy;
        expect(err).to.be.an('object')
          .and.to.have.property('reason', 'pas envie');

        done();
      }
    );

  });

  it('should fail when given promise fails asynchronously', function(done){

    eatPromise(

      (new Promise(function(resolve, reject){
        setTimeout(function(){
          reject({reason : 'pas envie'})
        }, 100);
      })), 
      function(err, result){

        expect(err).to.be.an('object')
          .that.has.property('reason', 'pas envie');

        done();
      }

    );

  });

  it('should pass when given failed promise catches itself', function(done){

    eatPromise(
      Promise.reject({reason : 'pas envie'}).caught(function(err){}),
      function(err, result){

        expect(err).to.be.a('null');
        expect(result).to.be.an('object');

        done();
      }
    );

  });
  
});

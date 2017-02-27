const expect = require('chai').expect;
const drequire = require('./drequire');

describe('drequire', function () {
/*
const drequire = require('./drequire');
console.log('this should be the first line of output');
const slow = drequire('./slow-module');
console.log('this should be the second line of output');
const module2 = drequire('./module2');

console.log('slow:', slow);
slow.slow();
console.log('consts:', slow.consts);
slow.slow();
console.log('module2:', module2);
module2('foo', 'bar', 'baz');
*/
    describe('drequiring a module', function () {
        let slow;
        before('drequire the slow module', function () {
            slow = drequire('./slow-module');
        });
        it.skip('should return a ECMAScript6 Proxy object', function () {
            console.log('slow.Symbol(Symbol.toStringTag):', slow['Symbol(Symbol.toStringTag)']);
            expect(slow).to.be.a('Proxy');
        });

        it('should have the slow function and consts object', function () {
            expect(slow.slow).to.be.a('function');
            expect(slow.consts).to.be.an('object');
        });
    });
});

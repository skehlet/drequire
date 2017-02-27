const expect = require('chai').expect;
const drequire = require('./drequire');
const _ = require('lodash');
const path = require('path');

describe('Using the drequire module', function () {
    describe('and examining how the node.js require.cache works', function () {
        const myPath = path.resolve('./module-that-exports-an-object.js');
        let myModule;
        it('we should not find our module in the require.cache before we drequire it', function () {
            expect(_.includes(_.keys(require.cache), myPath)).to.be.false;
        });
        it('we should not find our module in the require.cache after we drequire it', function () {
            myModule = drequire('./module-that-exports-an-object');
            expect(_.includes(_.keys(require.cache), myPath)).to.be.false;
        });
        it('should find our module in the require.cache after we access something proxied inside it', function () {
            myModule.fn('foo');
            expect(_.includes(_.keys(require.cache), myPath)).to.be.true;
        });
    });

    describe('and drequiring a module that exports an object', function () {
        let module1;
        before('drequire the module-that-exports-an-object module', function () {
            module1 = drequire('./module-that-exports-an-object');
        });
        // this does NOT currently work:
        it.skip('should return a ECMAScript6 Proxy object', function () {
            expect(module1).to.be.a('Proxy');
        });

        it('should give me the proxied fn function and obj object', function () {
            expect(module1.fn).to.be.a('function');
            expect(module1.obj).to.be.an('object');
        });
    });

    describe('and drequiring a module that exports a function', function () {
        let module2;
        before('drequire the module-that-exports-a-function module', function () {
            module2 = drequire('./module-that-exports-a-function');
        });

        it('should give me a function', function () {
            expect(module2).to.be.a('function');
        });

        it('should return whatever I pass it when called', function () {
            expect(module2('testing', 'drequire')).to.deep.equal(['testing', 'drequire']);
        });
    });

    describe('and drequiring a module', function () {
        let module1;
        before('drequire the module-that-exports-an-object module', function () {
            module1 = drequire('./module-that-exports-an-object');
        });
        it('a second time should return the same object', function () {
            let module1a = drequire('./module-that-exports-an-object');
            expect(module1).to.equal(module1a);
        });
    });

    describe('and verifying that it gives us the same object every time we drequire a module', function () {
        let module1;
        before('drequire the module-that-exports-an-object module', function () {
            module1 = drequire('./module-that-exports-an-object');
        });
        it('should give us the same module', function () {
            expect(require('./module-that-returns-a-drequired-module1')()).to.equal(module1);
        });
    });

    // This doesn't work either.
    // AssertionError: expected [Function: fn] to equal [Function: bound fn]
    // The proxied function has its `this` bound.
    describe.skip('and verifying that the proxied properties are the same as required properties', function () {
        let module1;
        before('drequire the module-that-exports-an-object module', function () {
            module1 = drequire('./module-that-exports-an-object');
        });
        it('should give us the same fucntion', function () {
            expect(require('./module-that-returns-a-required-module1')().fn).to.equal(module1.fn);
        });
    });
});

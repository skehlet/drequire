const expect = require('chai').expect;
const frequire = require('./frequire');
const _ = require('lodash');
const path = require('path');

describe('Using the frequire module', function () {
    describe('and peeking into the Node.js require.cache', function () {
        const myPath = path.resolve(__dirname, './lib/object.js');
        let myModule;
        it('we should not find our module in the require.cache before we frequire it', function () {
            expect(_.includes(_.keys(require.cache), myPath)).to.be.false;
        });
        it('we should not find our module in the require.cache after we frequire it', function () {
            myModule = frequire('./lib/object');
            expect(_.includes(_.keys(require.cache), myPath)).to.be.false;
        });
        it('should find our module in the require.cache after we access something proxied inside it', function () {
            myModule.fn('foo');
            expect(_.includes(_.keys(require.cache), myPath)).to.be.true;
        });
    });

    describe('and frequiring a module that exports an object', function () {
        let module1;
        before('frequire the object module', function () {
            module1 = frequire('./lib/object');
        });

        // this does NOT currently work, due to a limitation of Proxy object:
        it.skip('should return a ECMAScript6 Proxy object', function () {
            expect(module1).to.be.a('Proxy');
        });

        it('should give me the proxied fn function and obj object', function () {
            expect(module1.fn).to.be.a('function');
            expect(module1.obj).to.be.an('object');
        });
    });

    describe('and frequiring a module that exports a function', function () {
        let module2;
        before('frequire the function module', function () {
            module2 = frequire('./lib/function');
        });

        it('should give me a function', function () {
            expect(module2).to.be.a('function');
        });

        it('should return whatever I pass it when called', function () {
            expect(module2('testing', 'frequire')).to.deep.equal(['testing', 'frequire']);
        });
    });

    describe('and frequiring a module that exports a constructor', function () {
        let MyClass;
        before('frequire the class module', function () {
            MyClass = frequire('./lib/class');
        });

        it('should give me a function', function () {
            expect(MyClass).to.be.a('function');
        });

        it('should allow me to call new on it and that should return an object of type MyClass', function () {
            let instance = new MyClass('testing');
            expect(instance instanceof MyClass).to.be.true;
            expect(instance.name).to.equal('testing');
        });
    });

    describe('and frequiring a module', function () {
        let module1;
        before('frequire the object module', function () {
            module1 = frequire('./lib/object');
        });
        it('a second time should return the same object', function () {
            let module1a = frequire('./lib/object');
            expect(module1).to.equal(module1a);
        });
    });

    describe('and verifying that it gives us the same object every time we frequire a module', function () {
        let module1;
        before('frequire the object module', function () {
            module1 = frequire('./lib/object');
        });
        it('should give us the same module', function () {
            expect(require('./lib/frequired-module')()).to.equal(module1);
        });
    });

    describe('and verifying that the proxied properties are the same as required properties', function () {
        let module1;
        let module2;
        before('frequire the object module', function () {
            module1 = frequire('./lib/object');
            module2 = require('./lib/object');
        });
        it('should give us the exact same function', function () {
            expect(module2.fn).to.equal(module1.fn);
        });
    });
});

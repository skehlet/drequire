
function enclosed() {
    var slow = require('./slow-module.js');

    function foo() {
        slow.slow();
    }

    let consts = {
        foo: "foo",
        bar: "bar"
    };

    return {
        foo: foo,
        consts: consts
    };
}


module.exports = (function () {
    let enclosure;
    var handler = {
        get: function(target, name) {
            console.log(`you are trying to get ${name}`);
            return target[name];
        }
    };

    return {
        foo: function () {
            if (!enclosure) {
                enclosure = enclosed();
            }
            return enclosure.foo(...arguments);
        },
        consts: new Proxy({}, handler)
    };
})();

// var p = new Proxy(foo, handler);


console.log('this should be the first line of output');
module.exports.foo();
console.log(module.exports.consts);

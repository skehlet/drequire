
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

let enclosure;
var handler = {
    get: function(target, name) {
        console.log(`proxy intercepted: ${name}`);
        // return target[name];
        if (!enclosure) {
            enclosure = enclosed();
        }
        return enclosure[name];
    }
};
module.exports = new Proxy({}, handler);


// (function () {
//     let enclosure;

//     return {
//         foo: function () {
//             if (!enclosure) {
//                 enclosure = enclosed();
//             }
//             return enclosure.foo(...arguments);
//         },
//         consts: new Proxy({}, handler)
//     };
// })();

// // var p = new Proxy(foo, handler);


console.log('this should be the first line of output');
module.exports.foo();
console.log('consts:', module.exports.consts);

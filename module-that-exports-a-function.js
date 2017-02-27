console.log('module-that-exports-a-function is being required');
const drequire = require('./drequire');
const module1 = drequire('./module-that-exports-an-object');
module.exports = function () {
    let args = Array.prototype.slice.call(arguments);
    console.log(`function(${args.join(', ')})`);
    console.log('module1:', module1.fn('foo', 'bar'));
    return args;
};

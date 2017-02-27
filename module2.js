console.log('module2 is being required');
const drequire = require('./drequire');
const slow = drequire('./slow-module');
module.exports = function () {
    let args = Array.prototype.slice.call(arguments);
    console.log('module that exports a function not an object, args:', args.join(', '), 'slow:', slow.slow());
};

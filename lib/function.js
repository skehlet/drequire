const frequire = require('../frequire');
const module1 = frequire('./object');

module.exports = function () {
    let args = Array.prototype.slice.call(arguments);
    return args;
};

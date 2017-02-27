const drequire = require('./drequire');
module.exports = function () {
    return drequire('./module-that-exports-an-object');
}

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

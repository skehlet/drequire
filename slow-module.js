console.log('slow-module is being required');
module.exports = {
    slow: function () {
        console.log('slow');
        return 'slow';
    },
    consts: {
        foo: 'foo',
        bar: 'bar'
    }
};

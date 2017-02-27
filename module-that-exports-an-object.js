console.log('module-that-exports-an-object is being required');
module.exports = {
    fn: function () {
        return Array.prototype.slice.call(arguments);
    },
    obj: {
        foo: 'foo',
        bar: 'bar'
    }
};

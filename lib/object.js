module.exports = {
    fn: function () {
        return Array.prototype.slice.call(arguments);
    },
    obj: {
        foo: 'foo',
        bar: 'bar'
    }
};

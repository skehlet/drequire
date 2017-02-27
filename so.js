function wrap(source) {
    return new Proxy(source, {
        get: function(target, name) {
            const property = target[name];
            return (typeof property == 'function') ? property.bind(target) : property;
        }
    });
}

console.log(wrap(function() {}).toString());

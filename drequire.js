module.exports = (function () {
    const path = require('path');
    const modules = {};
    return function drequire(moduleName) {
        moduleName = path.resolve(moduleName);
        if (!modules[moduleName]) {
            console.log(`setting up proxy for ${moduleName}`);
            modules[moduleName] = new Proxy(() => {}, {
                get: function(target, name) {
                    let nameString = name.toString();
                    console.log(`proxying get ${moduleName}.${nameString}`);
                    const module = require(moduleName);
                    const property = module[name];
                    return (typeof property == 'function') ? property.bind(module) : property;
                },
                apply: function (target, thisArg, argumentsList) {
                    console.log(`proxying ${moduleName}(${argumentsList.join(', ')})`);
                    return require(moduleName).apply(thisArg, argumentsList);
                }
            });
        }
        return modules[moduleName];
    };
})();

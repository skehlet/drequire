'use strict';

module.exports = (function () {
    const _ = require('lodash');
    const modules = {};
    const dummyTarget = function MyDummyProxyObject() {}; // needs to be a named function so `construct` trap works

    return function drequire(moduleName) {
        moduleName = resolveModuleName(moduleName);
        if (!modules[moduleName]) {
            // console.log(`[Setting up proxy for ${moduleName}]`);
            modules[moduleName] = new Proxy(dummyTarget, {
                get: function(target, name) {
                    let nameString = name.toString();
                    // console.log(`[Proxying get ${moduleName}.${nameString}]`);
                    const module = doRequire(moduleName);
                    const property = module[name];
                    if (name === 'toString') { // special handler for toString, needed for some reason
                        return property.bind(module);
                    }
                    // return (typeof property === 'function') ? property.bind(module) : property;
                    return property;
                },
                apply: function (target, thisArg, argumentsList) {
                    // console.log(`[Proxying ${moduleName}(${argumentsList.join(', ')})]`);
                    return doRequire(moduleName).apply(thisArg, argumentsList);
                },
                construct: function (target, argumentsList) {
                    // console.log(`[Proxying new ${moduleName}(${argumentsList.join(', ')})]`);
                    return new (doRequire(moduleName))(...argumentsList);
                }
            });
        }
        return modules[moduleName];
    };

    function resolveModuleName(moduleName) {
        let resolved;
        try {
            resolved = require.resolve(moduleName);
        } catch (err) {
            resolved = require.resolve(`${getCallerDirName()}/${moduleName}`);
        }
        return resolved;
    }

    function doRequire(moduleName) {
        let startTime;
        const isAlreadyRequired = _.includes(_.keys(require.cache), moduleName);
        if (!isAlreadyRequired) {
            startTime = Date.now();
        }
        const theModule = require(moduleName);
        if (!isAlreadyRequired) {
            console.log(`[Required ${moduleName} in ${Date.now() - startTime}ms]`);
        }
        return theModule;
    }

    function getCallerDirName() {
        const _ = require('lodash');
        const path = require('path');
        const stack = getStack();
        const caller = _.find(stack, function (frame) {
            // find the first filename that isn't ours, i.e. the caller's file
            return frame.getFileName() !== __filename;
        });
        return path.dirname(caller.getFileName());
    }

    function getStack() {
        const origPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = function (_, stack) {
            return stack;
        };
        const err = new Error();
        const stack = err.stack;
        Error.prepareStackTrace = origPrepareStackTrace;
        stack.shift();
        return stack;
    }
})();

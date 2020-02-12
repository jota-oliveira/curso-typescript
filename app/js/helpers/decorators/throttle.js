System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function throttle(milessegundos = 500) {
        return function (target, methodName, descriptor) {
            let timer = 0;
            const metodo = descriptor.value;
            descriptor.value = function (...args) {
                clearTimeout(timer);
                timer = setTimeout(() => metodo.apply(this, args), milessegundos);
            };
            return descriptor;
        };
    }
    exports_1("throttle", throttle);
    return {
        setters: [],
        execute: function () {
        }
    };
});

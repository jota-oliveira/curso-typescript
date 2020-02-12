System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function domInject(idDoElemento) {
        return function (target, propertyKey) {
            let elemento = null;
            const getter = function () {
                if (!elemento) {
                    console.log('Buscando elemento no dom agora...');
                    elemento = document.querySelector(idDoElemento);
                }
                return elemento;
            };
            Object.defineProperty(target, propertyKey, {
                get: getter
            });
        };
    }
    exports_1("domInject", domInject);
    return {
        setters: [],
        execute: function () {
        }
    };
});

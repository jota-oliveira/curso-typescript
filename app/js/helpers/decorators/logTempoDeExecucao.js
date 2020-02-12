System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function logTempoDeExecucao(emSegundos = false) {
        return function (target, propertyKey, descriptor) {
            const metodoOriginal = descriptor.value;
            descriptor.value = function (...args) {
                console.log('-----------------');
                console.log(`Parâmetros passados para o método ${propertyKey}: ${JSON.stringify(args)}`);
                const t1 = performance.now();
                const retorno = metodoOriginal.apply(this, args);
                const t2 = performance.now();
                const tempoDeExecucao = emSegundos ? (t2 - t1) / 1000 : t2 - t1;
                const unidadeDeMedida = emSegundos ? 'sg' : 'ms';
                console.log(`O retorno do método ${propertyKey} é ${JSON.stringify(retorno)}`);
                console.log(`O tempo de execução de ${propertyKey} foi: ${tempoDeExecucao} ${unidadeDeMedida}`);
                return retorno;
            };
            return descriptor;
        };
    }
    exports_1("logTempoDeExecucao", logTempoDeExecucao);
    return {
        setters: [],
        execute: function () {
        }
    };
});

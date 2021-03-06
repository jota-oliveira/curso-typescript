export function logTempoDeExecucao(emSegundos: boolean = false): Function {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        
        /* Método que o decorator está sendo posicionado */
        const metodoOriginal = descriptor.value;

        descriptor.value = function(...args: any[]) {

            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            const tempoDeExecucao: number = emSegundos ? (t2 - t1) / 1000 : t2 - t1;
            const unidadeDeMedida: string = emSegundos ? 'sg' : 'ms';
            console.log(`O tempo de execução de ${propertyKey} foi: ${tempoDeExecucao} ${unidadeDeMedida}`);
            return retorno;
        }

        return descriptor;
    }
}
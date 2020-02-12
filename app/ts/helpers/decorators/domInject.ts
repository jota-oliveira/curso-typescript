export function domInject(idDoElemento: string): Function {
    return function(target: any, propertyKey: string) {
        let elemento: any = null;

        const getter = function() {
            if(!elemento) {
                console.log('Buscando elemento no dom agora...');
                elemento = <HTMLInputElement>document.querySelector(idDoElemento);
            }


            return elemento;
        }

        Object.defineProperty(target, propertyKey, {
            get: getter
        });
    }
}
export function throttle(milessegundos: number = 500): Function {
    return function(target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        let timer = 0;
        const metodo = descriptor.value;

        descriptor.value = function(...args: any[]): void {
            
            if(event) event.preventDefault();

            clearTimeout(timer);
            timer = setTimeout(() => metodo.apply(this, args), milessegundos);
        };

        return descriptor;
    }
}
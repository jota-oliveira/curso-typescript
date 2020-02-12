import { logTempoDeExecucao } from '../helpers/decorators/index';

export abstract class View<T> {

    protected _elemento: Element;
    private _escapar: boolean;

    constructor(seletor: string, escapar: boolean = true) {
        this._elemento = <Element>document.querySelector(seletor);
        this._escapar = escapar;
    }

    @logTempoDeExecucao()
    update(model: T): void {
        let template = this.template(model);

        if(this._escapar) {
            template = template.replace(/<script>[\s\S]*?<\/script>/g, '');
        }

        this._elemento.innerHTML = template;
    }

    /* Abstract: Não possui implementação */
    abstract template(model: T): string;
}


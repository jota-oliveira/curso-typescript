import { MeuObjeto } from './MeuObjeto';

export class Negociacao implements MeuObjeto<Negociacao> {
    /* 
    Se nem mesmo acesso externo essas propriedades podem ter,
    deve ser usado o private, se for realmente apenas uma restrição
    de escrita, pode ser usado o readonly.
    */
    constructor(
        readonly data: Date,
        readonly quantidade: number,
        readonly valor: number
    ) {}

    get volume() {
        return this.quantidade * this.valor;
    }

    paraTexto(): void {
        console.log(`
            Data: ${this.data}
            Quantidade: ${this.quantidade}
            Valor: ${this.valor}
            Volume: ${this.volume}
        `);
    }

    ehIgual = (negociacao: Negociacao): boolean => {
        return this.data.getDate() === negociacao.data.getDate()
            && this.data.getMonth() === negociacao.data.getMonth()
            && this.data.getFullYear() === negociacao.data.getFullYear();
    }
}
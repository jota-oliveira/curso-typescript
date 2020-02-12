export class Negociacao {
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
}
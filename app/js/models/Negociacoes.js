class Negociacoes {
    constructor() {
        // private _negociacoes: Array<Negociacao> = [];
        // ou
        this._negociacoes = [];
    }
    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }
    paraArray() {
        return [].concat(this._negociacoes);
    }
}

import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao } from '../models/index';
import { domInject } from '../helpers/decorators/index';

export class NegociacaoController {

    @domInject('#data')
    private _inputData: HTMLInputElement;

    @domInject('#quantidade')
    private _inputQuantidade: HTMLInputElement;

    @domInject('#valor')
    private _inputValor: HTMLInputElement;

    private _negociacoes: Negociacoes = new Negociacoes();
    private _negociacoesView: NegociacoesView = new NegociacoesView('#negociacoesView', true);
    private _mensagemView: MensagemView = new MensagemView('#mensagemView', true);
    
    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    public adiciona(event: Event): void {
        event.preventDefault();

        const data: Date = new Date(this._inputData.value.replace(/-/g, ','));
        
        if(!this.ehDiaUtil(data)) {
            this._mensagemView.update('Não é possível adicionar negociações fora de dias úteis');
            return;
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );

        this._negociacoes.adiciona(negociacao);
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso');
    }

    private ehDiaUtil = (data: Date): boolean => {
        const weekends: number[] = [DiaDaSemana.Sabado, DiaDaSemana.Domingo];
        return !weekends.includes(data.getDay());
    }
}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}
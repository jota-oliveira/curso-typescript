import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao } from '../models/index';
import { logTempoDeExecucao } from '../helpers/decorators/index';

export class NegociacaoController {
    private _inputData: HTMLInputElement;
    private _inputQuantidade: HTMLInputElement;
    private _inputValor: HTMLInputElement;
    private _negociacoes: Negociacoes = new Negociacoes();
    private _negociacoesView: NegociacoesView = new NegociacoesView('#negociacoesView', true);
    private _mensagemView: MensagemView = new MensagemView('#mensagemView', true);
    
    constructor() {
        /* Convertendo tipo genérico Element para HTMLInputElement */
        /* Necessário apenas para sair do genérico para mais explícito */
        this._inputData = <HTMLInputElement>document.querySelector('#data');
        this._inputQuantidade = <HTMLInputElement>document.querySelector('#quantidade');
        this._inputValor = <HTMLInputElement>document.querySelector('#valor');
        this._negociacoesView.update(this._negociacoes);
    }

    @logTempoDeExecucao(true)
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
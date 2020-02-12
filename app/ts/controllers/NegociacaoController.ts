import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao } from '../models/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService, HandlerFunction } from '../services/index';
import { imprime } from '../helpers/index';

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
    private _service: NegociacaoService = new NegociacaoService();
    
    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    @throttle(500)
    public adiciona(): void {

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

        imprime(negociacao, this._negociacoes);

        this._negociacoes.adiciona(negociacao);
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso');
    }

    private ehDiaUtil = (data: Date): boolean => {
        const weekends: number[] = [DiaDaSemana.Sabado, DiaDaSemana.Domingo];
        return !weekends.includes(data.getDay());
    }

    @throttle(500)
    public importaDados(): void {

        const isOk: HandlerFunction = (res: Response): Response => {
            if(!res.ok)
                throw new Error(res.statusText);

            return res;
        }

        this._service
            .obterNegociacoes(isOk)
            .then(negociacoes => {
                if(negociacoes)
                    negociacoes.forEach((negociacao: Negociacao) => 
                        this._negociacoes.adiciona(negociacao));

                this._negociacoesView.update(this._negociacoes);
            });
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
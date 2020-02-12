import { NegociacaoParcial, Negociacao } from '../models/index';

export class NegociacaoService {

    obterNegociacoes(handler: HandlerFunction): Promise<void | Negociacao[]> {
        const response = fetch('http://localhost:8080/dados')
            .then(res => handler(res))
            .then(res => res.json())
            .then((dados: NegociacaoParcial[]) => 
                <Negociacao[]>dados
                    .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante)))
            .catch(err => console.log(err));
        
        return response;
    }
}

export interface HandlerFunction {
    (res: Response): Response;
}
import { NegociacaoController } from './controllers/NegociacaoController';

const controller = new NegociacaoController();

const initEventsFromController: HTMLFormElement = <HTMLFormElement> document.querySelector(".form");

initEventsFromController
    .addEventListener("submit", controller.adiciona.bind(controller));
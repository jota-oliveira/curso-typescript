import { NegociacaoController } from './controllers/NegociacaoController';

const controller = new NegociacaoController();

const form: HTMLFormElement = <HTMLFormElement> document.querySelector(".form");
const botaoImportar: HTMLFormElement = <HTMLFormElement>document.querySelector("#botao-importa");

form
    .addEventListener("submit", controller.adiciona.bind(controller));

botaoImportar
    .addEventListener("click", controller.importaDados.bind(controller));
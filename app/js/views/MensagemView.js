class MensagemView extends View {
    template(model) {
        return `<p class="alert alert-info">${model && model}</p>`;
    }
}

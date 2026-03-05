document.addEventListener("DOMContentLoaded", function () {

const stars = document.querySelectorAll(".star");
const notaInput = document.getElementById("notaSelecionada");

    stars.forEach(star => {
    star.addEventListener("click", function () {
        let valor = this.getAttribute("data-value");
        notaInput.value = valor;

    stars.forEach(s => s.classList.remove("selected"));

        for (let i = 0; i < valor; i++) {
    stars[i].classList.add("selected");
    }
    });
});

const form = document.getElementById("form-avaliacao");

    if (form) {
    form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nota = parseInt(notaInput.value);
    const comentario = document.getElementById("comentario").value;
    const mensagem = document.getElementById("mensagem");

    if (!nota) {
        mensagem.innerText = "Por favor, selecione uma nota.";
        mensagem.style.color = "red";
        return;
    }

    let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];
    avaliacoes.push({ nota: nota, comentario: comentario });

    localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));

    mensagem.innerText = "Obrigado pela sua avaliação!";
    mensagem.style.color = "green";

    this.reset();
    stars.forEach(s => s.classList.remove("selected"));
    notaInput.value = "";

    atualizarEstatisticas();
    });
}

    function atualizarEstatisticas() {
    let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];

    if (avaliacoes.length === 0) return;

    let soma = 0;
    avaliacoes.forEach(av => soma += av.nota);

    let media = (soma / avaliacoes.length).toFixed(1);

    const resultado = document.getElementById("resultado");

    if (resultado) {
    resultado.innerText =
        "Total de avaliações: " + avaliacoes.length +
        " | Média: " + media;
    }
}

atualizarEstatisticas();

});
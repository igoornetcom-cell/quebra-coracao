const puzzle = document.getElementById("puzzle");
const mensagem = document.getElementById("mensagem");

// posições corretas
const ordemCorreta = [0, 1, 2, 3, 4, 5];

// embaralha as peças
let pecas = [...ordemCorreta].sort(() => Math.random() - 0.5);

// evita começar resolvido
while (pecas.every((v, i) => v === i)) {
    pecas.sort(() => Math.random() - 0.5);
}

let selecionada = null;

// cria o quebra-cabeça
function renderizar() {

    puzzle.innerHTML = "";

    pecas.forEach((valor, index) => {

        const peca = document.createElement("div");

        peca.classList.add("peca");

        // tamanho das peças
        peca.style.width = "120px";
        peca.style.height = "120px";

        // imagem
        peca.style.backgroundImage = "url('foto.png')";

        // tamanho total da imagem
        peca.style.backgroundSize = "360px 240px";

        // posição de cada pedaço
        const x = -(valor % 3) * 120;
        const y = -Math.floor(valor / 3) * 120;

        peca.style.backgroundPosition = `${x}px ${y}px`;

        peca.addEventListener("click", () => trocar(index));

        puzzle.appendChild(peca);

    });

}

// troca duas peças
function trocar(indice) {

    if (selecionada === null) {

        selecionada = indice;

        return;

    }

    [pecas[selecionada], pecas[indice]] =
    [pecas[indice], pecas[selecionada]];

    selecionada = null;

    renderizar();

    verificar();

}

// verifica se terminou
function verificar() {

    const completo = pecas.every(
        (valor, indice) => valor === indice
    );

    if (completo) {

        mensagem.classList.remove("oculto");

    }

}

// inicia
renderizar();

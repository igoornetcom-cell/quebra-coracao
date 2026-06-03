const puzzle = document.getElementById("puzzle");
const mensagem = document.getElementById("mensagem");

// ordem correta
const ordemCorreta = [0, 1, 2, 3, 4, 5];

// embaralha
let pecas = [...ordemCorreta].sort(() => Math.random() - 0.5);

while (pecas.every((v, i) => v === i)) {
    pecas.sort(() => Math.random() - 0.5);
}

let selecionada = null;

function renderizar() {

    puzzle.innerHTML = "";

    pecas.forEach((valor, index) => {

        const peca = document.createElement("div");

        peca.classList.add("peca");

        peca.style.backgroundImage = "url('foto.png')";
        peca.style.backgroundSize = "360px 240px";

        const x = -(valor % 3) * 120;
        const y = -Math.floor(valor / 3) * 120;

        peca.style.backgroundPosition = `${x}px ${y}px`;

        peca.addEventListener("click", () => trocar(index));

        puzzle.appendChild(peca);

    });

}

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

function verificar() {

    const completo = pecas.every(
        (valor, indice) => valor === indice
    );

    if (completo) {

        mensagem.classList.remove("oculto");

        ativarBotaoTalvez();

    }

}

function ativarBotaoTalvez() {

    const talvez = document.getElementById("talvez");

    if (!talvez) return;

    const frases = [
        "🤔 Tem certeza?",
        "🥺 Pensa melhor...",
        "❤️ Resposta inválida",
        "😏 Acho que não...",
        "🙈 Tente novamente",
        "💘 O coração já decidiu",
        "❤️ Clique no outro botão",
        "😂 Ainda tentando?"
    ];

    talvez.addEventListener("mouseover", fugir);

    talvez.addEventListener("click", fugir);

    function fugir() {

        const largura =
        window.innerWidth - talvez.offsetWidth;

        const altura =
        window.innerHeight - talvez.offsetHeight;

        talvez.style.position = "fixed";

        talvez.style.left =
        Math.random() * largura + "px";

        talvez.style.top =
        Math.random() * altura + "px";

        talvez.innerText =
        frases[
            Math.floor(
                Math.random() * frases.length
            )
        ];

    }

}

renderizar();

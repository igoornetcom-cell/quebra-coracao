```javascript
const puzzle = document.getElementById("puzzle");
const mensagem = document.getElementById("mensagem");
const mensagemFinal = document.getElementById("mensagemFinal");

// 9 peças (3x3)
const ordemCorreta = [0, 1, 2, 3, 4, 5, 6, 7, 8];

let pecas = [...ordemCorreta];

// embaralha as peças
function embaralhar() {

    pecas.sort(() => Math.random() - 0.5);

    // evita começar resolvido
    while (pecas.every((v, i) => v === i)) {
        pecas.sort(() => Math.random() - 0.5);
    }
}

let selecionada = null;

// renderiza o quebra-cabeça
function renderizar() {

    puzzle.innerHTML = "";

    pecas.forEach((valor, index) => {

        const peca = document.createElement("div");

        peca.className = "peca";

        peca.style.backgroundImage = "url('foto.png')";
        peca.style.backgroundSize = "360px 360px";

        const coluna = valor % 3;
        const linha = Math.floor(valor / 3);

        peca.style.backgroundPosition =
            `${-coluna * 120}px ${-linha * 120}px`;

        if (selecionada === index) {
            peca.style.outline = "4px solid #ff4d6d";
        }

        peca.addEventListener("click", () => trocar(index));

        puzzle.appendChild(peca);
    });
}

// troca duas peças
function trocar(indice) {

    if (selecionada === null) {

        selecionada = indice;
        renderizar();

        return;
    }

    [pecas[selecionada], pecas[indice]] =
    [pecas[indice], pecas[selecionada]];

    selecionada = null;

    renderizar();

    verificar();
}

// verifica se foi concluído
function verificar() {

    const completo =
        pecas.every((valor, indice) =>
            valor === indice
        );

    if (completo) {

        mensagem.classList.remove("oculto");

        puzzle.classList.add("pulsando");

        ativarBotaoTalvez();
    }
}

// botão talvez fugindo
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

    talvez.onclick = () => {

        talvez.style.position = "fixed";

        talvez.style.left =
            Math.random() *
            (window.innerWidth - talvez.offsetWidth) +
            "px";

        talvez.style.top =
            Math.random() *
            (window.innerHeight - talvez.offsetHeight) +
            "px";

        talvez.innerText =
            frases[
                Math.floor(
                    Math.random() * frases.length
                )
            ];
    };
}

// botão SIM
document.addEventListener("click", function (event) {

    if (event.target.id !== "sim") return;

    document.querySelector(".botoes").style.display = "none";

    mensagemFinal.classList.remove("oculto");

    for (let i = 0; i < 100; i++) {

        const coracao = document.createElement("div");

        coracao.className = "coracao";

        coracao.innerHTML = "❤️";

        coracao.style.left =
            Math.random() * 100 + "vw";

        coracao.style.fontSize =
            (20 + Math.random() * 30) + "px";

        coracao.style.animationDelay =
            Math.random() * 2 + "s";

        document.body.appendChild(coracao);

        setTimeout(() => {
            coracao.remove();
        }, 6000);
    }
});

// inicia o jogo
embaralhar();
renderizar();
```

const puzzle = document.getElementById("puzzle");
const mensagem = document.getElementById("mensagem");
const mensagemFinal = document.getElementById("mensagemFinal");

// ordem correta
const ordemCorreta = [0, 1, 2, 3, 4, 5];

// embaralha as peças
let pecas = [...ordemCorreta].sort(() => Math.random() - 0.5);

// impede começar resolvido
while (pecas.every((v, i) => v === i)) {
    pecas.sort(() => Math.random() - 0.5);
}

let selecionada = null;

// monta o quebra-cabeça
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

// verifica conclusão
function verificar() {

    const completo =
    pecas.every((valor, indice) =>
        valor === indice
    );

    if (completo) {

        mensagem.classList.remove("oculto");

        ativarBotaoTalvez();

        puzzle.classList.add("pulsando");

    }

}

// botão talvez fugindo
function ativarBotaoTalvez() {

    const talvez =
    document.getElementById("talvez");

    if (!talvez) return;

    const frases = [
        "🤔 Tem certeza?",
        "🥺 Pensa melhor...",
        "❤️ Resposta inválida",
        "😏 Acho que não...",
        "🙈 Tente novamente",
        "💘 O coração já decidiu?",
        "❤️ Clique no outro botão",
        "😂 Ainda tentando?"
        "😂 Seu dedo vai cansar"
    ];

    talvez.onclick = function() {

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

    };

}

// botão SIM
document.addEventListener("click", function(event){

    if(event.target.id !== "sim") return;

    // esconde os botões
    document.querySelector(".botoes").style.display = "none";

    // mostra mensagem final
    mensagemFinal.classList.remove("oculto");

    // chuva de corações
    for(let i = 0; i < 100; i++){

        const coracao =
        document.createElement("div");

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
renderizar();

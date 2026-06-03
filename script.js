const puzzle = document.getElementById("puzzle");

const mensagem = document.getElementById("mensagem");

let pecas = [0,1,2,3,4,5];

pecas.sort(() => Math.random() - 0.5);

let selecionada = null;

function renderizar(){

    puzzle.innerHTML = "";

    puzzle.style.display = "grid";

    puzzle.style.gridTemplateColumns = "repeat(3,120px)";
    puzzle.style.gridTemplateRows = "repeat(2,120px)";
    puzzle.style.gap = "2px";

    pecas.forEach((valor,index)=>{

        const div = document.createElement("div");

        div.className = "peca";

        div.style.width = "120px";
        div.style.height = "120px";

        div.style.backgroundImage = "url('foto.png')";

        div.style.backgroundSize = "360px 240px";

        const x = -(valor % 3) * 120;
        const y = -(Math.floor(valor / 3) * 120);

        div.style.backgroundPosition = `${x}px ${y}px`;

        div.onclick = () => trocar(index);

        puzzle.appendChild(div);

    });

}

function trocar(index){

    if(selecionada === null){

        selecionada = index;

        return;

    }

    [pecas[selecionada], pecas[index]] =
    [pecas[index], pecas[selecionada]];

    selecionada = null;

    renderizar();

    verificar();

}

function verificar(){

    for(let i=0;i<6;i++){

        if(pecas[i] !== i){

            return;

        }

    }

    mensagem.classList.remove("oculto");

}

renderizar();

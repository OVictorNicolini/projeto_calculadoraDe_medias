const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./imagens/aprovado.png" alt="Emoji festejando"/>';
const imgReprovado = '<img src="./imagens/reprovado.png" alt="Emoji triste" />';
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt('Digite a nota mínima: '));

form.addEventListener('submit', function(e) {
    e.preventDefault();

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
})

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if(atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`);
    } else {
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));

        atualizaTabela();
    }

    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function removeAtividade(nomeAtividade) {
    const index = atividades.indexOf(nomeAtividade);
    if (index > -1) {
        atividades.splice(index, 1);
        notas.splice(index, 1);
        atualizaTabela();
        atualizaMediaFinal();
    }
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = '';

    for (let i = 0; i < atividades.length; i++) {
        let linha = '<tr>';
        linha += `<td>${atividades[i]}</td>`;
        linha += `<td>${notas[i]}</td>`;
        linha += `<td><button class="btn-excluir" onclick="removeAtividade('${atividades[i]}')">Excluir</button></td>`;
        linha += '</tr>';
        corpoTabela.innerHTML += linha;
    }
}

function atualizaMediaFinal(){
    const mediaFinal = calculaMediaFinal();

    document.getElementById('resultado-final').innerHTML = mediaFinal.toFixed(2); //toFixed limita casas decimais
    document.getElementById('resultado-media-final').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;

    // Adiciona a imagem de aprovado ou reprovado abaixo da média final
    document.getElementById('resultado-media-final').innerHTML += mediaFinal >= notaMinima ? imgAprovado : imgReprovado;
}

function calculaMediaFinal(){
    let somaDasNotas = 0;

    for (let i=0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }

    return somaDasNotas / notas.length;
}













//let titulo = document.querySelector('h1');
//titulo.innerHTML = "Jogo do Número Secreto";//

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = "Escolha um número de 1 e 10";

let listaDeNumeros = [];
let numeroLimite = 50
let numeroSecreto = gerador();
let tentativa = 1;
let pt = 'tentativa';

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirInicio() {
    exibirTexto('h1', 'Número Secreto');
    exibirTexto('p', 'Escolha um número de 1 e 100');
}

exibirInicio();

function verificarChute() {
    let chute = document.querySelector('input').value;
    let mensagemT = `Parabéns, você descobriu que o número era ${numeroSecreto} com apenas ${tentativa} ${pt}!`;
    if (chute == numeroSecreto) {
        exibirTexto('p', mensagemT);
        document.getElementById('reiniciar').removeAttribute('disabled')
    } else {
        if (chute > numeroSecreto) {
            exibirTexto('p', 'Número secreto é menor');
        } else {
            exibirTexto('p', 'Número secreto é maior');
        }
        tentativa++;
        pt = tentativa > 1 ? 'tentativas' : 'tentativa';
        limparTexto();
    }
}

function gerador() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite) + 1;
    let quantidadeDeElementos = listaDeNumeros.length;

    if(quantidadeDeElementos == numeroLimite){
        listaDeNumeros = [];
    }

    if (listaDeNumeros.includes(numeroEscolhido)) {
        return gerador();
    } else {
        listaDeNumeros.push(numeroEscolhido);
        console.log(listaDeNumeros);
        return numeroEscolhido;
    }
}

function limparTexto() {
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciar() {
    limparTexto();
    tentativa = 1;
    numeroSecreto = gerador();
    exibirInicio();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
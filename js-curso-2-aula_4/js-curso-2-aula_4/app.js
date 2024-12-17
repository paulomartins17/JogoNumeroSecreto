let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 0;

exibirMsgInicial();

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMsgInicial(){
    exibirTextoNaTela('h1','Jogo do número secreto !');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10!');
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random()*numeroLimite+1);
    let quantidadeElementosDaLista = listaDeNumerosSorteados.length;

    //esvazia a lista caso todos os numeros ate o número limite ja foram sorteados
    if(quantidadeElementosDaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }
    //verifica se o número sorteado já foi sorteado ateriormente
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        //caso o numero ja foi sorteado a função é chamada novamente para sortear um novo número
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    let chute = document.querySelector('input');
    chute.value = '';
}

function verificarChute(){ 
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto){
        tentativas++;
        exibirTextoNaTela('h1','Parabéns :)');
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let msgTentativas = `Você acertou o número secreto em ${tentativas} ${palavraTentativas}!`;
        exibirTextoNaTela('p', msgTentativas);
        //habilita o botão 'Novo Jogo' quando o usuário acerta o número secreto
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        exibirTextoNaTela('h1','Eita você errou :( \n Tente novamente!');
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor!');
        } else{
            exibirTextoNaTela('p', 'O número secreto é maior!');
        }
        tentativas++;
        limparCampo();
    }
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    exibirMsgInicial();
    tentativas = 0;
    //desabilita o botão 'Novo Jogo' quando se reinicia o jogo
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
const Chat = [
    {from: "João", to: "Todos", text: "entra na sala...", type: "status", time: "09:21:45"},
    {from: "João", to: "Todos", text: "Bom dia", type: "message", time: "09:22:28"},
    {from: "Maria", to: "Todos", text: "Oi João :)", type: "message", time: "09:22:38"},
    {from: "João", to: "Maria", text: "Oi gatinha quer tc?", type: "private_message", time: "09:22:48"},
    {from: "Maria", to: "Todos", text: "sai da sala...", type: "status", time: "09:22:58"}
];

let dadosChat = [];


Logar();

function Logar(){
    const nome = { name: prompt("Qual seu lindo nome?") };
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',nome);
    promise.catch(deuErrado);
    
    buscarMsgs();

    setInterval(buscarMsgs, 3000);

    setInterval(manterConexao,5000,nome);

}

function manterConexao(verificador){
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',verificador);
    promise.then(respostaconexao);
}

function respostaconexao(resposta){
    console.log('Chegou!');
    console.log(resposta);
    console.log(resposta.data);

}

function respostaChegou(resposta){
    console.log('Chegou!');
    console.log(resposta);
    console.log(resposta.data);

    dadosChat = resposta.data;
    renderizarChat()
}

function renderizarChat(){
    const feedConversa = document.querySelector('.corpo');
    feedConversa.innerHTML = "";

    for(let i = 0; i < dadosChat.length ; i++){
        let msgChat = dadosChat[i];
        feedConversa.innerHTML +=`
        <div class = "chat ${msgChat.type}" >
            <div>
                <span class="timeChat">${msgChat.time}</span>
                <span class="nameChat"> ${msgChat.from} </span>
                <span class="destino ${msgChat.type}"> reservadamente </span>
                <span class="pessoa ${msgChat.type}">para ${msgChat.to} </span>
                ${msgChat.text}</div></div>
        `
    }
}

function buscarMsgs(){
const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');

promessa.then(respostaChegou);
}

function mandarMSG(){
    const remetente = document.querySelector();
    const destinatario = document.querySelector();
    const mensagem = document.querySelector();
    const tipoMsg = document.querySelector();

    const novaMsg = {
        from:remetente,
        to:destinatario,
        text:mensagem,
        type:tipoMsg
    };

    dadosChat.push(novaMsg);

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',novaMsg);
    promise.then(deuCerto);
    promise.catch(deuErrado);
    buscarMsgs();
    renderizarChat();
}

function deuCerto(){
    alert("Deu certo!");
    buscarMsgs();
}

function deuErrado(resposta){
    console.log(resposta);
    if (resposta.response.status === 400){
        alert("Nome já está sendo usado. Tente outro.");
        Logar();
    } else {
        alert("Algo deu errado. Tente novamente");
        Logar();
    }
    
}


const Chat = [
    {from: "João", to: "Todos", text: "entra na sala...", type: "status", time: "09:21:45"},
    {from: "João", to: "Todos", text: "Bom dia", type: "message", time: "09:22:28"},
    {from: "Maria", to: "Todos", text: "Oi João :)", type: "message", time: "09:22:38"},
    {from: "João", to: "Maria", text: "Oi gatinha quer tc?", type: "private_message", time: "09:22:48"},
    {from: "Maria", to: "Todos", text: "sai da sala...", type: "status", time: "09:22:58"}
];

let dadosChat = [];

function respostaChegou(resposta){
    console.log('Chegou!');
    console.log(resposta);
    console.log(resposta.data);

    dadosChat = resposta.data;
    renderizarChat()
}

const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');

promessa.then(respostaChegou);



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

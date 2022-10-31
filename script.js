
let dadosChat = [];

let nomeChat ="";

Logar();



function Logar(){
    const nome = { name: prompt("Qual seu lindo nome?") };
    nomeChat = nome.name;
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',nome);
    promise.catch(deuErrado);

    buscarMsgs();

    setInterval(buscarMsgs, 3000);

    setInterval(manterConexao,5000,nome);

}

function manterConexao(verificador){
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',verificador);
    promise.catch(deuErrado);
}

function respostaChegou(resposta){
    dadosChat = resposta.data;
    renderizarChat()
}

function renderizarChat(){
    const feedConversa = document.querySelector('.corpo');
    feedConversa.innerHTML = "";

    for(let i = 0; i < dadosChat.length ; i++){
        let msgChat = dadosChat[i];
        console.log(nomeChat);
        console.log(msgChat.to);

        if(nomeChat === msgChat.to && msgChat.type === "private_message"){
            feedConversa.innerHTML +=`
            <div class = "chat ${msgChat.type}" >
               <div>
                   <span class="timeChat">${msgChat.time}</span>
                   <span class="nameChat"> ${msgChat.from} </span>
                   <span class="destino ${msgChat.type}"> reservadamente </span>
                   <span class="pessoa ${msgChat.type}">para ${msgChat.to} </span>
                   ${msgChat.text}
               </div>
           </div>
       `
        } else if (msgChat.type === "private_message"){
            feedConversa.innerHTML +=`
            <div class = "chat ${msgChat.type} verificarPrivado" >
               <div>
                   <span class="timeChat">${msgChat.time}</span>
                   <span class="nameChat"> ${msgChat.from} </span>
                   <span class="destino ${msgChat.type}"> reservadamente </span>
                   <span class="pessoa ${msgChat.type}">para ${msgChat.to} </span>
                   ${msgChat.text}
               </div>
           </div>
       `
        } else {
            feedConversa.innerHTML +=`
            <div class = "chat ${msgChat.type}" >
               <div>
                   <span class="timeChat">${msgChat.time}</span>
                   <span class="nameChat"> ${msgChat.from} </span>
                   <span class="destino ${msgChat.type}"> reservadamente </span>
                   <span class="pessoa ${msgChat.type}">para ${msgChat.to} </span>
                   ${msgChat.text}
               </div>
           </div>
       `
        }
    }
    
    let ultimaMsg = document.querySelectorAll('.chat');
    ultimaMsg[dadosChat.length - 1].scrollIntoView();
}

function buscarMsgs(){
const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');

promessa.then(respostaChegou);
promessa.catch(deuErrado);
}

function mandarMSG(){
    const remetente = nomeChat;
    const destinatario = "Todos";
    const mensagem = document.querySelector(".msgTexto").value;
    const tipoMsg = "message";

    const novaMsg = {
        from:remetente,
        to:destinatario,
        text:mensagem,
        type:tipoMsg
    };

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',novaMsg);
    promise.then(deuCerto);
    promise.catch(deuErrado);
    buscarMsgs();
    renderizarChat();
}

function deuCerto(){
    buscarMsgs();
}

function deuErrado(resposta){
    if (resposta.response.status === 400){
        alert("Nome já está sendo usado. Tente outro.");
        Logar();
    } else {
        alert("Algo deu errado. Tente novamente.");
        window.location.reload();
    }
    
}


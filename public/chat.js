
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
})

let socket;

if(params?.username){
     socket = io.connect({query: {email: params?.username}});
}else{
    socket = io.connect();
}

const messageFormContainer = document.getElementById('message-form');
const welcomeContainer = document.getElementById('welcome-container');
const chatContainer = document.getElementById('chat');


const urlBase = "http://localhost:8080";

// Normalizr schema

const mensajes = new normalizr.schema.Entity('mensajes', {
    }, { idAttribute: '_id' });

const chatSchema = new normalizr.schema.Entity('chat', {
    mensajes: [mensajes]
})


socket.on('messages', (data) => { renderizarChat(data) });

const agregarMensaje = () => {
    const mensaje = {
        autor: document.getElementById('id').value,
        text: document.getElementById(`text`).value
    };
    socket.emit(`new-message`, mensaje);
    return false;
}

const renderizarFormMensaje = async () => {
    const respuesta = await fetch('/views/view/mensaje.handlebars')
    const template = await respuesta.text()
    // compile the template
    const compiledTemplate = Handlebars.compile(template);
    // execute the compiled template and print the output to the console
    const html = compiledTemplate()
    messageFormContainer.innerHTML = html
};

const renderizarWelcomeContainer = async () => {
    const respuesta = await fetch('/views/view/bienvenido.handlebars');
    const template = await respuesta.text()
    const compiledTemplate = Handlebars.compile(template);
    const username = localStorage.getItem('username');
    const html = compiledTemplate({ username })
    welcomeContainer.innerHTML = html;

    const misMensajes = document.getElementById('mis-mensajes');

    misMensajes.setAttribute('href', '/chat?username='+username);

};

const renderizarChat = async (chat) => {
    const chatDenormalizado = normalizr.denormalize(chat.result, chatSchema, chat.entities);
    const respuesta = await fetch('/views/view/chat.handlebars')
    const template = await respuesta.text()
    // compile the template
    const compiledTemplate = Handlebars.compile(template);
    // execute the compiled template and print the output to the console
    const html = compiledTemplate({ mensajes: chatDenormalizado?.mensajes })
    chatContainer.innerHTML = html
}

renderizarFormMensaje();
renderizarWelcomeContainer();


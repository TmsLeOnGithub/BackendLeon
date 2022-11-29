const socket = io.connect();

const productFormContainer = document.getElementById('product-form');
const messageFormContainer = document.getElementById('message-form');

const productListContainer = document.getElementById('product-list');
const chatContainer = document.getElementById('chat');

// Normalizr schema

const usuarios = new normalizr.schema.Entity('usuarios');

const mensajes = new normalizr.schema.Entity('mensajes', {
    autor: usuarios
},  {idAttribute: '_id'});

const chatSchema = new normalizr.schema.Entity('chat', {
    mensajes: [mensajes]
})



// socket.on ('all-products', (data) =>{
//     renderizarProductList(data);
// });


fetch('http://localhost:3000/api/productos-test').then(response => response.json()).then(response => {
  renderizarProductList(response);  
})


socket.on ('messages',  (data) => {renderizarChat(data)});

const agregarProducto = () => {
    const producto= {
            titulo: document.getElementById('titulo').value,
        precio: document.getElementById (`precio`).value,
        thumbnail: document.getElementById (`thumbnail`).value
    };
    socket.emit (`new-product`, producto);
    return false;
} 

const agregarMensaje = () => {
    const mensaje= {
        autor: {
            id: document.getElementById('id').value,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            edad: document.getElementById('edad').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value,
        },
        text: document.getElementById(`text`).value
    };
    socket.emit (`new-message`, mensaje);
    return false;
}

const renderizarFormProductos = async () => {
    const respuesta = await fetch('/views/view/productos.handlebars')
    const template = await respuesta.text()
    // compile the template
    const compiledTemplate = Handlebars.compile(template);
    // execute the compiled template and print the output to the console
    const html = compiledTemplate()
    productFormContainer.innerHTML = html
};

const renderizarFormMensaje = async () => {
    const respuesta = await fetch('/views/view/mensaje.handlebars')
    const template = await respuesta.text()
    // compile the template
    const compiledTemplate = Handlebars.compile(template);
    // execute the compiled template and print the output to the console
    const html = compiledTemplate()
    messageFormContainer.innerHTML = html
};

const renderizarProductList = async (productos) => {
    const respuesta = await fetch('/views/view/tabla-productos.handlebars')
    const template = await respuesta.text()
    // compile the template
    const compiledTemplate = Handlebars.compile(template);
    // execute the compiled template and print the output to the console
    const html = compiledTemplate({productos})
    productListContainer.innerHTML = html
} 

const renderizarChat = async (chat) => {
    console.log('Chat normalizado');
    console.log(chat);
    const normalizadoLength = JSON.stringify(chat).length;
    const chatDenormalizado = normalizr.denormalize(chat.result, chatSchema, chat.entities);
    console.log('Chat denormalizado');
    console.log(chatDenormalizado);
    const denormalizadoLength = JSON.stringify(chatDenormalizado).length;

    const porcentaje = denormalizadoLength / normalizadoLength;
    const porcentajeText= `Porcentaje de compresion ${Math.round(porcentaje * 100)}%`
    console.log(porcentajeText)
    document.getElementById('porcentaje').textContent = porcentajeText;

    const respuesta = await fetch('/views/view/chat.handlebars')
    const template = await respuesta.text()
    // compile the template
    const compiledTemplate = Handlebars.compile(template);
    // execute the compiled template and print the output to the console
    const html = compiledTemplate({mensajes: chatDenormalizado?.mensajes})
    chatContainer.innerHTML = html
} 

renderizarFormProductos();
renderizarFormMensaje();





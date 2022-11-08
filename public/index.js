const socket = io.connect();

const productFormContainer = document.getElementById('product-form');
const messageFormContainer = document.getElementById('message-form');

const productListContainer = document.getElementById('product-list');
const chatContainer = document.getElementById('chat');

socket.on ('all-products', (data) =>{
    renderizarProductList(data);
});

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
        username: document.getElementById('username').value,
        texto: document.getElementById (`texto`).value
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

const renderizarChat = async (mensajes) => {
    const respuesta = await fetch('/views/view/chat.handlebars')
    const template = await respuesta.text()
    // compile the template
    const compiledTemplate = Handlebars.compile(template);
    // execute the compiled template and print the output to the console
    const html = compiledTemplate({mensajes})
    chatContainer.innerHTML = html
} 

renderizarFormProductos();
renderizarFormMensaje();





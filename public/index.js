
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

const productFormContainer = document.getElementById('product-form');
const welcomeContainer = document.getElementById('welcome-container');
const randonView = document.getElementById('random-container')
const carritoContainer = document.getElementById('carrito-container')
const productListContainer = document.getElementById('product-list');
let idCarrito = null;
const urlBase = "http://localhost:8080";


if(params?.username){
    localStorage.setItem('username', params?.username);
}


// Normalizr schema

const mensajes = new normalizr.schema.Entity('mensajes', {
   }, { idAttribute: '_id' });

const chatSchema = new normalizr.schema.Entity('chat', {
    mensajes: [mensajes]
})



const borrarProducto = async ({idProducto}) => {
    fetch(urlBase + '/api/productos/' + idProducto, {
        method: 'DELETE',
    })
    .then(() => listarProductos())
}

const agregarAlCarrito = async ({idProducto}) => {
    fetch(`http://localhost:8080/api/carrito/${idCarrito}/productos`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({idProducto})
    }).then(() => {
        renderizarCarrito();
        alert('Producto añadido al carrito.')
    })
};

const crearCarrito = async () => {
    fetch('http://localhost:8080/api/carrito', {
        method: 'POST'
    })
    .then(response => response.json())
    .then((carrito) => {
       idCarrito = carrito?.id;
       renderizarCarrito();
    })
}

const listarProductos = () => {
    fetch(urlBase + '/api/productos', {
        method: 'GET',
    })
    .then(response => response.json())
    .then((productos) => renderizarProductList(productos))
}


const enviarPedido = () => {
    fetch(urlBase + '/api/carrito/'+ idCarrito + "/enviar", {
        method: 'POST',
    })
    .then(() => {
        alert("Pedido enviado con exito.");
        location.reload();
    })
}


const agregarProducto = () => {
    const producto = {
        titulo: document.getElementById('titulo').value,
        descripcion: document.getElementById(`descripcion`).value,
        stock: document.getElementById(`stock`).value,
        precio: document.getElementById(`precio`).value,
        thumbnail: document.getElementById(`thumbnail`).value
    };
   

    fetch(urlBase + '/api/productos', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    })
    .then(response => response.json())
    .then(() => listarProductos())
}

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


const renderizarCarrito = async () => {
    const productos = await fetch(`http://localhost:8080/api/carrito/${idCarrito}/productos`).then(response => response.json());
    const respuesta = await fetch('/views/view/carrito.handlebars');
    const template = await respuesta.text()
    const compiledTemplate = Handlebars.compile(template);
    const html = compiledTemplate({ productos })
    carritoContainer.innerHTML = html 
}

const renderizarRandomView = async (randomObject) => {
    const respuesta = await fetch('/views/view/random.handlebars');
    const template = await respuesta.text()
    const compiledTemplate = Handlebars.compile(template);

    const value = JSON.stringify(randomObject);
    const html = compiledTemplate({ randomObject: value })
    randonView.innerHTML = html

};

const renderizarFormProductos = async () => {
    const respuesta = await fetch('/views/view/productos.handlebars')
    const template = await respuesta.text()
    // compile the template
    const compiledTemplate = Handlebars.compile(template);
    // execute the compiled template and print the output to the console
    const html = compiledTemplate()
    productFormContainer.innerHTML = html
};

const renderizarProductList = async (productos) => {
    const respuesta = await fetch('/views/view/tabla-productos.handlebars')
    const template = await respuesta.text()
    // compile the template
    const compiledTemplate = Handlebars.compile(template);
    // execute the compiled template and print the output to the console
    const html = compiledTemplate({ productos })
    productListContainer.innerHTML = html
}

renderizarFormProductos();
renderizarWelcomeContainer();
listarProductos();
crearCarrito();


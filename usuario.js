class Usuario {
    nombre;
    apellido;
    libros;
    mascotas;

    constructor(nombre,apellido, libros = [], mascotas = []){
        this.nombre = nombre
        this.apellido= apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName()  {
        return (`${this.nombre} ${this.apellido}`)
    }
    
    addMascota = (mascota) => {
        this.mascotas.push(mascota);
    }
    
    countMascota = () => {
        return this.mascotas.length;
    }

    
    addBook = (nombre, autor) => {
        this.libros.push({nombre, autor})
    }

    getBookNames(){
        return this.libros.map(libro => libro.nombre);
    }
    
}

const usuario = new Usuario("Jose", "Perez", [{nombre: "Mafalda", autor:"Quino"}], ["Renata", "Dolores"]);

const nombreCompleto = usuario.getFullName();
console.log(`El usuario se llama: ${nombreCompleto}` )


console.log("Añadiendo nueva mascota")
usuario.addMascota ("Manchas")

console.log(usuario.mascotas);

console.log (`EL usuario tiene ${usuario.countMascota()} mascotas`);

console.log (`Agregando libro`)
usuario.addBook ("Divina comedia" ,"Dante")
console.log (`Los libros del usuario son ${usuario.getBookNames()}`)



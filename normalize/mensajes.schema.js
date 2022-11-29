import normalizr from 'normalizr';
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

const usuarios = new schema.Entity('usuarios');

const mensajes = new schema.Entity('mensajes', {
    autor: usuarios
},  {idAttribute: '_id'});

const chat = new schema.Entity('chat', {
    mensajes: [mensajes]
})

export default { usuarios, mensajes, chat };

import { faker } from '@faker-js/faker';
faker.locale = 'es';

const generarProducto = () => {
  return   {
    id: faker.datatype.uuid(),
    titulo: faker.commerce.productName(),
    precio: faker.commerce.price(),
    thumbnail: faker.image.imageUrl(),
    descripcion: faker.commerce.productDescription(),
    timestamp: faker.datatype.datetime(),
    stock: faker.datatype.number(100)
  }
}

export default generarProducto;
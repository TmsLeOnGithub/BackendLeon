

const calcularNumerosRandom = (cantidad) => {
    const max = 1000;
    const min = 1;

    const countObject = {};

    console.log("cantidad", cantidad)

    const numeros = [];

    for (let index = 0; index < cantidad; index++) {
        const number = Math.floor(Math.random() * (max - min + 1) + min);
        numeros.push(number);
        !countObject[number] ? countObject[number] = 1 : countObject[number]++;
    }

    return countObject;
}

process.on('message', (cantidad) => {

    const result = calcularNumerosRandom(cantidad);

    console.log(result)

    process.send(result)
})
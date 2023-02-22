import request from 'supertest'
import {expect} from 'chai'
import {app} from 'express'
describe("Comprobando que el servidor funcione bien", function () {
    it(' guardar', async function () {
       const response=await request(app).post('/ingreso').send({producto})
        expect(response.status).to.equal(200)
        expect(response.text).to.equal(`producto ${producto} almacenado`)
    })
    it('recibir ', async function () {
        const response=await request(app).get('/egreso')
        expect(response.body.productos).to.deep.equal([2])
    })
})
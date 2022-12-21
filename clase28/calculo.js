import { RESERVED_EVENTS } from "socket.io/dist/socket"

const calculo = ()=>{
    let sum=0
    for(let i=0; i<6e9;i++){
        sum +=i
    }
    return sum
}

let visitas=0

const server= http.createServer()
server.on('request',(req,res)=>{
    let { url } = req
    if(url== '/calcular'){
        const sum=calculo()
        res.send(`La suma es ${sum}`)
    }
    else if (url=='/') {
        res.send('ok'+ (++visitas))
    }
})
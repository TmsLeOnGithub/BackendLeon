import { Express } from 'express'
import cookieParse from 'cookie-parser'
//const cookieParse= require('cookie-parser')
const app= express()
const PORT=8080
const router= express.Router()
app.use(cookieParse("asd123"))


router.get('/get',(req,res)=>{
    // req.signedCookies => ME TRAE COOKIES FIRMADAS 
    // req.cookies => ME TRAE COOKIES NO FIRMADAS 
    const firmadas=req.signedCookies 
    const no_firmadas=req.cookies 
    res.json({no_firmadas,firmadas})
})

router.get('/create/:clave/:valor',(req,res)=>{
    const {clave,valor}=req.params
    const {expired,firmada}=req.query
    const opt={}
    if(firmada)
        opt['signed']=true
    if(expired)
        opt['maxAge']=50*1000
    console.log(opt)
    res.cookie(clave,valor,opt).send(`clave: ${clave} creada.`)
})

router.get('/delete/:clave',(req,res)=>{
    const {clave}=req.params
    res.clearCookie(clave).send(`clave: ${clave} eliminada.`)
})

app.use(router)
app.listen(PORT,()=>{
    console.log(`Escuchando en el puerto: ${PORT}`)
})
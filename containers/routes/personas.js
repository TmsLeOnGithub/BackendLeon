import express from "express";
const {Router} = express;
const router = Router();

const mascotas =[];

router.get('/', (req,res)=>{
    res.send ({mascotas});
})

router.post ('/', (req,res)=>{
    const mascota = req.body;
    mascotas.push (mascota);
    res.status(200).send ('Mascota agregada');
    
    })

export default router;
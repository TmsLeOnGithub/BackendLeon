import {Router}   from 'express'
const router =Router()


router.get('/auth',(req,res)=>{
res.status(200).send("status doscientos")
})

export default router
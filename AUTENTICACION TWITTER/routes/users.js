import { Router}   from 'express'
const router = Router();

router.get('/user',(req,res)=>{
res.status(200).send("status doscientos")
})

export default router;
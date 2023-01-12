import { fork } from 'child_process';
import { Router } from 'express';

const randomRouter = Router();

randomRouter.get('/',(req,res)=>{
//  const childProcess = fork('routes//random.js');

//  childProcess.send(req.query.cant || 1e8);
//     childProcess.on('message', msg =>{
//         res.send(msg);
//     })
})


export default randomRouter; //..
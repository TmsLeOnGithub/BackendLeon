import express from "express";

const PORT = 8080
const app = express();
const server= app.listen(PORT,() => console.log ( ` server listening on PORT ${PORT}` ));
server.on ('error', err => console.log (`Error ${err}`));

app.use (express.json());
app.use(express.urlencoded ({extended:true}));

let frase = 'Soy la lluvia de Trueno';

app.get ('/api/frase', (req,res)=> res.send({frase}));

app.get ('/api/palabras/:pos', (req,res)=>{
    const pos =parseInt(req.params.pos);
    let palabras = frase.split ('');
    res.send ({buscada:palabras [pos - 1]});
})

app.post ('/api/palabras', (req,res)=> {
    let {palabra} = req.body;
    frase=frase.concat ('',palabra);
    let palabras = frase.split('');
    res.send({
        agregada:palabra,
        pos:palabras.length
    });
});

app.put ('/api/palabras/:pos', (req,res)=>{
    let { palabra } = req.body;
    let pos = parseInt (req.params.pos) - 1;
    frase= frase.split ('');
    let anterior =  frase [pos]
    frase [pos]= palabras
    res.send ({
        actualizada: frase [pos],
        anterior
})
})



const express=require('express')
const mysql=require('mysql')
const bodyParser=require('body-parser')

const encoder=bodyParser.urlencoded()
const app=express()
const port=  4002


const connection=mysql.createConnection({
    host:'bhkrqm8tmdklmlandf4l-mysql.services.clever-cloud.com',
    user:'u2wxvpeop20ljiar',
    password:'BYiHKmKanpUCPrT5RmT4',
    port:3306,
    database:'bhkrqm8tmdklmlandf4l'
})

connection.connect( (error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log("database conectada com sucesso")
    }
 
})

app.use(express.static('assets'))
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta: ${port}`)
})
app.get("/", (res, req, results)=>{
    req.sendFile(__dirname + '/index.html')
 
})
app.get("/cadastro", (req, res)=>{
    res.sendFile(__dirname + '/cadastro.html')
})

app.post("/cadastro", encoder, (req, res)=>{
    const nome=req.body.nome
    const telefone=req.body.telefone
    const jogo_escolhido=req.body.jogo_escolhido
    connection.query("INSERT INTO `bhkrqm8tmdklmlandf4l`.`feira` (`nome`, `telefone`, `jogo_escolhido`) VALUES (?, ?, ?)", [nome, telefone, jogo_escolhido], (error)=>{
        if(error){
            res.status(400).send(error)
        }
        else{
            res.status(200).redirect("/cadastro")
        }
    })

})


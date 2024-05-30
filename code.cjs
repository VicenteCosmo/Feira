const express=require('express')
const mysql=require('mysql')
const bodyParser=require('body-parser')

const encoder=bodyParser.urlencoded()
const app=express()
const port=  4002


const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'cosmo',
    port:3306,
    database:'cadastro'
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
    connection.query("INSERT INTO `cadastro`.`feira` (`nome`, `telefone`, `jogo_escolhido`) VALUES (?, ?, ?);", [nome, telefone, jogo_escolhido], (error)=>{
        if(error){
            res.status(400).send(error)
        }
        else{
            res.status(200).redirect("/cadastro")
        }
    })

})


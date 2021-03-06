const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

connection
    .authenticate()
    .then (() => {
        console.log("Conexão foi dale");
    })
    .catch((erro) => {
        console.log("Conexão deu errada");
    })

app.set("view engine", "ejs");
app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get("/", (req, res) => {
    Pergunta.findAll({raw: true, order: [
        ['id','desc']
    ]}).then(perguntas => {
        res.render("index.ejs", {
            perguntas: perguntas
        });
    });
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar.ejs");
});


app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});


app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id', 'desc']]
            }).then((respostas) => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
            
        }else{
            res.redirect("/")
        }
    });
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var pergunta = req.body.pergunta;

    Resposta.create({
        corpo: corpo,
        perguntaId: pergunta
    }).then(() => {
        res.redirect("/pergunta/"+pergunta);
    });
});

app.listen(3000, () => {
    console.log("App rodando");
});
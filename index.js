const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");

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

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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
            res.render("pergunta", {
                pergunta: pergunta
            });
        }else{
            res.redirect("/")
        }
    });
});

app.listen(3000, () => {
    console.log("App rodando");
});
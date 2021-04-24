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
    //o render automaticamente acessa a pasta view, nao necessário coloca-la no caminho

    res.render("index.ejs");
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

app.listen(3000, () => {
    console.log("App rodando");
});
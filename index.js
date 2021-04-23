const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    //o render automaticamente acessa a pasta view, nao necessário coloca-la no caminho
    var nome = "Karín";
    var linguagem = "Javascript";
    res.render("index.ejs", {
        nome: nome, 
        lang: linguagem,
        idade: 21
    });
});

app.get("/home", (req, res) => {
    res.render("home.ejs");
});

app.listen(3000, () => {
    console.log("App rodando");
});
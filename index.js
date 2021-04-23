const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/:nome/:lang", (req, res) => {
    //o render automaticamente acessa a pasta view, nao necessário coloca-la no caminho
    var nome = req.params.nome;
    var linguagem = req.params.lang;
    var exibirMsg = true;
    res.render("index.ejs", {
        nome: nome, 
        lang: linguagem,
        idade: 21,
        msg: exibirMsg
    });
});

app.get("/home", (req, res) => {
    res.render("home.ejs");
});

app.listen(3000, () => {
    console.log("App rodando");
});
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));

app.get("/", (req, res) => {
    //o render automaticamente acessa a pasta view, nao necessário coloca-la no caminho

    res.render("index.ejs");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar.ejs");
});

app.listen(3000, () => {
    console.log("App rodando");
});
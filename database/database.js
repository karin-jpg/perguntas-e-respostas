const { Model } = require("sequelize");
const Sequelize = require("sequelize")
const connection = new Sequelize('perguntas', 'root', '1234',
{
    host: 'localhost',
    dialect: 'mysql',
    loggin: false
});

module.exports = connection;
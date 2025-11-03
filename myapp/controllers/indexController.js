const db = require("../database/models");
const op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");

const indexController ={
    index :function(req, res) {
        db.Product.findAll() 
        .then((result) => {
          return res.send(result)
            return res.render('index', { catalogoFlores: result }); 
        })
        .catch((error) => {
          return res.send(error);
        })
    }}

module.exports = indexController
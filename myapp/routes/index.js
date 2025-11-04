///myapp/routes/index.js
var express = require('express');
var router = express.Router();
const indexController = require("../controllers/indexController");

// Home (catálogo)
router.get('/', indexController.index);

// Mostrar formulario de registro
router.get('/register', indexController.registro);

// Procesar datos del formulario de registro
router.post('/register', indexController.store);

module.exports = router;